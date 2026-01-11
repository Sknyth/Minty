import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			items: [],
			cartItems: [],
		}
	},
	getters: {
		allItems: state => state.items,
		cartItems: state => state.cartItems
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
		setItems(state, items) {
			state.items = items
		},
		ADD_TO_CART(state, item) {
     		state.cartItems.push({...item, id: Date.now()})
    	},
		REMOVE_FROM_CART(state, id){
			state.cartItems = state.cartItems.filter(item => item.id !== id)
		},
		

	},
	
})

export default store
