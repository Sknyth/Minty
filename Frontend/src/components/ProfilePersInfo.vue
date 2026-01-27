<script>
export default {
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
  },
};

</script>

<template>
    <div class="personal-information">
      <h2>Personal Information</h2>
      <form @submit.prevent="change" class="d-flex gap-4 form-change-info justify-content-between row">
        <div class="d-flex flex-column gap-2 col">
          <label for="">Name</label>
          <input v-model="user.name" type="text">
        </div>
        <div class="d-flex flex-column gap-2 col">
          <label for="">Surname</label>
          <input v-model="user.surname" type="text">
        </div>
        <div class="d-flex flex-column gap-2 col">
          <label for="">Email</label>
          <input v-model="user.email" type="email">
        </div>
        <div class="d-flex flex-column gap-2 col">
          <label for="">Phone number</label>
          <input v-model="user.phone" type="tel">
        </div>
        <button type="submit" class="button-color1" id="btn-change">Save Changes</button>
      </form>
    </div>
</template>

<style scoped>
.form-change-info {
  margin-top: 20px;
}
.form-change-info input {
  width: 340px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#btn-change {
  margin-top: 30px;
  width: 340px;
  border: none;
}
</style>