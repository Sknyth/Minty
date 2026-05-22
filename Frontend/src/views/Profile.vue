<script lang="ts">
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ProfileAddresses from '../components/ProfileAddresses.vue'
import ProfileOrders from '../components/ProfileOrders.vue'
import ProfilePayments from '../components/ProfilePayments.vue'
import ProfilePersInfo from '../components/ProfilePersInfo.vue'
import ProfileSettings from '../components/ProfileSettings.vue'
import { useAuthStore } from '../stores/authStore'
export default {
  components: { Header, Footer, ProfilePersInfo, ProfileOrders, ProfileAddresses, ProfilePayments, ProfileSettings },
  setup() {
    const toast = useToast()
    
    const authStore = useAuthStore()

    return { toast, authStore }
  },
  data() {
    return {
      selectedOption: 'Profile',
    };
  },
  methods: {
    logout() {
      try{
        this.authStore.signOut()
        this.$router.push('/login')
        this.toast.success("Successful exit!")
      } catch(e){
        this.toast.error("Error: " + (e as Error).message)
      }
      

    },
    changeOption(event: Event) {
      const target = event.currentTarget as HTMLElement
      const buttons = target.parentNode?.querySelectorAll('button')
      buttons?.forEach((btn: Element) => btn.classList.remove('btn-chosen'))
      target.classList.add('btn-chosen')
      this.selectedOption = target.textContent || ''
    },
  }
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

#btn-logout{
 font-size: 18px;
}
</style>