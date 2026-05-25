<script setup lang="ts">
import { useToast } from "vue-toastification"
import { useAddressStore } from '../stores/addressStore'
import type { Address } from '../types'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  componentName: String
})

const toast = useToast()
const addressStore = useAddressStore()

onMounted(async () => {
    await addressStore.fetchAddress()
})
        
const toggleAddAddress = ref(true)
const toggleEdit = ref(false)
const editId = ref<number | null>(null)
const country = ref('')
const city = ref('')
const street = ref('')
const house_number = ref('')
const apt = ref('')
const postcode = ref('')

const currentAddressId = computed(() => addressStore.selectedAddressId)

const resetAddressFields = () => {
    country.value = ''
    city.value = ''
    street.value = ''
    house_number.value = ''
    apt.value = ''
    postcode.value = ''
    editId.value = null
}

const addAddress = async () => {
    try {
        await addressStore.addAddress({
            country: country.value,
            city: city.value,
            street: street.value,
            house_number: house_number.value,
            apt: apt.value,
            postcode: postcode.value,
        } as Address)
        resetAddressFields()
        toggleAddAddress.value = true
        toast.success("Address added!")
    } catch(e){
        toast.error('Error: ' + (e as Error).message)
    }
}

const updateAddress = async () => {
    try {
        await addressStore.updateAddress(editId.value!, {
            country: country.value,
            city: city.value,
            street: street.value,
            house_number: house_number.value,
            apt: apt.value,
            postcode: postcode.value,
        } as Address)
        toggleAddAddress.value = true
        toggleEdit.value = false
        resetAddressFields()
        toast.success("Address updated successfully!")
    } catch(e){
        toast.error("Error: " + (e as Error).message)
    }
}

const deleteAddress = async (id: number) => { 
    try {
        await addressStore.deleteAddress(id)
        toast.success("Address deleted successfully!")
    } catch (e) {
        toast.error("Error: " + (e as Error).message)
    } 
}

const editAddress = (address: Address) => {
    editId.value = address.id
    country.value = address.country
    city.value = address.city
    street.value = address.street
    house_number.value = address.house_number
    apt.value = address.apt
    postcode.value = address.postcode

    toggleAddAddress.value = false
    toggleEdit.value = true
}

const selectAddress = async (id: number) => {
    try {
        await addressStore.selectAddress(id)
        toast.success("Address selected")
    } catch (e) {
        toast.error("Error: " + (e as Error).message)
    }
}

const backAddress = () =>{
    resetAddressFields()
    toggleAddAddress.value = true
    toggleEdit.value = false
}
</script>

<template>
    <div>
        <h2>{{ $props.componentName }}</h2>

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