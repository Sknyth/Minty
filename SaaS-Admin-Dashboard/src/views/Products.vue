<script lang="ts">
import { useToast } from "vue-toastification"
import ModalAddProduct from '../components/ModalAddProduct.vue'
import ModalEditProduct from '../components/ModalEditProduct.vue'
import NavBar from '../components/NavBar.vue'
import { useProductsStore } from '../stores/productStore'

export default {
  components: { NavBar, ModalEditProduct, ModalAddProduct },
  setup() {
    const toast = useToast()
    const productsStore = useProductsStore()
    
    productsStore.fetchProducts()

    return { toast, productsStore }
  },
  data() {
    return {
      productSearchQuery: '',
    }
  },
  methods: {
    async handleDeleteProduct(productId: string) {
      try {
        await this.productsStore.deleteProduct(productId)
        this.toast.success('Product deleted successfully')
      } catch (error) {
        this.toast.error('Error: ' + (error as Error).message)
      }
    }
  }
}
</script>

<template>
  <NavBar>
    <div class="header-section d-flex align-items-center mb-4 row gap-3">
      <div class="header-start col-lg">
        <h2 class="fw-bold">Products Management</h2>
      </div>


      <div class="header-main col-lg">
        <input type="text" placeholder="Search..." class="custom-input mb-3" 
				v-model="productSearchQuery" @keyup="productsStore.searchProducts(productSearchQuery)"
				/>
      </div>

      <div class="header-end d-flex col-lg gap-3">
        <div>
          <ModalAddProduct />
        </div>
        
        <div class="stats-mini d-flex">
          <span class="text-muted">Total records:</span> 
          <span class="fw-bold color1 ms-1">{{ productsStore.products.length }}</span>
        </div>
      </div>
    </div>
    
    <div class="panel shadow-sm p-0 overflow-hidden">
      <div class="table-responsive table-scroll">
        <table class="custom-table">
          <thead>
            <tr>
              <th class="px-4 py-3">Image</th>
              <th class="px-4 py-3">Product id</th>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3 text-center">Price</th>
              <th class="px-4 py-3 text-center">Sizes</th>
              <th class="px-4 py-3 text-center">Description</th>
              <th class="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productsStore.products" :key="product.id" class="table-row">
              <td class="px-4 py-3">
                <img :src="product.image_url ?? undefined" alt="Product Image" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;">
              </td>
							<td class="px-4 py-3 fw-bold">
                #{{ product.id.slice(0, 8) }}
              </td>

							<td class="px-4 py-3 fw-bold">
                {{ product.name }}
              </td>
              <td class="px-4 py-3 fw-bold text-center color1">
                ${{ product.price }}
              </td>
              <td class="px-4 py-3 text-center fw-bold">
                {{ product.sizes.join(', ') }}
              </td>
              <td class="px-3 py-2 text-start" style="max-width: 300px;">
                <span v-if="!product.showFull">
                  {{ product.description.slice(0, 50) }}...
                  <a href="#" @click.prevent="product.showFull = true" class="small color1 fw-bold">more</a>
                </span>
                <span v-else>
                  {{ product.description }}
                  <a href="#" @click.prevent="product.showFull = false" class="small color1 fw-bold"> hide</a>
                </span>
              </td>
              <td class="px-4 py-3 small">
                <div class="modalEditProduct">
                  <ModalEditProduct :product="product" />
                </div>
                <button class="btn btn-sm btn-outline-danger" @click="handleDeleteProduct(product.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="productsStore.products.length === 0">
              <td colspan="5" class="text-center py-5 text-muted">
                No products found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NavBar>
</template>

<style scoped>

.panel {
  background: #ffffff;
  border: 1px solid rgba(134, 134, 149, 0.15);
  border-radius: 18px;
}
.table-scroll {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}
.header-section {
  justify-content: space-between;
}

.header-end {
  justify-content: end;
  align-items: end;
  flex-direction: column;
}

.custom-input {
  width: 100%;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table thead {
  background: #f8fafb;
  border-bottom: 1px solid rgba(134, 134, 149, 0.1);
}

.custom-table th {
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color3);
}

.table-row {
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(134, 134, 149, 0.05);
}

.table-row:hover {
  background: rgba(45, 138, 114, 0.03);
}

.table-row:last-child {
  border-bottom: none;
}

.status-select-container {
  position: relative;
  display: inline-block;
  width: 130px;
}

.role-select-custom {
  appearance: none;
  width: 100%;
  padding: 4px 25px 4px 12px;
  font-weight: 700;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s ease;
}

.select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  pointer-events: none;
  opacity: 0.6;
}

.modalEditProduct {
  margin: 0 1rem 1rem 0;
}

.role-select-custom.admin {
  background-color: #f8d7da;
  color: #721c24;
}
.role-select-custom.user {
  background-color: #cfe2ff;
  color: #084298;
}
.role-select-custom.user:hover, .role-select-custom.user:focus {
  box-shadow: 0 0 0 2px #084298;
}
.role-select-custom.admin:hover, .role-select-custom.admin:focus {
  box-shadow: 0 0 0 2px #721c24;
}
@media(max-width: 991px){
  .header-start, .header-main {
    text-align: center;
  }
  .custom-input {
    width: 50%;
  }
  .header-section {
    justify-content: center;
  }
  .header-end {
    align-items: center;
    justify-content: center;
  }
}
</style>