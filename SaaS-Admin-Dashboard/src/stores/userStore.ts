import { defineStore } from 'pinia'
import type { Role, User } from '../types'
import { useAuthStore } from './authStore'

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [] as User[],
		loading: false,
	}),
	actions: {
		async fetchUsers() {
      this.loading = true
      const authStore = useAuthStore()
      const res = await fetch('http://localhost:3000/user/allUsers', {
        headers: {
          Authorization: `Bearer ${authStore.access_token}`,
        },
      })
      if (!res.ok) return
      
      this.users = await res.json()
      this.loading = false
    },
    async updateUserRole(userId: number, newRole: Role) {
      this.loading = true
      
      const res = await fetch(`http://localhost:3000/user/updateRole/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore().access_token}`,
        },
        body: JSON.stringify({ role: newRole }),
      })
      if (!res.ok) throw new Error('Failed to update user role')
      const user = this.users.find(p => p.id === userId)

      if (user) user.role = newRole
      this.loading = false
    },

    async deleteUser(userId: number) {
      this.loading = true
      const req = await fetch(`http://localhost:3000/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useAuthStore().access_token}`,
        },
      })
      if (!req.ok) throw new Error('Failed to delete user')

      this.users = this.users.filter(u => u.id !== userId)
      this.loading = false
    },
    
    async searchUsers(query: string) {
      this.loading = true
      if (!query) return await this.fetchUsers()
  
      const res = await fetch(`http://localhost:3000/user/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
				headers: {
					Authorization: `Bearer ${useAuthStore().access_token}`,
				},
      })
      this.users = await res.json()
      this.loading = false
	  },
  },
})