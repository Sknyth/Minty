<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            cardNumber: '',
            cardHolderName: '',
            cardExpirationDate: '',
            cardCvv: '',
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

                alert('Payment method added!');
            } catch (e) {
                alert(e.message);
                console.error('Error adding payment method:', e.message);
            }
        },
        async deletePaymentMethod(id) {
            try {
                await this.$store.dispatch('deletePaymentMethod', id);
                alert('Payment method deleted!');
            } catch (e) {
                alert(e.message);
                console.error('Error deleting payment method:', e.message);
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

        <div v-if="payment_methods.length > 0">
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
            <button @click="addPaymentMethod(); toggleAddMethod = !toggleAddMethod" class="button-color1 mt-3" id="btn-save">Save</button>
        </div>
        

        <button v-if="payment_methods.length > 0" class="button-color1 mt-3">+ Add payment methods</button>
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
</style>