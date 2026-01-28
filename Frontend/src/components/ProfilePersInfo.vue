<script>
export default {
  data() {
    return {
      ToggleChange: false,
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
        await this.$store.dispatch('fetchProfile');
        this.ToggleChange = false;
      } catch (e) {
        console.error(e);
        alert('Error updating profile' + e);
      }
    },
    
  },
};

</script>

<template>
    <div class="personal-information">
      <h2>Personal Information</h2>
      <form @submit.prevent="change" class="d-flex gap-4 form-change-info justify-content-between row">
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Name</label>
          <input v-if="ToggleChange" v-model="user.name" type="text">
          <p v-else>{{ user.name }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Surname</label>
          <input v-if="ToggleChange" v-model="user.surname" type="text">
          <p v-else>{{ user.surname }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Email</label>
          <input v-if="ToggleChange" v-model="user.email" type="email">
          <p v-else>{{ user.email }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Phone number</label>
          <input v-if="ToggleChange" v-model="user.phone" type="tel">
          <p v-else>{{ user.phone }}</p>
        </div>
        <button v-if="this.ToggleChange" type="submit" class="button-color1 btn-change">Save Changes</button>
        <button v-else type="button" class="button-color1 btn-change" @click="ToggleChange = !ToggleChange">Change</button>
      </form>
      
    </div>
</template>

<style scoped>
.form-change-info {
  margin-top: 20px;
}
.info-box p, .info-box input {
  width: 340px;
  padding: 8px 12px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 42px;
}
.info-box input {
  border: 1px solid #007bff;
}
.btn-change {
  margin-top: 30px;
  width: 340px;
  border: none;
}
</style>