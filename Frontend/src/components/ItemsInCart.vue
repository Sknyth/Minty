<script setup lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import type { CartItem } from '../types'


const toast = useToast()

const cartStore = useCartStore()

const updateQuantity = async (item: CartItem) => {
    try{
        await cartStore.updateQuantity({ 
            id: item.id, 
            quantity: item.quantity + 1 
        })
    } catch(e){
        toast.error("Error: " + (e as Error).message)
    }
}

const decreaseQuantity = async (item: CartItem) => {
    if (item.quantity > 1) {
        try {
            await cartStore.updateQuantity({ 
                id: item.id, 
                quantity: item.quantity - 1 
            })
        } catch(e) {
            toast.error((e as Error).message);
        }
    } else {
        await removeFromCart(item.id);
    }
}

const removeFromCart = async (id: number) => {
    if (!id) return
    try {
        await cartStore.removeFromCart(id)
        toast.success("Product removed!");
    } catch(e) {
        toast.error("Error: " + (e as Error).message);
    }
}
</script>

<template>
    <div class="items-container">
        <div class="item-card" v-for="item in cartStore.cartItems" :key="item.id">
            <img :src="item.product.image_url ?? undefined" :alt="item.product.name" class="item-image">
            
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">{{ item.product.name }}</h3>
                    <button class="delete-btn" @click="removeFromCart(item.id)">🗑</button>
                </div>
                
                <div class="item-details">
                    <span class="size-badge">Size {{ item.size }}</span>
                    <span class="price">${{ item.product.price }}</span>
                </div>
                
                <div class="item-controls">
                    <div class="quantity-control">
                        <button class="qty-btn" @click="decreaseQuantity(item)">−</button>
                        <span class="qty-value">{{ item.quantity }}</span>
                        <button class="qty-btn" @click="updateQuantity(item)">+</button>
                    </div>
                    <span class="total-price">${{ item.product.price * item.quantity }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.items-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item-card {
    display: flex;
    gap: 16px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.item-card:hover {
    border-color: var(--color1);
    box-shadow: 0 4px 12px rgba(45, 138, 114, 0.1);
}

.item-image {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
}

.item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.item-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #333;
    flex: 1;
}

.delete-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.delete-btn:hover {
    opacity: 1;
}

.item-details {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: center;
}

.size-badge {
    background: #f0f0f0;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    font-weight: 500;
}

.price {
    font-size: 14px;
    color: #999;
}

.item-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--color1);
    padding: 8px 12px;
    border-radius: 8px;
    min-width: 120px;
    justify-content: center;
}

.qty-btn {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
    transition: opacity 0.2s;
}

.qty-btn:hover {
    opacity: 0.8;
}

.qty-value {
    color: white;
    font-weight: bold;
    font-size: 14px;
    min-width: 20px;
    text-align: center;
}

.total-price {
    font-size: 16px;
    font-weight: 700;
    color: var(--color1);
    min-width: 80px;
    text-align: right;
}

@media (max-width: 1399px) {
    .item-card {
        padding: 14px;
        gap: 14px;
    }
}

@media (max-width: 1199px) {
    .item-card {
        padding: 12px;
        gap: 12px;
    }
}

@media (max-width: 768px) {
    .item-card {
        flex-wrap: wrap;
        padding: 12px;
        gap: 12px;
    }

    .item-image {
        width: 120px;
        height: 120px;
    }

    .item-name {
        font-size: 14px;
    }

    .price {
        font-size: 12px;
    }

    .quantity-control {
        min-width: 100px;
        padding: 6px 10px;
    }

    .qty-btn {
        font-size: 14px;
    }

    .total-price {
        font-size: 14px;
        min-width: 60px;
    }
}

@media (max-width: 480px) {
    .items-container {
        align-items: center;
        max-width: 320px;
        margin: 0 auto;
    }

    .item-card {
        flex-direction: column;
        padding: 10px;
        gap: 10px;
        width: 100%;
    }

    .item-image {
        width: 100%;
        height: 160px;
    }

    .item-header {
        gap: 8px;
    }

    .item-name {
        font-size: 13px;
    }

    .delete-btn {
        font-size: 18px;
        padding: 2px 6px;
    }

    .item-details {
        gap: 10px;
        margin-bottom: 10px;
    }

    .size-badge {
        font-size: 11px;
        padding: 3px 8px;
    }

    .price {
        font-size: 11px;
    }

    .item-controls {
        gap: 10px;
    }

    .quantity-control {
        width: 100%;
        min-width: unset;
        padding: 8px;
        gap: 10px;
    }

    .qty-btn {
        font-size: 14px;
    }

    .total-price {
        font-size: 14px;
        width: 100%;
        text-align: center;
        padding: 8px 0;
        border-top: 1px solid #e0e0e0;
    }
    
    .delete-btn:hover {
        opacity: 0.7;
    }
    
    .trash img {
        height: 16px;
        width: 16px;
        cursor: pointer;
    }
    
    div.gap-3 {
        padding-bottom: 80px;
        gap: 10px !important;
    }
}
</style>