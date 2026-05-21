<script lang="ts">
import type { PropType } from 'vue'
import { useToast } from "vue-toastification"
import { useProductsStore } from '../stores/productStore'
import type { Product } from '../types'
export default {
	props: {
		product: {
			type: Object as PropType<Product>,
			required: true
		},
	},
	setup() {
		const toast = useToast()
		const productsStore = useProductsStore()
		return { toast, productsStore }

	},
	data() {
		return {
			editingProduct: {
				id: this.product.id || '',
				name: this.product.name || '',
				price: this.product.price || '',
				description: this.product.description || '',
				image_url: this.product.image_url || '',
				sizes: this.product.sizes || []
			} as Product,
			sizesInput: this.product.sizes.join(', ') || '',
			file: null as File | null
		}
	},
	methods: {
		async handleSaveProduct() {
			this.editingProduct.sizes = this.sizesInput
				.split(',')
				.map((s: string) => Number(s.trim()))
				.filter((s: number) => !isNaN(s) && s !== 0)
			
			try {
				const updatedData: Partial<Product> = {
					name: this.editingProduct.name,
					price: this.editingProduct.price,
					description: this.editingProduct.description,
					image_url: this.editingProduct.image_url,
					sizes: this.editingProduct.sizes
				}

				if (this.file) {
					const formData = new FormData()
					formData.append('name', updatedData.name ?? '')
					formData.append('price', String(updatedData.price ?? 0))
					formData.append('description', updatedData.description ?? '')
					formData.append('sizes', JSON.stringify(this.editingProduct.sizes))
					formData.append('image', this.file)
					await this.productsStore.updateProduct(this.editingProduct.id, formData)
				} else {
					await this.productsStore.updateProduct(this.editingProduct.id, updatedData)
				}
				this.file = null
				this.toast.success('Product updated successfully')
			} catch (error) {
				this.toast.error('Error: ' + (error as Error).message)
			}
		},
		async handleFileChange(e: Event) {
			const input = e.target as HTMLInputElement
			this.file = input?.files?.[0] ?? null
		}
	}
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
.btn-close, .btn-open{
	--bs-btn-close-focus-shadow: none;
}
.button-color3{
	padding: 9px;
}
</style>