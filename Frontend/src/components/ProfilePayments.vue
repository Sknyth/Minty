<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification"
import { usePaymentStore } from '../stores/paymentStore'
import type { PaymentMethod } from '../types'

const props = defineProps ({
    componentName: String
})

const toast = useToast()

const paymentStore = usePaymentStore()

const cardNumber = ref('')
const cardHolderName = ref('')
const cardExpirationDate = ref('')
const cardCvv = ref('')
const toggleAddMethod = ref(true)



const maskCard = (number: string) => {
    if (!number) return ''
    return `**** **** **** ${number.slice(-4)}`
}

const addPaymentMethod = async () => {
    try {
        await paymentStore.addPayment({
            number: cardNumber.value,
            holder_name: cardHolderName.value,
            expiration_date: cardExpirationDate.value,
            cvv: cardCvv.value,
            type: getCardType(cardNumber.value)
        } as PaymentMethod);
        cardNumber.value = ''
        cardHolderName.value = ''
        cardExpirationDate.value = ''
        cardCvv.value = ''

        toggleAddMethod.value = !toggleAddMethod.value

        toast.success("Payment method added!")
    } catch (e) {
        toast.error('Error: ' + (e as Error).message)
    }
}

const deletePayment = async (id: number) => {
    try {
        await paymentStore.deletePayment(id)
        toast.success("Method deleted successfully!")
    } catch (e) {
        toast.error("Error: " + (e as Error).message)
    } 
}

const getCardType = (number: string): string => {
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
}

const selectPayment = async (selectedPaymentId: number | null) => {
    try {
        await paymentStore.selectPayment(selectedPaymentId)
        toast.success("Payment selected")
    } catch (e) {
        toast.error("Error: " + (e as Error).message)
    }   
}

onMounted(async () => {
    await paymentStore.fetchPayment()
})

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

        <div v-else-if="toggleAddMethod && paymentStore.payment.length != 0">
            
            <div class="row payment-cards-container">
                <div
                 v-for="method in paymentStore.payment" 
                 :key="method.id" 
                 :class="{ 'active-card': method.id === paymentStore.selectedPaymentId }"
                 class="payment-card mb-3 mt-3 d-flex justify-content-between flex-column"
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
.payment-cards-container {
  gap: 16px;
  padding: 0 8px;
}

.payment-card {
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  padding: 15px;
  width: 400px;
  min-height: 200px;
  flex: 0 0 auto;
  cursor: pointer;
  margin: 0;
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

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .payment-card {
    width: 100%;
    flex: 1 1 auto;
    min-height: 180px;
  }

  .add-payment-card {
    flex-direction: column !important;
    gap: 15px !important;
  }

  .add-payment-card .col {
    flex: 0 0 100% !important;
  }

  .add-payment-card input {
    width: 100%;
  }

  #btn-save {
    width: auto;
    padding: 10px 20px;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .payment-card {
    width: 100%;
    flex: 1 1 auto;
    padding: 12px;
    min-height: 160px;
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }

  .payment-card h4 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .payment-card p {
    font-size: 13px;
    margin: 4px 0;
  }

  #btn-delete {
    padding: 6px 8px;
    font-size: 12px;
  }

  .add-payment-card {
    flex-direction: column !important;
    gap: 12px !important;
  }

  .add-payment-card .col {
    flex: 0 0 100% !important;
  }

  .add-payment-card input {
    width: 100%;
    padding: 10px 8px;
    font-size: 14px;
  }

  .add-payment-card label {
    font-size: 14px;
  }

  #btn-save {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  h2 {
    font-size: 18px;
  }
}

@media (max-width: 360px) {
  .payment-card {
    padding: 10px;
    min-height: 150px;
  }

  .payment-card h4 {
    font-size: 14px;
  }

  .payment-card p {
    font-size: 12px;
  }

  #btn-delete {
    padding: 4px 6px;
    font-size: 11px;
  }

  .add-payment-card input {
    font-size: 13px;
    padding: 8px 6px;
  }

  #btn-save {
    font-size: 13px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>