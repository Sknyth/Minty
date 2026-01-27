<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ProfilePersInfo from '../components/ProfilePersInfo.vue';
import ProfileOrders from '../components/ProfileOrders.vue';
import ProfileAddresses from '../components/ProfileAddresses.vue';
import ProfilePayments from '../components/ProfilePayments.vue';
import ProfileSettings from '../components/ProfileSettings.vue';
export default {
  components: { Header, Footer, ProfilePersInfo, ProfileOrders, ProfileAddresses, ProfilePayments, ProfileSettings },
  data() {
    return {
      selectedOption: 'Profile',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('fetchProfile');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    async change() {
      try {
        await this.$store.dispatch('updateProfile', {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          phone: this.user.phone,
        });
        alert('Profile updated successfully');
      } catch (e) {
        alert('Error updating profile');
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
      <div v-if="user">

        <div class="profile-card">
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </div>

        <div class="choice-option">
          <button @click="changeOption" class="btn-chosen">Profile</button>
          <button @click="changeOption">Orders</button>
          <button @click="changeOption">Addresses</button>
          <button @click="changeOption">Payments</button>
          <button @click="changeOption">Settings</button>
        </div>

        <div class="option-container">
          <ProfilePersInfo v-if="selectedOption === 'Profile'" />
          <ProfileOrders v-if="selectedOption === 'Orders'" />
          <ProfileAddresses v-if="selectedOption === 'Addresses'" />
          <ProfilePayments v-if="selectedOption === 'Payments'" />
          <ProfileSettings v-if="selectedOption === 'Settings'" />
        </div>
        

        <button class="btn btn-danger" id="btn-logout" @click="logout">Logout</button>
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