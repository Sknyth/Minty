<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useToast } from 'vue-toastification'
import { useProductsStore } from '../stores/productStore'
import type { Product } from '../types'

const props = defineProps({
	product: {
		type: Object as PropType<Product>,
		required: true
	}
})

const toast = useToast()
const productsStore = useProductsStore()

const editingProduct = ref<Product>({
	id: props.product.id || '',
	name: props.product.name || '',
	price: props.product.price || '',
	description: props.product.description || '',
	image_url: props.product.image_url || '',
	sizes: props.product.sizes || []
} as Product)

const sizesInput = ref(props.product.sizes.join(', ') || '')
const file = ref<File | null>(null)

const handleSaveProduct = async () => {
	editingProduct.value.sizes = sizesInput.value
		.split(',')
		.map((s: string) => Number(s.trim()))
		.filter((s: number) => !isNaN(s) && s !== 0)

	try {
		const updatedData: Partial<Product> = {
			name: editingProduct.value.name,
			price: editingProduct.value.price,
			description: editingProduct.value.description,
			image_url: editingProduct.value.image_url,
			sizes: editingProduct.value.sizes
		}

		if (file.value) {
			const formData = new FormData()
			formData.append('name', updatedData.name ?? '')
			formData.append('price', String(updatedData.price ?? 0))
			formData.append('description', updatedData.description ?? '')
			formData.append('sizes', JSON.stringify(editingProduct.value.sizes))
			formData.append('image', file.value)
			await productsStore.updateProduct(editingProduct.value.id, formData)
		} else {
			await productsStore.updateProduct(editingProduct.value.id, updatedData)
		}

		file.value = null
		toast.success('Product updated successfully')
	} catch (error) {
		toast.error('Error: ' + (error as Error).message)
	}
}

const handleFileChange = (e: Event) => {
	const input = e.target as HTMLInputElement
	file.value = input?.files?.[0] ?? null
}
</script>

<template>
	<div>
		<button type="button" class="btn btn-sm btn-outline-primary me-2 btn-open" data-bs-toggle="modal" :data-bs-target="`#editModal-${product.id}`">
			Edit
		</button>

		<div class="modal fade" :id="`editModal-${product.id}`" tabindex="-1" :aria-labelledby="`editModalLabel-${product.id}`" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold" id="editModalLabel">Edit Product</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Product Name</label>
							<input type="text" class="form-control" v-model="editingProduct.name" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Price</label>
							<input type="number" class="form-control" v-model="editingProduct.price" step="0.01" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Image URL</label>
							<input type="text" :disabled="file != null" class="form-control" v-model="editingProduct.image_url" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Image file</label>
							<input type="file" :disabled="editingProduct.image_url != ''" class="form-control" @change="handleFileChange" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Description</label>
							<textarea class="form-control" v-model="editingProduct.description" rows="3"></textarea>
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Sizes (comma-separated)</label>
							<input type="text" class="form-control" v-model="sizesInput" placeholder="36, 38, 40..." />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						<button type="button" class="button-color3" data-bs-dismiss="modal" @click="handleSaveProduct">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.btn-close, .btn-open {
	--bs-btn-close-focus-shadow: none;
}
.button-color3 {
	padding: 9px;
}
</style>