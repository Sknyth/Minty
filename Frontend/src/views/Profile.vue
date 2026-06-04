<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ProfileAddresses from '../components/ProfileAddresses.vue'
import ProfileOrders from '../components/ProfileOrders.vue'
import ProfilePayments from '../components/ProfilePayments.vue'
import ProfilePersInfo from '../components/ProfilePersInfo.vue'
import ProfileSettings from '../components/ProfileSettings.vue'
import { useAuthStore } from '../stores/authStore'

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()

const selectedOption = ref('Profile')

const logout = () => {
  try {
    authStore.signOut()
    router.push('/login')
    toast.success("Successful exit!")
  } catch (e) {
    toast.error("Error: " + (e as Error).message)
  }
}

const changeOption = (event: Event) => {
  const target = event.currentTarget as HTMLElement
  const buttons = target.parentNode?.querySelectorAll('button')
  buttons?.forEach((btn: Element) => btn.classList.remove('btn-chosen'))
  target.classList.add('btn-chosen')
  selectedOption.value = target.textContent || ''
}
</script>


<template>
  <div>
    <Header />
      <div class="container">
        <div v-if="authStore.user">
          
          <div class="profile-card">
            <h2>{{ authStore.user.name }}</h2>
            <p>{{ authStore.user.email }}</p>
            <p>Created: {{ authStore.user.created_at.slice(0, 10) }}</p>
          </div>

          <div class="choice-option">
            <button @click="changeOption" class="btn-chosen">Profile</button>
            <button @click="changeOption">Orders</button>
            <button @click="changeOption">Addresses</button>
            <button @click="changeOption">Payments</button>
            <button @click="changeOption">Settings</button>
          </div>

          <div class="option-container">
            <ProfilePersInfo
            v-if="selectedOption === 'Profile'" :componentName="'Personal Information'" />
            <ProfileOrders v-if="selectedOption === 'Orders'" />
            <ProfileAddresses :componentName="'Delivery addresses'" v-if="selectedOption === 'Addresses'" />
            <ProfilePayments :componentName="'Payment methods'" v-if="selectedOption === 'Payments'" />
            <ProfileSettings v-if="selectedOption === 'Settings'" />
          </div>

          <button class="btn btn-danger mt-4 mb-4 w-100" id="btn-logout" @click="logout">Logout</button>

        </div>
        <div v-else-if="authStore.error">
          <p class="text-center">Something went wrong 😕</p>
        </div>
        <div v-else class="loading-state text-center p-5">
          <div class="spinner-border"></div>
          <p>Loading profile data...</p>
        </div>
      </div> 
    <Footer />
  </div>
</template>

<style scoped>
.container {
  padding-bottom: 150px;
}

.profile-card {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  margin-top: 60px;
  padding: 60px;
  border-radius: 10px;
}

.choice-option {
  display: flex;
  gap: 16px;
  margin-top: 30px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  padding: 30px;
  border-radius: 10px;
  min-height: 90px;
}

.choice-option button {
  border: none;
  padding: 0;
  background: none;
  font-size: 18px;
  height: 100%;
  width: 100%;
}

.btn-chosen {
  border-bottom: 2px solid var(--color1) !important;  
}

.option-container {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  padding: 25px 60px;
  border-radius: 10px;
  min-height: 200px;
}

#btn-logout {
  font-size: 18px;
}

@media (max-width: 768px) {
  .profile-card {
    margin-top: 40px;
    padding: 40px 30px;
  }

  .choice-option {
    padding: 20px;
    min-height: auto;
    flex-wrap: wrap;
  }

  .choice-option button {
    font-size: 16px;
    flex: 1 1 calc(50% - 8px);
    min-width: 120px;
  }

  .option-container {
    padding: 20px 30px;
  }

  #btn-logout {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px 80px 16px;
  }

  .profile-card {
    margin-top: 20px;
    padding: 20px 16px;
    border-radius: 8px;
  }

  .profile-card h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .profile-card p {
    font-size: 14px;
    margin: 4px 0;
  }

  .choice-option {
    padding: 12px;
    margin-top: 16px;
    gap: 8px;
    border-radius: 8px;
  }

  .choice-option button {
    font-size: 14px;
    flex: 1 1 100%;
    padding: 10px 8px;
    min-width: unset;
  }

  .option-container {
    padding: 16px 12px;
    margin-top: 16px;
    border-radius: 8px;
    min-height: 150px;
  }

  #btn-logout {
    font-size: 14px;
    padding: 10px;
  }

  .btn-chosen {
    border-bottom: 3px solid var(--color1) !important;
  }
}

@media (max-width: 360px) {
  .profile-card {
    padding: 16px 12px;
  }

  .profile-card h2 {
    font-size: 18px;
  }

  .profile-card p {
    font-size: 13px;
  }

  .choice-option button {
    font-size: 12px;
    padding: 8px 4px;
  }

  .option-container {
    padding: 12px 8px;
  }
}
</style>