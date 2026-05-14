<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'

export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const toast = useToast()
    const productsStore = useProductsStore()
    const wishlistStore = useWishlistStore()
    const cartStore = useCartStore()
    productsStore.fetchProducts()
    return { toast, productsStore, cartStore,  wishlistStore }
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
    },
    // isInWishlistComputed() {
    //   return this.wishlistStore.isInWishlist(this.currentItem.id)
    // }
  },
  methods: {
    async addToCart() {
      if (!this.selectedSize) {
        this.toast.warning("Please select a size")
        return
      }
      try{
        await this.cartStore.addToCart({
          product_id: this.currentItem.id,
          size: this.selectedSize,
          quantity: 1
        })
        this.toast.success("Product added!")
      } catch(e){
        this.toast.error("Error: " + e.message)
      }
    },
    selectSize(size) {
      this.selectedSize = size
    },
    async toggleWishlist(productID) {
      try {
        if (this.wishlistStore.isInWishlist(productID)) {
          await this.wishlistStore.deleteFromWishlist(productID)
          this.toast.success('Product removed from wishlist!')
        } else {
          await this.wishlistStore.addToWishlist(productID)
          this.toast.success('Product added to your wishlist!') 
        }
      } catch(e) {
        if(e.message === 'duplicate key value violates unique constraint "wishlist_user_id_product_id_key"'){
          this.toast.error("Error: Already in wishlist")
          return
        }
        this.toast.error("Error: " + e.message)
      }
    },
  },
}
</script>

<template>
  <div>
    <Header />
    
    <main v-if="currentItem" class="product-wrapper">
      <div class="container p-0">
        <div class="row g-0">
          
          <div class="col-lg-8 col-md-7 position-relative">
            <div id="itemCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="2"></button>
              </div>
              
              <div class="carousel-inner h-100">
                <div class="carousel-item active h-100">
                  <img :src="currentItem.image_url" class="main-img" alt="">
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
            <div class="info-content p-4 w-100">
              <h1 class="mb-">{{ currentItem.name }}</h1>
              <h2 class="fs-4 mb-4 color1">${{ currentItem.price }}</h2>

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
                <!-- <button @click="toggleWishlist(currentItem.id)" class="wishlist-btn py-3 fs-5">
                  {{ isInWishlistComputed ? '♥ Remove from Wishlist' : '♥ Save to Wishlist' }}
                </button> -->
              </div>
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
  </div>
</template>

<style scoped>
.carousel {
  height: calc(100vh - 80px - 165px);
}
.product-wrapper {
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

.wishlist-btn {
  border: 2px solid var(--color1);
  background: white;
  color: var(--color1);
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wishlist-btn:hover {
  background-color: var(--color1);
  color: white;
}
</style>