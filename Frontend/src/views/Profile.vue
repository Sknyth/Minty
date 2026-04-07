<script>
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ProfileAddresses from '../components/ProfileAddresses.vue'
import ProfileOrders from '../components/ProfileOrders.vue'
import ProfilePayments from '../components/ProfilePayments.vue'
import ProfilePersInfo from '../components/ProfilePersInfo.vue'
import ProfileSettings from '../components/ProfileSettings.vue'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
export default {
  components: { Header, Footer, ProfilePersInfo, ProfileOrders, ProfileAddresses, ProfilePayments, ProfileSettings },
  setup() {
    const toast = useToast()

    const profileStore = useProfileStore()
    profileStore.fetchProfile()
    profileStore.fetchPaymentMethods()
    profileStore.fetchAddresses()
    const authStore = useAuthStore()

    return { toast, profileStore, authStore }
  },
  data() {
    return {
      loading: true,
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
        this.toast.error("Error: " + e.message)
      }
      

    },
    changeOption(event) {
      const buttons = event.currentTarget.parentNode.querySelectorAll('button')
      buttons.forEach((btn) => btn.classList.remove('btn-chosen'))
      event.currentTarget.classList.add('btn-chosen');
      this.selectedOption = event.currentTarget.textContent
    },
  },
  
  
}
</script>


<template>
  <Header />
    <div class="container">
      <div v-if="profileStore.profile">
        
        <div class="profile-card">
          <h2>{{ profileStore.profile.name }}</h2>
          <p>{{ authStore.user.email }}</p>
          <p>Created: {{ profileStore.profile.created_at.slice(0, 10) }}</p>
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
      <div v-else class="loading-state text-center p-5">
        <div class="spinner-border"></div>
        <p>Loading products data...</p>
      </div>
    </div> 
  <Footer /> 
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