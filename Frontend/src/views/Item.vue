<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useToast } from "vue-toastification"
import { useProductsStore } from '../stores/ProductStore'
import { useCartStore } from '../stores/cartStore'

export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const toast = useToast()
    const productsStore = useProductsStore()
    const cartStore = useCartStore()
    productsStore.fetchProducts()
    return { toast, productsStore, cartStore }
  },
  data() {
    return {
      selectedSize: null,
    }
  },
  computed: {
    currentItem() {
      const id = this.$route.params.id
      return this.productsStore.products.find(item => String(item.id) === String(id))
    }
  },
  methods: {
    async addToCart() {
        if (!this.selectedSize) {
          this.toast.warning("Please select a size")
          return
        }
        try{
          await this.cartStore.addToCart({
            name: this.currentItem.name,
            price: this.currentItem.price,
            image_url: this.currentItem.image_url,
            description: this.currentItem.description,
            size: this.selectedSize,
            quantity: 1
          })
          this.toast.success("Product added!")
        } catch(e){
          if(e.message === 'User not authenticated'){
            this.toast.error("Error: " + 'You are not logged in')
            return
          }
          this.toast.error("Error: " + e.message)
        }
      },
    selectSize(size) {
      this.selectedSize = size
    }
  },
}
</script>

<template>
  <Header />
  
  <main v-if="currentItem" class="product-wrapper">
    <div class="container h-100 p-0">
      <div class="row g-0 h-100">
        
        <div class="col-lg-8 col-md-7 h-100 position-relative">
          <div id="itemCarousel" class="carousel slide h-100" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="0" class="active"></button>
              <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="2"></button>
            </div>
            
            <div class="carousel-inner h-100">
              <div class="carousel-item active h-100">
                <img :src="currentItem.image_url" class="main-img" alt="Nike Air Force 1">
              </div>
              <div class="carousel-item h-100">
                <img :src="currentItem.image_url" class="main-img" alt="Nike Air Force Black">
              </div>
              <div class="carousel-item h-100">
                <img :src="currentItem.image_url" class="main-img" alt="Nike Air Force Cream">
              </div>
            </div>

            <button class="carousel-control-prev custom-nav" type="button" data-bs-target="#itemCarousel" data-bs-slide="prev">
              <div class="nav-circle">
                <span class="chevron-left"></span>
              </div>
            </button>
            <button class="carousel-control-next custom-nav" type="button" data-bs-target="#itemCarousel" data-bs-slide="next">
              <div class="nav-circle">
                <span class="chevron-right"></span>
              </div>
            </button>
          </div>
        </div>

        <div class="col-lg-4 col-md-5 d-flex align-items-center bg-white border-start">
          <div class="info-content p-5 w-100">
            <h1 class="logo color1 mb-2">{{ currentItem.title }}</h1>
            <h2 class="fs-4 fw-light mb-4 color3">${{ currentItem.price }}</h2>

            <hr class="my-4 opacity-10">

            <div class="mb-4">
              <p class="fw-bold mb-3">Color: <span class="fw-normal color3">Original White</span></p>
              <div class="d-flex gap-2">
                <div class="swatch active"><img :src="currentItem.image_url" alt=""></div>
                <!-- <div class="swatch"><img :src="currentItem.image_url" alt=""></div>
                <div class="swatch"><img :src="currentItem.image_url" alt=""></div> -->
              </div>
            </div>

            <div class="mb-5">
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Select Size (EU)</span>
                <a href="#" class="color1 text-decoration-underline small">Size Guide</a>
              </div>
              <div class="size-grid">
                <button 
                  v-for="size in currentItem.sizes" 
                  :key="size"
                  @click="selectSize(size)"
                  :class="['size-btn', { 'active': selectedSize === size }]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="d-grid gap-3">
              <button @click="addToCart" class="button-color1 py-3 fs-5 shadow-sm rounded-pill">
                Add to Cart
              </button>
              <button class="empty-btn color3 text-decoration-underline small">
                Save to Wishlist
              </button>
            </div>

            <p class="mt-5 color3 small lh-lg">
              {{currentItem.description}}
            </p>
          </div>
        </div>

      </div>
    </div>
  </main>
  <div v-else class="loading-state text-center p-5">
    <div class="spinner-border"></div>
    <p>Loading product data...</p>
  </div>
  <Footer />
</template>

<style scoped>
.product-wrapper {
  height: calc(100vh - 80px - 165px);
  margin-top: 80px;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: #f2f2f2;
}

.custom-nav {
  width: 10%;
  opacity: 1;
  z-index: 5;
}

.nav-circle {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-nav:hover .nav-circle {
  background-color: var(--color1);
  transform: scale(1.1);
}

.chevron-left, .chevron-right {
  width: 12px;
  height: 12px;
  border-top: 2px solid #222;
  border-left: 2px solid #222;
  display: block;
  transition: border-color 0.3s;
}

.chevron-left {
  transform: rotate(-45deg);
  margin-left: 4px;
}

.chevron-right {
  transform: rotate(135deg);
  margin-right: 4px;
}

.custom-nav:hover .chevron-left,
.custom-nav:hover .chevron-right {
  border-color: white;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.size-btn {
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 10px 0;
  transition: all 0.2s ease;
}

.size-btn.active {
  background-color: var(--color1);
  color: var(--color2);
  border-color: var(--color1);
}

.swatch {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  background: #f8f8f8;
  transition: 0.3s;
}

.swatch.active {
  border-color: var(--color1);
}

.swatch img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>