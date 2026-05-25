import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Role, User } from '../types'
import { useAuthStore } from './authStore'
import { API_URL } from '../api/config'

export const useUsersStore = defineStore('users', () => {
	const users = ref<User[]>([])
	const loading = ref(false)

	const fetchUsers = async () => {
		loading.value = true
		const authStore = useAuthStore()
		const res = await fetch(`${API_URL}/user/allUsers`, {
			headers: {
				Authorization: `Bearer ${authStore.access_token}`,
			},
		})
		if (!res.ok) return
		users.value = await res.json()
		loading.value = false
	}

	const updateUserRole = async (userId: number, newRole: Role) => {
		loading.value = true
		const res = await fetch(`${API_URL}/user/updateRole/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
			body: JSON.stringify({ role: newRole }),
		})
		if (!res.ok) throw new Error('Failed to update user role')
		const user = users.value.find(p => p.id === userId)
		if (user) user.role = newRole
		loading.value = false
	}

	const deleteUser = async (userId: number) => {
		loading.value = true
		const req = await fetch(`${API_URL}/user/delete/${userId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
		})
		if (!req.ok) throw new Error('Failed to delete user')
		users.value = users.value.filter(u => u.id !== userId)
		loading.value = false
	}

	const searchUsers = async (query: string) => {
		loading.value = true
		if (!query) return await fetchUsers()
		const res = await fetch(`${API_URL}/user/search?query=${encodeURIComponent(query)}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
		})
		users.value = await res.json()
		loading.value = false
	}

	return { users, loading, fetchUsers, updateUserRole, deleteUser, searchUsers }
})