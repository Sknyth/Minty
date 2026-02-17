import { defineStore } from 'pinia'
import axios from 'axios'

export const useItemsStore = defineStore('items', {
	state: () => ({
		items: [],
	}),
	actions: {
		async fetchItems() {
			const response = await axios.get(
				'https://a2dd1e9285d8464a.mokky.dev/items'
			)
			this.items = response.data
		},
	},
})