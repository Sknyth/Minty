<script setup lang="ts">
import EarningChart from '../components/EarningsChart.vue'
import OrdersChart from '../components/OrdersChart.vue'
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <NavBar>
    <h1>Dashboard</h1>
    <div class="d-flex gap-4 flex-wrap">
      <EarningChart />
      <OrdersChart />
    </div>
    
  </NavBar>
</template>

<style scoped>


</style>
