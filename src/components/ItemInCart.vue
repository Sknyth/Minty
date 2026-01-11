<script>
    export default {
    props: {
        title: String,
        price: Number,
        imageURL: String,
        size: Number,
        id: Number,
    },
    data(){
        return {
            k: 1,
        }
    },
    methods: {
        removeItem() {
            this.$emit('remove-item', this.id);
        },
        increaseCountItem() {
            this.k++;
        }
    }
}



</script>

<template>
        <div class="item d-flex justify-content-between align-items-center">

            <img :src="imageURL" alt="">

            <span class="fw-bold">{{ title }}</span>

            <span class="fw-bold">size {{ size }}</span>
            
            <div>
                <p class="fw-bold">${{ price }}</p>
                <span>Price for 1 unit.</span>
            </div>

            <div class="count d-flex justify-content-between align-items-center bg-color2">
                <img @click="k > 1 ? k-- : removeItem()" src="/public/-.svg" alt="">
                <span class="fw-bold">{{ k }}</span>
                <img @click="increaseCountItem" src="/public/+.svg" alt="">
            </div>

            <span class="fw-bold">${{ price*k }}</span>

            <div class="trash">
                <img @click="removeItem" src="/public/trash.svg" alt="">
            </div>

        </div>

</template>

<style scoped>
.item {
    margin-top: 40px;
    margin-right: 40px;
    width: 900px;
    height: 160px;
}
.item img {
    width: 160px;
    height: 160px;
}
.count {
    width: 160px;
    height: 48px;
    border: none;
	border-radius: 10px;
	padding: 10px;
}
.count img {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.trash img {
    height: 24px;
    width: 26px;
    cursor: pointer;
}
</style>