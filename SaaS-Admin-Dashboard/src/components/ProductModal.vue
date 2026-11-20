<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useProductsStore } from '../stores/productStore'
import type { Product } from '../types'

const props = defineProps<{ product?: Product }>()

const toast = useToast()
const productsStore = useProductsStore()

const modalId = computed(() => props.product ? `editModal-${props.product.id}` : 'addModal')
const title = computed(() => props.product ? 'Edit Product' : 'Add Product')

const createDraft = (product?: Product) => ({
	name: product?.name ?? '',
	price: product?.price as number | '' | undefined,
	description: product?.description ?? '',
	image_url: product?.image_url ?? '',
	sizes: product?.sizes.join(', ') ?? '',
})

const draft = ref(createDraft(props.product))
const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const saving = ref(false)

const handleFileChange = (event: Event) => {
	file.value = (event.target as HTMLInputElement).files?.[0] ?? null
}

const save = async () => {
	if (saving.value) return

	const product = props.product
	const sizes = draft.value.sizes
		.split(',')
		.map(size => Number(size.trim()))
		.filter(size => !Number.isNaN(size) && (!product || size !== 0))

	const fields = {
		name: draft.value.name,
		price: Number(draft.value.price ?? 0),
		description: draft.value.description,
		image_url: draft.value.image_url,
		sizes,
	}

	let payload: typeof fields | FormData = fields
	if (file.value) {
		const upload = new FormData()
		upload.append('name', fields.name)
		upload.append('price', String(fields.price))
		upload.append('description', fields.description)
		upload.append('sizes', JSON.stringify(fields.sizes))
		upload.append('image', file.value)
		payload = upload
	}

	saving.value = true
	try {
		if (product) {
			await productsStore.updateProduct(product.id, payload)
		} else {
			await productsStore.addProduct(payload)
			draft.value = createDraft()
		}

		file.value = null
		if (fileInput.value) fileInput.value.value = ''
		toast.success(product ? 'Product updated successfully' : 'Product added successfully')
	} catch (error) {
		toast.error('Error: ' + (error as Error).message)
	} finally {
		saving.value = false
	}
}
</script>

<template>
	<div>
		<button
			type="button"
			class="btn-open"
			:class="product ? 'btn btn-sm btn-outline-primary me-2' : 'button-color3'"
			data-bs-toggle="modal"
			:data-bs-target="`#${modalId}`"
			:disabled="saving"
		>
			{{ product ? 'Edit' : 'Add Product' }}
		</button>

		<div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}-title`" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold" :id="`${modalId}-title`">{{ title }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<div class="mb-3">
							<label :for="`${modalId}-name`" class="form-label fw-bold text-start d-block">Product Name</label>
							<input :id="`${modalId}-name`" v-model="draft.name" type="text" class="form-control" />
						</div>

						<div class="mb-3">
							<label :for="`${modalId}-price`" class="form-label fw-bold text-start d-block">Price</label>
							<input :id="`${modalId}-price`" v-model="draft.price" type="number" step="0.01" class="form-control" />
						</div>

						<div class="mb-3">
							<label :for="`${modalId}-url`" class="form-label fw-bold text-start d-block">Image URL</label>
							<input :id="`${modalId}-url`" v-model="draft.image_url" type="text" class="form-control" :disabled="file !== null" />
						</div>

						<div class="mb-3">
							<label :for="`${modalId}-file`" class="form-label fw-bold text-start d-block">Image file</label>
							<input
								:id="`${modalId}-file`"
								ref="fileInput"
								type="file"
								class="form-control"
								:disabled="draft.image_url !== ''"
								@change="handleFileChange"
							/>
						</div>

						<div class="mb-3">
							<label :for="`${modalId}-description`" class="form-label fw-bold text-start d-block">Description</label>
							<textarea :id="`${modalId}-description`" v-model="draft.description" class="form-control" rows="3"></textarea>
						</div>

						<div class="mb-3">
							<label :for="`${modalId}-sizes`" class="form-label fw-bold text-start d-block">Sizes (comma-separated)</label>
							<input :id="`${modalId}-sizes`" v-model="draft.sizes" type="text" class="form-control" placeholder="36, 38, 40..." />
						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						<button type="button" class="button-color3" data-bs-dismiss="modal" @click="save">
							{{ product ? 'Save changes' : 'Add Product' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.btn-close,
.btn-open {
	--bs-btn-close-focus-shadow: none;
}

.button-color3 {
	padding: 9px;
}
</style>
