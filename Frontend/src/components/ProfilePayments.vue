<script>
</script>

<template>
    <div>
        <h2>Payment methods</h2>
        <div class="payment-card">
            <h4>Card Visa</h4>
            <p>**** **** **** 1234</p>
            <button id="btn-delete">Delete</button>
        </div>
        

        <button class="button-color1 mt-3">+ Add payment methods</button>
    </div>
</template>

<style scoped>
.payment-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 15px;
    width: 400px;
}
#btn-delete {
    color: #dc3545;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
}
</style>