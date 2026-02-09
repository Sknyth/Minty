<script>
import { useToast } from "vue-toastification"
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        componentName: String
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    data(){
        return {
            toggleAddAddress: true,
            toggleEdit: false,
            editId: null, 
            country: '',
            city: '',
            street: '',
            house_number: '',
            apt: '',
            postcode: '',
            phone: '',
        }
    },
    computed: {
        ...mapGetters(['addresses', 'currentAddressId']),
    },
    methods: {
        ...mapActions(['fetchAddresses', 'addAddress', 'deleteAddress', 'updateAddress', 'updateSelectedMetadata']),
        
        resetAddressFields(){
            this.country = ''
            this.city = ''
            this.street = ''
            this.house_number = ''
            this.apt = ''
            this.postcode = ''
            this.phone = ''
            this.editId = null
        },

        async addAddress(){
            try {
                await this.$store.dispatch('addAddress',{
                    country: this.country,
                    city: this.city,
                    street: this.street,
                    house_number: this.house_number,
                    apt: this.apt,
                    postcode: this.postcode,
                    phone: this.phone
                });
                this.resetAddressFields();
                this.toggleAddAddress = true;
                this.toast.success("Address added!")
            } catch(e){
                this.toast.error('Error: ' + e.message)
            }
        },

        async updateAddress(){
            try {
                await this.$store.dispatch('updateAddress',{
                    id: this.editId, 
                    country: this.country,
                    city: this.city,
                    street: this.street,
                    house_number: this.house_number,
                    apt: this.apt,
                    postcode: this.postcode,
                    phone: this.phone
                })
                this.toggleAddAddress = true
                this.toggleEdit = false
                this.resetAddressFields()
                this.toast.success("Address updated successfully!")
            } catch(e){
                this.toast.error("Error: " + e.message)
            }
        },

        editAddress(address){
            this.editId = address.id 
            this.country = address.country
            this.city = address.city
            this.street = address.street
            this.house_number = address.house_number
            this.apt = address.apt
            this.postcode = address.postcode
            this.phone = address.phone

            this.toggleAddAddress = false
            this.toggleEdit = true
        },

        async selectAddress(id) {
            try {
                await this.updateSelectedMetadata({ addressId: id })
                this.toast.success("Address selected")
            } catch (e) {
                this.toast.error("Error: " + e.message)
            }
        },

        backAddress(){
            this.resetAddressFields()
            this.toggleAddAddress = true
            this.toggleEdit = false
        },
    },
    mounted(){
        this.fetchAddresses()
    }
}
</script>

<template>
    <div>
        <h2>{{ componentName }}</h2>

        <div v-if="addresses.length === 0 && toggleAddAddress">
            <p class="text-center">You don't have addresses</p>
        </div>

        <div v-else-if="toggleAddAddress ?? addresses.length != 0">
            <div 
                v-for="address in addresses" 
                :key="address.id" 
                :class="{ 'active-card': address.id === currentAddressId }" 
                @click="selectAddress(address.id)" 
                class="address-card mb-3">
                <h4>Main address</h4>
                <p>{{ address.street }}, {{ address.house_number }}</p>
                <p>{{ address.city }}, {{ address.postcode }}</p>
                
                <button @click.stop="editAddress(address.id)" id="btn-edit">Edit</button>
                <button @click.stop="deleteAddress(address.id)" id="btn-delete">Delete</button>
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
                <div class="d-flex flex-column gap-2 col">
                    <label>Phone</label>
                    <input v-model="phone" type="text" placeholder="Phone">
                </div>
            </div>


            <div v-if="!toggleAddAddress" class="gap-3 d-flex justify-content-end mt-4">
                <button v-if="!toggleEdit" @click="addAddress" class="button-color1" id="btn-save">
                    Save
                </button>

                <button v-else @click="updateAddress" class="button-color1" id="btn-save">
                    Save changes
                </button>

                <button @click="backAddress" class="button-color1" id="btn-save">
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
    cursor: pointer;
}
.active-card {
    border: 2px solid #007bff;
    background-color: #f0f7ff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}
#btn-edit {
    color: #1584FF;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
}
#btn-delete {
    color: #dc3545;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
}
.add-address input {
    width: 340px;
    margin: 0;
    min-height: 42px;
}
#btn-save {
    width: 120px;
}
</style>