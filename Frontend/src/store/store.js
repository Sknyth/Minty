import axios from 'axios'
import { createStore } from 'vuex'
import { supabase } from '../supabase.js'

const store = createStore({
	state() {
		return {
			items: [],
			cartItems: [],
			user: null,
			isAuth: false,
			profile: null,
			payment_methods: [],
			addresses: [],
		}
	},
	getters: {
		allItems: state => state.items,
		cartItems: state => state.cartItems,
		isAuth: state => !!state.user,
		user: state => state.user,
		profile: state => state.profile,
		allPayments: state => state.payment_methods,
		addresses: state => state.addresses,
		currentAddressId: state => state.selectedAddressId,
  	currentPaymentId: state => state.selectedPaymentId,
	},
	actions: {
		async initializeAuth({ dispatch, commit }) {
			const { data: { session } } = await supabase.auth.getSession()
			if (session) {
				commit('SET_USER', session.user)
				await Promise.all([
					dispatch('fetchProfile'),
					dispatch('fetchCart'),
					dispatch('fetchAddresses'),
					dispatch('fetchPaymentMethods')
				])
			}
		},

		async fetchItems({ commit }) {
			const response = await axios.get(
				'https://a2dd1e9285d8464a.mokky.dev/items'
			)
			commit('setItems', response.data)
		},

		async signUp({ commit }, { email, password, name }) {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						name,
					},
				},
			})

			if (error) throw error

			commit('SET_USER', data.user)
		},

		async signIn({ commit, dispatch }, { email, password }) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error

			commit('SET_USER', data.user)

			await Promise.all([
				dispatch('fetchProfile'),
				dispatch('fetchCart'),
				dispatch('fetchAddresses'),
				dispatch('fetchPaymentMethods')
			])
		},

		async getUser({ commit }) {
			const { data: { session } } = await supabase.auth.getSession()

			if (!session) {
				commit('SET_USER', null)
				commit('SET_PROFILE', null)
				return
			}

			const user = session.user
			commit('SET_USER', user)

			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single()

			if (profile) {
				commit('SET_PROFILE', profile)
			}
		},

		async fetchProfile({ commit, state }) {
			if (!state.user) return


			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', state.user.id)
				.single()

			if (error) throw error
      commit('SET_PROFILE', profile);
        
      if (profile.selected_address_id) {
        commit('SET_SELECTED_ADDRESS', profile.selected_address_id);
      }
      if (profile.selected_payment_id) {
        commit('SET_SELECTED_PAYMENT', profile.selected_payment_id);
      }
    
		},

		async updateProfile({ commit, state }, { name, surname }) {
			if (!state.user || !state.user.id) {
				throw new Error("User is not authorized")
			}

			const { data: updatedProfile, error } = await supabase
				.from('profiles')
				.update({
					name,
					surname,
				})
				.eq('id', state.user.id)
				.select()
				.single()

			if (error) throw error
			commit('SET_PROFILE', updatedProfile)
		},

		async fetchAddresses({ commit, state }) {
			if (!state.user) return
			const { data: addresses, error } = await supabase
				.from('addresses')
				.select('*')
				.eq('user_id', state.user.id)
			if (error) throw error
			commit('SET_ADDRESSES', addresses)
		},

		async addAddress({ dispatch, state }, { country, city, street, house_number, apt, postcode, phone }) {
			if (!state.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('addresses')
				.insert([
					{
						user_id: state.user.id,
						country: country,
						city: city,
						street: street,
						house_number: house_number,
						apt: apt,
						postcode: postcode,
						phone: phone
					}
				])

			if (error) throw error
			await dispatch('fetchAddresses')
		},

		async updateAddress({ dispatch, state }, { id, country, city, street, house_number, apt, postcode, phone }) {
			if (!state.user || !state.user.id) {
				throw new Error("User is not authorized")
			}

			if (!id) {
				throw new Error("Address ID is missing")
			}


			const { data: updatedAddress, error } = await supabase
				.from('addresses')
				.update({
					country: country,
					city: city,
					street: street,
					house_number: house_number,
					apt: apt,
					postcode: postcode,
					phone: phone
				})
				.eq('id', id)

			if (error) throw error
			await dispatch('fetchAddresses')
		},

		async deleteAddress({ commit, state }, id) {
			const { error } = await supabase
				.from('addresses')
				.delete()
				.eq('id', id)
			if (error) throw error
			commit('REMOVE_ADDRESSES', id)
		},

		async fetchPaymentMethods({ commit, state }) {
			if (!state.user) return
			const { data: payment_methods, error } = await supabase
				.from('payment_methods')
				.select('*')
				.eq('user_id', state.user.id)
			if (error) throw error
			commit('SET_PAYMENT_METHODS', payment_methods)
		},

		async addPaymentMethod({ dispatch, state }, { number, holder_name, expiration_date, cvv }) {
			if (!state.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('payment_methods')
				.insert([
					{
						user_id: state.user.id,
						number: number,
						holder_name: holder_name,
						expiration_date: expiration_date,
						cvv: cvv
					}
				])

			if (error) throw error
			await dispatch('fetchPaymentMethods')
		},

		async deletePaymentMethod({ commit, state }, id) {
			const { error } = await supabase
				.from('payment_methods')
				.delete()
				.eq('id', id)
			if (error) throw error
			commit('REMOVE_PAYMENT_METHOD', id)
		},

		async signOut({ commit }) {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			commit('SET_USER', null)
			commit('SET_PROFILE', null)
			commit('SET_PAYMENT_METHODS', [])
			commit('SET_ADDRESSES', [])
			commit('SET_CART', [])
		},

		async fetchCart({ commit, state }) {
			if (!state.user) return
			const { data: cart, error } = await supabase
				.from('cart')
				.select('*')
				.eq('user_id', state.user.id)
			if (error) throw error
			commit('SET_CART', cart)
		},

		async addToCart({ dispatch, state }, { imageURL, title, price, description, size }) {
			if (!state.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('cart')
				.insert([
					{
						user_id: state.user.id,
						imageURL: imageURL,
						title: title,
						price: price,
						description: description,
						size: size
					}
				])

			if (error) throw error
			await dispatch('fetchCart')
		},

		async removeFromCart({ commit, state }, id) {
			const { error } = await supabase
				.from('cart')
				.delete()
				.eq('id', id)
			if (error) throw error
			commit('REMOVE_FROM_CART', id)
		},

		async updateSelectedMetadata({ state, commit }, { addressId, paymentId }) {
			if (!state.user) return;

			const updateData = {};
			if (addressId) updateData.selected_address_id = addressId;
			if (paymentId) updateData.selected_payment_id = paymentId;

			const { data, error } = await supabase
					.from('profiles')
					.update(updateData)
					.eq('id', state.user.id)
					.select()
					.single()

			if (error) {
					console.error("Supabase Error:", error.message);
					throw error;
			}

			if (data) {
					commit('SET_PROFILE', data);
					
					if (addressId) commit('SET_SELECTED_ADDRESS', addressId);
					if (paymentId) commit('SET_SELECTED_PAYMENT', paymentId);
			}
	}
		
	},
	mutations: {
		setItems(state, items) {
			state.items = items
		},
		SET_CART(state, item) {
			state.cartItems = item
		},
		REMOVE_FROM_CART(state, id) {
			state.cartItems = state.cartItems.filter(item => item.id !== id)
		},
		SET_USER(state, user) {
			state.user = user
			state.isAuth = !!user
			if (!user) state.profile = null
		},
		SET_PROFILE(state, profile) {
			state.profile = profile
		},
		SET_PAYMENT_METHODS(state, payment_methods) {
			state.payment_methods = payment_methods
		},
		REMOVE_PAYMENT_METHOD(state, id) {
			state.payment_methods = state.payment_methods.filter(method => method.id !== id)
		},
		SET_ADDRESSES(state, addresses) {
			state.addresses = addresses
		},
		REMOVE_ADDRESSES(state, id) {
			state.addresses = state.addresses.filter(address => address.id !== id)
		},
		SET_SELECTED_PAYMENT(state, id) {
			state.selectedPaymentId = id
		},
		SET_SELECTED_ADDRESS(state, id) {
			state.selectedAddressId = id
		},
	},
})

export default store
