import { defineStore } from 'pinia'
import type { User } from '@/types'
import { useCartStore } from './cartStore'
import router from '@/router'
import { API_URL } from '@/api/config'
import { useWishlistStore } from './wishlistStore'
import { useProductsStore } from './productsStore'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const access_token = ref<string | null>(localStorage.getItem('access_token'))
  const refresh_token = ref<string | null>(localStorage.getItem('refresh_token'))
  const loading = ref(true)
  const error = ref(false)

  const isAuth = computed(() => !!access_token.value)

  const signUp = async ({ email, password, name }: { email: string, password: string, name: string }) => {
    const req = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, surname: '', phone: '' })
    })
    if (!req.ok) throw new Error('Failed to create user')
    await signIn({ email, password })
    router.push('/profile')
  }

  const signIn = async ({ email, password }: { email: string, password: string }) => {
    const req = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!req.ok) throw new Error('Failed to sign in')
    const data = await req.json()
    access_token.value = data.access_token
    refresh_token.value = data.refresh_token
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    await getUser()
  }

  const getUser = async () => {
    loading.value = true
    error.value = false
    try {
      if (!access_token.value) return
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${access_token.value}` },
      })
      if (!res.ok) {
        error.value = true
        return
      }
      user.value = await res.json()
    } finally {
      loading.value = false
    }
  }

  const refreshToken = async () => {
    const token = localStorage.getItem('refresh_token')
    if (!token) { signOut(); return }
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: token }),
    })
    if (!res.ok) { signOut(); return }
    const data = await res.json()
    if (!data.access_token) { signOut(); return }
    access_token.value = data.access_token
    localStorage.setItem('access_token', data.access_token)
  }

  const initializeAuth = async () => {
    const cartStore = useCartStore()
    const wishlistStore = useWishlistStore()
    const productStore = useProductsStore()
    if (!access_token.value && !refresh_token.value) return
    if (access_token.value) await getUser()
    if (!user.value && refresh_token.value) {
      await refreshToken()
      if (access_token.value) await getUser()
    }
    if (!user.value) { signOut(); return }
    await productStore.fetchProducts()
    await wishlistStore.fetchWishlist()
    await cartStore.fetchCart()
  }

  const signOut = async () => {
    const cartStore = useCartStore()
    user.value = null
    access_token.value = null
    refresh_token.value = null
    cartStore.cartItems = []
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  const updateUser = async (name: string, surname: string, phone: string) => {
    if (!user.value) return
    const req = await fetch(`${API_URL}/user/update/${user.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token.value}`,
      },
      body: JSON.stringify({ name, surname, phone })
    })
    if (!req.ok) throw new Error('Failed to update profile')
    await getUser()
  }

  const changePass = async (oldPass: string, newPass: string) => {
    if (!user.value) return
    const req = await fetch(`${API_URL}/user/changePass/${user.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token.value}`,
      },
      body: JSON.stringify({ oldPass, newPass })
    })
    const data = await req.json()
    if (!req.ok) throw new Error(data.message)
    await signOut()
    router.push('/login')
  }

  return { user, access_token, refresh_token, loading, error, isAuth, signUp, signIn, getUser, refreshToken, initializeAuth, signOut, updateUser, changePass }
})