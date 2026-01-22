<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Header />
        <main class="container">
            <div class="d-flex gap-4">
                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="/public/airForce1.webp" class="d-block w-100" alt="">
                        </div>
                        <div class="carousel-item">
                        <img src="/public/airForceBlack-blue.webp" class="d-block w-100" alt="">
                        </div>
                        <div class="carousel-item">
                        <img src="/public/airForceCream.webp" class="d-block w-100" alt="">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div class="infoItem">
                    <h5>Nike Air Force 1 Low</h5>

                    <div>
                        <p><span class="fw-bold">Color:</span> Like in the picture</p>
                        <div class="d-flex carousel-colors">
                            <img src="/public/airForce1.webp" alt="">
                            <img src="/public/airForce1.webp" alt="">
                            <img src="/public/airForce1.webp" alt="">
                            <img src="/public/airForce1.webp" alt="">
                            <img src="/public/airForce1.webp" alt="">
                            <img src="/public/airForce1.webp" alt="">
                        </div>
                    </div>

                    <div>
                        <p class="fw-bold">Size chart:</p>
                        <div class="justify-content-between">
                            <p>36</p>
                            <p>36</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    <Footer />
</template>

<style scoped>
.carousel {
    height: 100%;
    width: 400px;
    /* object-fit: cover; */
}
.container{
    margin-top: 60px;
}
.infoItem {
    width: 350px;
    background-color: gray;
}
.carousel-colors img {
    height: 60px;
    width: 50px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>