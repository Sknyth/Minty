<script lang="ts">
export default {
  props: {
    imageURL: String,
    title: String,
    price: Number,
    id: [Number, String]
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.title, this.price, this.imageURL);
    },
  },
}
</script>

<template>
  <div class="product-card">
    <router-link :to="{ name: 'Item', params: { id: id } }" class="card-link">
      <div class="image-container">
        <img :src="imageURL" class="item-img" :alt="title" />
        <div class="view-tag">View Item</div>
      </div>
      
      <div class="card-content">
        <h5 class="item-title">{{ title }}</h5>
        <p class="item-price color1">${{ price }}</p>
      </div>
    </router-link>

    <button @click.stop="addToCart" class="button-color1 add-to-cart-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
      </svg>
      Add to cart
    </button>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border: 1px solid rgba(134, 134, 149, 0.15);
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 8px 30px rgba(134, 134, 149, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 230px;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(45, 138, 114, 0.15); /* Тень в цвете color1 */
  border-color: var(--color1);
}

.card-link {
  display: block;
  margin-bottom: 12px;
}

.image-container {
  width: 100%;
  height: 220px;
  background-color: #fcfcfc;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-card:hover .item-img {
  transform: scale(1.15) rotate(-3deg);
}

.view-tag {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  background: var(--color1);
  color: var(--color2);
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 600;
  transition: bottom 0.3s ease;
}

.product-card:hover .view-tag {
  bottom: 0;
}

.card-content {
  padding: 8px 4px;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  margin-top: auto;
  border-radius: 12px;
  font-size: 15px;
}

.add-to-cart-btn svg {
  transition: transform 0.3s ease;
}

.add-to-cart-btn:hover svg {
  transform: rotate(90deg);
}
</style>