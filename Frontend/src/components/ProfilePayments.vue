<script>
import { useToast } from "vue-toastification"
import { useProfileStore } from '../stores/profileStore'
export default {
    props: {
        componentName: String
    },
    setup() {
        const toast = useToast()

        const profileStore = useProfileStore()

        return { toast, profileStore }

    },
    data() {
        return {
            cardNumber: '',
            cardHolderName: '',
            cardExpirationDate: '',
            cardCvv: '',
            toggleAddMethod: true,
            editId: null,
        };
    },
    computed: {
        currentPaymentId() {
            return this.profileStore.selectedPaymentId
        }
    },
    methods: {
        maskCard(number) {
            if (!number) return '';
            const str = number.toString();
            return `**** **** **** ${str.slice(-4)}`
        },
        async addPaymentMethod() {
            try {
                await this.profileStore.addPaymentMethod({
                    number: this.cardNumber,
                    holder_name: this.cardHolderName,
                    expiration_date: this.cardExpirationDate,
                    cvv: this.cardCvv,
                });
                this.cardNumber = ''
                this.cardHolderName = ''
                this.cardExpirationDate = ''
                this.cardCvv = ''

                this.toggleAddMethod = !this.toggleAddMethod

                this.toast.success("Payment method added!")
            } catch (e) {
                if(e.message === 'invalid input syntax for type bigint: ""'){
                    this.toast.error('Error: ' + 'Fill in all fields');
                    return
                }
                    
                this.toast.error('Error: ' + e.message)
            }
        },
        async deletePaymentMethod(id) {
            try {
                await this.profileStore.deletePaymentMethod(id)
                this.toast.success("Method deleted successfully!")
                
                if (this.selectedPaymentId === id) {
                    this.selectedPaymentId = null
                }
                if (this.currentPaymentId === id) {
                    await this.profileStore.updateSelectedMetadata({ paymentId: null })
                }
                this.ToggleChange = false
            } catch (e) {
                this.toast.error("Error: " + e.message)
            } 
        },
        getCardType(number) {
            const re = {
            Visa: /^4/,
            Mastercard: /^5[1-5]|^2(?:22[1-9]|2[3-9]\d|[3-6]\d\d|7[01]\d|720)/,
            Mir: /^220[0-4]/,
            Maestro: /^(5018|5020|5038|6304|6759|6761|6763)/
            }

            for (const [card, pattern] of Object.entries(re)) {
            if (pattern.test(number)) return card
            }
            return 'Unknown'
        },
        async selectPayment(id){
           try {
                await this.profileStore.updateSelectedMetadata({ paymentId: id })
                this.toast.success("Payment selected")
            } catch (e) {
                this.toast.error("Error: " + e.message)
            }
            
    },
    async mounted() {
        await this.profileStore.fetchPaymentMethods()
    }
}}
</script>

<template>
    <div>
        <h2>{{ componentName }}</h2>
        <div class="no-methods" v-if="profileStore.paymentMethods.length === 0 && toggleAddMethod" >
            <p>You don't have payment methods</p>
        </div>
        <div v-else-if="toggleAddMethod ?? profileStore.paymentMethods.length != 0">
            <div class="row gap-3 justify-content-start">
                <div
                 v-for="method in profileStore.paymentMethods" 
                 :key="method.id" 
                 :class="{ 'active-card': method.id === profileStore.selectedPaymentId }"
                 class="col payment-card"
                 @click="selectPayment(method.id)"
                 >
                <h4>{{ getCardType(method.number) }}</h4>
                <p>{{ maskCard(method.number) }}</p>
                <button @click.stop="deletePaymentMethod(method.id)" id="btn-delete">Delete</button>
                </div>
            </div>
            
            
        </div>

        

        <div v-else class="d-flex row justify-content-between gap-3 add-payment-card">
            <div class="d-flex flex-column gap-2 col">
                <label for="cardNumber">Card number</label>
                <input v-model="cardNumber" type="text" placeholder="1234 5678 9012 3456">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardHolderName">Holder name</label>
                <input v-model="cardHolderName" type="text" placeholder="Alexander Pushkin">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardExpirationDate">Expiration date</label>
                <input v-model="cardExpirationDate" type="text" placeholder="MM/YY">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardCvv">CVV</label>
                <input v-model="cardCvv" type="text" placeholder="***">
            </div>
            <button @click="addPaymentMethod" class="button-color1 mt-3" id="btn-save">Save</button>
            <button @click="toggleAddMethod = !toggleAddMethod" class="button-color1 mt-3" id="btn-save">Back</button>
        </div>
        
        <div class="d-flex justify-content-end">
            <button @click="toggleAddMethod = !toggleAddMethod" v-if="toggleAddMethod" class="button-color1 mt-3 ">+ Add payment methods</button>
        </div>
        
        
        
    </div>
</template>

<style scoped>
.payment-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 15px;
    width: 400px;
    flex: 0 0 auto;
    cursor: pointer;

}
.active-card {
    border: 2px solid var(--color1);
    background-color: #f0f7ff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}
.add-payment-card input {
    width: 340px;
    margin: 0;
    min-height: 42px;
}
#btn-save {
    width: 100px;
}
#btn-delete {
    color: #dc3545;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
}
.no-methods p {
    padding: 0;
    margin: 20px 0;
    text-align: center;

}
</style>