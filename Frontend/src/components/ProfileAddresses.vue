<script lang="ts">
import { useToast } from "vue-toastification"
import { useAddressStore } from '../stores/addressStore'
import type { Address } from '../types'

export default {
    props: {
        componentName: String
    },
    setup() {
        const toast = useToast()

        const addressStore = useAddressStore()
        addressStore.fetchAddress()
        
        return { toast, addressStore }
    },
    data(){
        return {
            toggleAddAddress: true,
            toggleEdit: false,
            editId: null as number | null, 
            country: '',
            city: '',
            street: '',
            house_number: null as string | null,
            apt: null as string | null,
            postcode: null as string | null
        }
    },
    computed: {
        currentAddressId() {
            return this.addressStore.selectedAddressId
        }
    },
    methods: {
        resetAddressFields(){
            this.country = ''
            this.city = ''
            this.street = ''
            this.house_number = '' 
            this.apt = ''
            this.postcode = ''
            this.editId = null
        },

        async addAddress(){
            try {
                await this.addressStore.addAddress({
                    country: this.country,
                    city: this.city,
                    street: this.street,
                    house_number: this.house_number,
                    apt: this.apt,
                    postcode: this.postcode,
                } as Address)
                this.resetAddressFields()
                this.toggleAddAddress = true
                this.toast.success("Address added!")
            } catch(e){
                this.toast.error('Error: ' + (e as Error).message)
            }
        },

        async updateAddress(){
            try {
                await this.addressStore.updateAddress(this.editId!, {
                    country: this.country,
                    city: this.city,
                    street: this.street,
                    house_number: this.house_number,
                    apt: this.apt,
                    postcode: this.postcode,
                } as Address)
                this.toggleAddAddress = true
                this.toggleEdit = false
                this.resetAddressFields()
                this.toast.success("Address updated successfully!")
            } catch(e){
                this.toast.error("Error: " + (e as Error).message)
            }
        },

        async deleteAddress(id: number){ 
            try {
                await this.addressStore.deleteAddress(id)
                this.toast.success("Address deleted successfully!")
            } catch (e) {
                this.toast.error("Error: " + (e as Error).message)
            } 
        },

        editAddress(address: Address){
            this.editId = address.id
            this.country = address.country
            this.city = address.city
            this.street = address.street
            this.house_number = address.house_number
            this.apt = address.apt
            this.postcode = address.postcode

            this.toggleAddAddress = false
            this.toggleEdit = true
        },

        async selectAddress(id: number) {
            try {
                await this.addressStore.selectAddress(id)
                this.toast.success("Address selected")
            } catch (e) {
                this.toast.error("Error: " + (e as Error).message)
            }
        },

        backAddress(){
            this.resetAddressFields()
            this.toggleAddAddress = true
            this.toggleEdit = false
        },
    },
}
</script>

<template>
    <div>
        <h2>{{ componentName }}</h2>

        <div v-if="addressStore.loading" class="loading-state text-center p-5">
          <div class="spinner-border"></div>
          <p>Loading addresses data...</p>
        </div>

        <div v-else-if="addressStore.error">
            <p class="text-center">Something went wrong 😕</p>
        </div>

        <div v-else-if="!addressStore.address.length && toggleAddAddress">
            <p class="text-center">You don't have addresses</p>
        </div>

        <div class="row" v-else-if="toggleAddAddress && addressStore.address.length != 0">
            <div 
                v-for="address in addressStore.address" 
                :key="address.id" 
                :class="{ 'active-card': address.id === currentAddressId }" 
                @click="selectAddress(address.id)" 
                class="address-card col mb-3 mt-3 d-flex justify-content-between flex-column">
                <div>
                    <h4>Main address</h4>
                    <span>{{ address.street }}, {{ address.house_number }}</span>
                    <br>
                    <span>{{ address.city }}, {{ address.postcode }}</span>
                </div>
                
                <div>
                    <button @click.stop="editAddress(address)" class="btn-edit">Edit</button>

                    <button @click.stop="deleteAddress(address.id)" class="btn-delete">Delete</button>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="d-flex row justify-content-between gap-3 add-address">
                <div class="d-flex flex-column gap-2 col">
                    <label>Country</label>
                    <input v-model="country" type="text" placeholder="Country">
                </div>
                <div class="d-flex flex-column gap-2 col">
                    <label>City</label>
                    <input v-model="city" type="text" placeholder="City">
                </div>
                <div class="d-flex flex-column gap-2 col">
                    <label>Street</label>
                    <input v-model="street" type="text" placeholder="Street">
                </div>
                <div class="d-flex flex-column gap-2 col">
                    <label>House number</label>
                    <input v-model="house_number" type="text" placeholder="House number">
                </div>
                <div class="d-flex flex-column gap-2 col">
                    <label>Apartment</label>
                    <input v-model="apt" type="text" placeholder="Apartment">
                </div>
                <div class="d-flex flex-column gap-2 col">
                    <label>Postcode</label>
                    <input v-model="postcode" type="text" placeholder="Postcode">
                </div>
            </div>


            <div v-if="!toggleAddAddress" class="gap-3 d-flex justify-content-end mt-4">
                <button v-if="!toggleEdit" @click="addAddress" class="button-color1 btn-save">
                    Save
                </button>

                <button v-else @click="updateAddress" class="button-color1 btn-save">
                    Save changes
                </button>

                <button @click="backAddress" class="button-color1 btn-save">
                    Back
                </button>
            </div>
        </div>
        <div v-if="toggleAddAddress" class="d-flex justify-content-end">
            <button @click="toggleAddAddress = false; toggleEdit = false" class="button-color1 mt-3">
                + Add new address
            </button>
        </div>    
    </div>
    
</template>

<style scoped>
.address-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 15px;
    width: 400px;
    min-height: 200px;
    flex: 0 0 auto;
    cursor: pointer;
}
.active-card {
    border: 2px solid var(--color1);
    background-color: #f0f7ff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}
.btn-edit {
    color: #1584FF;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
    transition: background-color 0.3s ease;
}
.btn-edit:hover {
    background-color: rgba(21, 132, 255, 0.1);
}
.btn-delete {
    color: #dc3545;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}
.btn-delete:hover {
    background-color: rgba(220, 53, 69, 0.1);
}
.add-address input {
    width: 340px;
    margin: 0;
    min-height: 42px;
}
.btn-save {
    width: 120px;
}
</style>