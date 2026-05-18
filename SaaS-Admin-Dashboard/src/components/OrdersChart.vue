<script>
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { useStatStore } from '../stores/statStore'

ChartJS.register(
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

export default {
  components: { Line },
  setup() {
    const statStore = useStatStore()
    
    statStore.fetchOrdersChart() 

    const chartData = computed(() => {
      return {
        labels: statStore.chartLabels, 
        datasets: [
          {
            data: statStore.chartData, 
            borderColor: '#2d8a72',
            backgroundColor: 'rgba(45, 138, 114, 0.15)',
            fill: true,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
          }
        ]
      }
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { 
          enabled: true,
          intersect: false,
          mode: 'index',
        }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }

    return { statStore, chartData, chartOptions }
  }
}
</script>

<template>
  <div class="box-inner shadow-sm">
    <div class="decor-circle"></div>

    <div class="card-content">
      <div class="d-flex justify-content-between align-items-start w-100">
        <div class="icon-shape bg-glass">
          <i class="bi bi-box-seam text-dark"></i> 
        </div>
        <div class="trend-badge-green">
          +5.4% <i class="bi bi-arrow-up-short"></i>
        </div>
      </div>

      <div class="mt-4 main-info">
        <p class="label-text mb-0">Total Orders (This Month)</p>
        <h1 v-if="!statStore.loading" class="amount-text">
          {{ statStore.totalOrders }}
        </h1>
        <h1 v-else class="amount-text">Loading...</h1>
      </div>

      <div class="chart-wrapper">
        <Line 
          v-if="statStore.chartData.length > 0" 
          :data="chartData" 
          :options="chartOptions" 
        />
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
  background: linear-gradient(135deg, var(--color2) 0%, #f5d191 100%);
  color: #2c2c2c;
  transition: transform 0.3s ease;
  border: none;
}

.box-inner:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(255, 228, 181, 0.5) !important;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-info {
  position: relative;
  z-index: 3;
}

.chart-wrapper {
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 160px;
  height: 75px;
  z-index: 1;
}

.icon-shape {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
  font-size: 18px;
}

.trend-badge-green {
  font-size: 12px;
  background: rgba(45, 138, 114, 0.15);
  color: var(--color1);
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.label-text {
  font-size: 13px;
  opacity: 0.7;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.amount-text {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.decor-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  top: -40px;
  right: -30px;
  z-index: 1;
}
</style>