<script lang="ts">
import { useToast } from "vue-toastification"
import { useProductsStore } from '../stores/productStore'
import type { Product } from '../types'

export default {
	setup() {
		const toast = useToast()
		const productsStore = useProductsStore()
		return { toast, productsStore }
	},
	data() {
		return {
			newProduct: {
				name: '',
				price: undefined as number | undefined,
				description: '',
				image_url: '',
				sizes: [] as number[]
			},
			sizesInput: '',
			file: null as File | null
		}
	},
	methods: {
		async handleSaveProduct() {
			try {
				const newData: Omit<Product, 'id'> = {
					name: this.newProduct.name,
					price: this.newProduct.price ?? 0,
					description: this.newProduct.description,
					image_url: this.newProduct.image_url,
					sizes: this.sizesInput.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))
				}
				await this.productsStore.addProduct(newData)
				this.resetForm()
				this.toast.success('Product added successfully')
			} catch (error) {
				this.toast.error('Error: ' + (error as Error).message)
			}
		},
		resetForm() {
			this.newProduct = { name: '', price: undefined, description: '', image_url: '', sizes: [] }
			this.sizesInput = ''
			this.file = null
		}
	}
}
</script>

<template>
	<div>
		<button type="button" class="button-color3 btn-open" data-bs-toggle="modal" data-bs-target="#addModal">
			Add Product
		</button>

		<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold" id="addModalLabel">Add Product</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Product Name</label>
							<input type="text" class="form-control" v-model="newProduct.name" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Price</label>
							<input type="number" class="form-control" v-model="newProduct.price" step="0.01" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Image URL</label>
							<input type="text" :disabled="file != null" class="form-control" v-model="newProduct.image_url" />
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Image file</label>
							<!-- <input type="file" :disabled="newProduct.image_url != ''" class="form-control" @change="e => file = (e.target as HTMLInputElement)?.files?.[0] ?? null" /> -->
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Description</label>
							<textarea class="form-control" v-model="newProduct.description" rows="3"></textarea>
						</div>

						<div class="mb-3">
							<label class="form-label fw-bold text-start d-block">Sizes (comma-separated)</label>
							<input type="text" class="form-control" v-model="sizesInput" placeholder="36, 38, 40..." />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						<button type="button" class="button-color3" data-bs-dismiss="modal" @click="handleSaveProduct">Add Product</button>
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