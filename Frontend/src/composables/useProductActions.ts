import { useToast } from 'vue-toastification'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

export function useProductActions() {
  const toast = useToast()
  const cartStore = useCartStore()
  const wishlistStore = useWishlistStore()

  const addProductToCart = async (
    productId: number,
    size: number | undefined,
    successMessage = 'Product added to your cart!',
  ) => {
    try {
      const item = cartStore.isInCart(productId, size)
      if (item) {
        await cartStore.updateQuantity({ id: item.id, quantity: item.quantity + 1 })
      } else {
        await cartStore.addToCart({ product_id: productId, size, quantity: 1 })
      }
      toast.success(successMessage)
    } catch (error) {
      toast.error('Error: ' + (error as Error).message)
    }
  }

  const toggleWishlist = async (productId: number) => {
    try {
      if (wishlistStore.isInWishlist(productId)) {
        await wishlistStore.deleteFromWishlist(productId)
        toast.success('Product removed from wishlist!')
      } else {
        await wishlistStore.addToWishlist(productId)
        toast.success('Product added to your wishlist!')
      }
    } catch (error) {
      toast.error('Error: ' + (error as Error).message)
    }
  }

  return { addProductToCart, toggleWishlist }
}
