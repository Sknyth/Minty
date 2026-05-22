<script lang="ts">
import { useToast } from "vue-toastification"
import { usePaymentStore } from '../stores/paymentStore'
import type { PaymentMethod } from '../types'
export default {
    props: {
        componentName: String
    },
    setup() {
        const toast = useToast()

        const paymentStore = usePaymentStore()

        return { toast, paymentStore }

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
            return this.paymentStore.selectedPaymentId
        }
    },
    methods: {
        maskCard(number: string) {
            if (!number) return ''
            return `**** **** **** ${number.slice(-4)}`
        },
        async addPaymentMethod() {
            try {
                await this.paymentStore.addPayment({
                    number: this.cardNumber,
                    holder_name: this.cardHolderName,
                    expiration_date: this.cardExpirationDate,
                    cvv: this.cardCvv,
                    type: this.getCardType(this.cardNumber)
                } as PaymentMethod);
                this.cardNumber = ''
                this.cardHolderName = ''
                this.cardExpirationDate = ''
                this.cardCvv = ''

                this.toggleAddMethod = !this.toggleAddMethod

                this.toast.success("Payment method added!")
            } catch (e) {
                if((e as Error).message === 'invalid input syntax for type bigint: ""'){
                    this.toast.error('Error: ' + 'Fill in all fields');
                    return
                }
                this.toast.error('Error: ' + (e as Error).message)
            }
        },
        async deletePayment(id: number) {
            try {
                await this.paymentStore.deletePayment(id)
                this.toast.success("Method deleted successfully!")
            } catch (e) {
                this.toast.error("Error: " + (e as Error).message)
            } 
        },
        getCardType(number: string): string {
            if (!number) return 'Unknown'
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
        async selectPayment(selectedPaymentId: number | null) {
           try {
                await this.paymentStore.selectPayment(selectedPaymentId)
                this.toast.success("Payment selected")
            } catch (e) {
                this.toast.error("Error: " + (e as Error).message)
            }   
        },
    },

    async mounted() {
        await this.paymentStore.fetchPayment()
    }
}
</script>

<template>
    <div>
        <h2>{{ componentName }}</h2>

        <div v-if="paymentStore.loading" class="loading-state text-center p-5">
          <div class="spinner-border"></div>
          <p>Loading payments data...</p>
        </div>

        <div v-else-if="paymentStore.error">
            <p class="text-center">Something went wrong 😕</p>
        </div>

        <div v-else-if="!paymentStore.payment.length">
            <p class="text-center">You don't have orders</p>
        </div>

        <div v-else-if="toggleAddMethod ?? paymentStore.payment.length != 0">
            
            <div class="row gap-3 justify-content-start">
                <div
                 v-for="method in paymentStore.payment" 
                 :key="method.id" 
                 :class="{ 'active-card': method.id === paymentStore.selectedPaymentId }"
                 class="col payment-card mb-3 mt-3 d-flex justify-content-between flex-column"
                 @click="selectPayment(method.id)"
                 >
                 <div class="d-flex flex-column gap-2">
                    <h4>{{ method.type }}</h4>
                    <p>{{ maskCard(method.number) }}</p>
                 </div>
                 <div>
                     <button @click.stop="deletePayment(method.id)" id="btn-delete">Delete</button>
                 </div>
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
            <button @click="toggleAddMethod = !toggleAddMethod" v-if="toggleAddMethod" class="button-color1 mt-3 ">+ Add payment method</button>
        </div>
        
        
        
    </div>
</template>

<style scoped>
.payment-card {
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
    transition: background-color 0.3s ease;
}
#btn-delete:hover {
    background-color: rgba(220, 53, 69, 0.1);
}
.no-methods p {
    padding: 0;
    margin: 20px 0;
}
</style>