<script>
export default {
    data() {
        return {
            toggleAddMethod: true,
        };
    }
}
</script>

<template>
    <div>
        <h2>Payment methods</h2>

        <div v-if="toggleAddMethod" class="payment-card">
            <h4>Card Visa</h4>
             <p>2352355235</p>
            <button id="btn-delete">Delete</button>
        </div>

        <form v-else action="" class="d-flex row justify-content-between gap-3 add-payment-card">
            <div class="d-flex flex-column gap-2 col">
                <label for="">Card number</label>
                <input v-model="cardNumber" type="text" placeholder="Card number">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="">Holder name</label>
                <input v-model="cardHolderName" type="text" placeholder="Card holder name">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="">Expiration date</label>
                <input v-model="cardExpirationDate" type="text" placeholder="Expiration date">
            </div>
            <div class="d-flex flex-column gap-2 col">
                <label for="">CVV</label>
                <input v-model="cardCvv" type="text" placeholder="CVV">
            </div>
            <button @click="toggleAddMethod = !toggleAddMethod" class="button-color1 mt-3" id="btn-save">Save</button>
        </form>
        

        <button v-if="toggleAddMethod" @click="toggleAddMethod = !toggleAddMethod" class="button-color1 mt-3">+ Add payment methods</button>
    </div>
</template>

<style scoped>
.payment-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 15px;
    width: 400px;
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