<script>
import { useToast } from "vue-toastification"
import { mapGetters } from 'vuex'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ProfileAddresses from '../components/ProfileAddresses.vue'
import ProfileOrders from '../components/ProfileOrders.vue'
import ProfilePayments from '../components/ProfilePayments.vue'
import ProfilePersInfo from '../components/ProfilePersInfo.vue'
import ProfileSettings from '../components/ProfileSettings.vue'
export default {
  components: { Header, Footer, ProfilePersInfo, ProfileOrders, ProfileAddresses, ProfilePayments, ProfileSettings },
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      loading: true,
      selectedOption: 'Profile',
    };
  },
  computed: {
    ...mapGetters(['user', 'profile']),
  },  
  async mounted() {
    this.$store.dispatch('fetchProfile')
  },
  methods: {
    logout() {
      try{
        this.$store.dispatch('signOut');
        this.$router.push('/login');
        this.toast.success("Successful exit!");
      } catch(e){
        this.toast.error("Error: " + e.message);
      }
      

    },
    changeOption(event) {
      const buttons = event.currentTarget.parentNode.querySelectorAll('button');
      buttons.forEach((btn) => btn.classList.remove('btn-chosen'));
      event.currentTarget.classList.add('btn-chosen');
      this.selectedOption = event.currentTarget.textContent;
    },
  },
};
</script>


<template>
  <Header />
    <div class="container">
      <div v-if="profile">

        <div class="profile-card">
          <h2>{{ profile.name }}</h2>
          <p>{{ user.email }}</p>
          <p>Created: {{ profile.created_at.slice(0, 10) }}</p>
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
        

        <button class="btn btn-danger" id="btn-logout" @click="logout">Logout</button>

      </div>
      <div v-else-if="loading">
        <p class="text-center fs-4 mt-5">Loading profile...</p>
      </div>
      <div v-else>
        <p class="text-center fs-4 mt-5">Please log in to view your profile.</p>
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
  border-bottom: 2px solid #1584FF !important;  
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
  margin-top: 30px;
  width: 100%;
}
</style>