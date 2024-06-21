import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			items: [],
		}
	},
	getters: {
		allItems: state => state.items,
	},
	actions: {
		async fetchItems({ commit }) {
			const response = await axios.get(
				'https://a2dd1e9285d8464a.mokky.dev/items'
			)
			commit('setItems', response.data)
		},
	},
	mutations: {
		setItems: (state, items) => (state.items = items),
	},
})

export default store
