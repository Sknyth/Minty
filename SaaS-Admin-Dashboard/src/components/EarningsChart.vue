<script setup>
import { useStatStore } from '../stores/statStore'
const statStore = useStatStore()
statStore.fetchEarnings()
</script>

<template>
  <div class="box-inner shadow-sm">
    <div class="decor-circle"></div>

    <div class="card-content">
      <div class="d-flex align-items-start justify-content-between mb-auto">
        <div class="icon-shape bg-glass">
          <i class="bi bi-wallet2"></i> 
        </div>
        <div class="trend-badge">
          +12% <i class="bi bi-arrow-up-short"></i>
        </div>
      </div>

      <div class="mt-4">
        <p class="label-text mb-1">Total Earnings</p>
        <h1 v-if="!statStore.loading" class="amount-text">${{ statStore.totalEarnings }}</h1>
        <h1 v-else class="amount-text">Loading...</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-inner {
  height: 160px;
  width: 100%;
  border-radius: 14px;
  padding: 18px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--color1) 0%, #35a387 100%);
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box-inner:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(45, 138, 114, 0.3) !important;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.icon-shape {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.bg-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.trend-badge {
  font-size: 12px;
  background: rgba(255, 228, 181, 0.2);
  color: var(--color2);
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.label-text {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.amount-text {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
}

.decor-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  top: -40px;
  right: -30px;
  z-index: 1;
}
</style>