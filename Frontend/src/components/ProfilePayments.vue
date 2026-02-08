<script>
import { useToast } from "vue-toastification"
import { mapActions, mapGetters } from 'vuex'
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            cardNumber: '',
            cardHolderName: '',
            cardExpirationDate: '',
            cardCvv: '',
            toggleAddMethod: true,
        };
    },
    computed: {
    ...mapGetters({
      payment_methods: 'allPayments'
    })
    },
    methods: {
        ...mapActions(['fetchPaymentMethods', 'addPaymentMethod']),
        maskCard(number) {
            return `**** **** **** ${number.slice(-4)}`;
        },
        async addPaymentMethod() {
            try {
                await this.$store.dispatch('addPaymentMethod', {
                    number: this.cardNumber,
                    holder_name: this.cardHolderName,
                    expiration_date: this.cardExpirationDate,
                    cvv: this.cardCvv,
                });
                this.cardNumber = '';
                this.cardHolderName = '';
                this.cardExpirationDate = '';
                this.cardCvv = '';

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
                await this.$store.dispatch('deletePaymentMethod', id);
                this.toast.success("Method deleted successfully!")
                
                this.ToggleChange = false
            } catch (e) {
                this.toast.error("Error: " + e.message);
            } 
        },
        getCardType(number) {
            const re = {
            Visa: /^4/,
            Mastercard: /^5[1-5]|^2(?:22[1-9]|2[3-9]\d|[3-6]\d\d|7[01]\d|720)/,
            Mir: /^220[0-4]/,
            Maestro: /^(5018|5020|5038|6304|6759|6761|6763)/
            };

            for (const [card, pattern] of Object.entries(re)) {
            if (pattern.test(number)) return card;
            }
            return 'Unknown';
        },
    },
    mounted() {
        this.fetchPaymentMethods();
    }
}
</script>

<template>
    <div>
        <h2>Payment methods</h2>
        <div class="no-methods" v-if="payment_methods.length === 0 && toggleAddMethod" >
            <p>You don't have payment methods</p>
        </div>
        <div v-else-if="toggleAddMethod ?? payment_methods.length != 0">
            <div class="row gap-3 justify-content-start">
                <div v-for="method in payment_methods" :key="method.id" class="col payment-card">
                <h4>{{ getCardType(method.number) }}</h4>
                <p>{{ maskCard(method.number) }}</p>
                <button @click="deletePaymentMethod(method.id)" id="btn-delete">Delete</button>
                </div>
            </div>
            
            
        </div>

        

        <div v-else class="d-flex row justify-content-between gap-3 add-payment-card">
            <div class="d-flex flex-column gap-2 col">
                <label for="cardNumber">Card number</label>
                <input v-model="cardNumber" type="text" placeholder="Card number">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardHolderName">Holder name</label>
                <input v-model="cardHolderName" type="text" placeholder="Card holder name">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardExpirationDate">Expiration date</label>
                <input v-model="cardExpirationDate" type="text" placeholder="Expiration date">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="cardCvv">CVV</label>
                <input v-model="cardCvv" type="text" placeholder="CVV">
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