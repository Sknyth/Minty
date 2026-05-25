import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { Address } from '@/types'
import { API_URL } from '@/api/config'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const address = ref<Address[]>([])
  const selectedAddressId = ref<number | null>(null)
  const loading = ref(true)
  const error = ref(false)

  const fetchAddress = async () => {
    loading.value = true
    error.value = false
    try {
      const authStore = useAuthStore()
      if (!authStore.user) return
      const res = await fetch(`${API_URL}/address/${authStore.user.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.access_token}`,
        },
      })
      if (!res.ok) {
        error.value = true
        return
      }
      address.value = await res.json()
      selectedAddressId.value = authStore.user.selectedAddressId ?? null
    } finally {
      loading.value = false
    }
  }

  const addAddress = async (data: Address) => {
    const authStore = useAuthStore()
    if (!authStore.user) throw new Error('You are not logged in')
    const req = await fetch(`${API_URL}/address/add/${authStore.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.access_token}`,
      },
      body: JSON.stringify(data),
    })
    if (!req.ok) throw new Error('Failed to add address')
    await fetchAddress()
  }

  const deleteAddress = async (addressId: number) => {
    const authStore = useAuthStore()
    if (!authStore.user) throw new Error('You are not logged in')
    const req = await fetch(`${API_URL}/address/delete/${addressId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.access_token}`,
      },
    })
    if (!req.ok) throw new Error('Failed to delete address')
    address.value = address.value.filter((a: Address) => a.id !== addressId)
    if (selectedAddressId.value === addressId) {
      await selectAddress(null)
    }
  }

  const selectAddress = async (id: number | null) => {
    const authStore = useAuthStore()
    if (!authStore.user) throw new Error('You are not logged in')
    const req = await fetch(`${API_URL}/user/selectAddress/${authStore.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.access_token}`,
      },
      body: JSON.stringify({ selectedAddressId: id }),
    })
    if (!req.ok) throw new Error('Failed to select address')
    selectedAddressId.value = id
  }

  const updateAddress = async (addressId: number, data: Address) => {
    const authStore = useAuthStore()
    if (!authStore.user) throw new Error('You are not logged in')
    const req = await fetch(`${API_URL}/address/update/${addressId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.access_token}`,
      },
      body: JSON.stringify(data),
    })
    if (!req.ok) throw new Error('Failed to update address')
    await fetchAddress()
  }

  return { address, selectedAddressId, loading, error, fetchAddress, addAddress, deleteAddress, selectAddress, updateAddress }
})