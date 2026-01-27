<script>
</script>

<template>
    <div>
        <h2>Delivery addresses</h2>
        <div class="address-card">
            <h4>Main address</h4>
            <p>Str. calea orheiului</p>
            <p>101000</p>
            <button id="btn-edit">Edit</button>
            <button  id="btn-delete">Delete</button>
        </div>
        

        <button class="button-color1 mt-3">Add new address</button>
    </div>
</template>

<style scoped>
.address-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 15px;
    width: 400px;
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
</style>