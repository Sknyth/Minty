import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'
import type { Wishlist } from '@/types'
import { API_URL } from '@/api/config'

export const useWishlistStore = defineStore('wishlist', () => {
	const wishlist = ref<Wishlist[]>([])
	const loading = ref(false)
	const error = ref(false)

	const isInWishlist = computed(() => (productId: number) => {
		return wishlist.value.some((item: Wishlist) => item.productId === productId)
	})

	const fetchWishlist = async () => {
		loading.value = true
		error.value = false
		try {
			const authStore = useAuthStore()
			if (!authStore.user) return

			const res = await fetch(`${API_URL}/wishlist/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})

			if (!res.ok) {
				error.value = true
				return
			}

			wishlist.value = await res.json()
		} finally {
			loading.value = false
		}
	}

	const addToWishlist = async (productId: number) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')

		const req = await fetch(`${API_URL}/wishlist/add/${authStore.user.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({ productId }),
		})
		if (!req.ok) throw new Error('Failed to add to wishlist')

		await fetchWishlist()
	}

	const deleteFromWishlist = async (productId: number) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')

		const req = await fetch(`${API_URL}/wishlist/remove/${authStore.user.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({ productId }),
		})
		if (!req.ok) throw new Error('Failed to remove from wishlist')

		wishlist.value = wishlist.value.filter(item => item.productId !== productId)
	}

	return {
		wishlist,
		loading,
		error,
		isInWishlist,
		fetchWishlist,
		addToWishlist,
		deleteFromWishlist,
	}
})