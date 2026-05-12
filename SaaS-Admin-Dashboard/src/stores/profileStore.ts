import { defineStore } from 'pinia'
import supabase from '../supabase'
import { useAuthStore } from './authStore'
import type { Profile } from '../types'

export const useProfileStore = defineStore('profile', {
	state: () => ({
		profiles: [] as Profile[],
		loading: false,
		authStore: useAuthStore(),
	}),
	actions: {
		async fetchProfiles() {
      this.loading = true
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('id') 

      if (error) throw error

      this.profiles = data
      this.loading = false
    },
    async updateUserRole(profileId: string, newRole: string) {
      this.loading = true
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', profileId)

      if (error) throw error
      const profile = this.profiles.find(p => p.id === profileId)

      if (profile) profile.role = newRole
      this.loading = false
    },
    async deleteUser(profileId: string) {
      this.loading = true
      const { error } = await supabase.rpc('delete_user_by_admin', {
        target_user_id: profileId
      })

      if (error) throw error

      this.profiles = this.profiles.filter(p => p.id !== profileId)
      this.loading = false
    },
    async searchProfiles(query: string) {
      this.loading = true
      if (!query) return await this.fetchProfiles()
  
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .textSearch('fts', query, {
          config: 'english',
          type: 'websearch'
        })
      if (error) throw error
      this.profiles = data
      this.loading = false
	  },
  },
})