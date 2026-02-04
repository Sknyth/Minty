<script>
import { supabase } from '../supabase.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      ToggleChange: false,
      profile: { name: '', surname: ''}
    };
  },
  computed: {
    ...mapGetters(['user']),
  }, 
  // async mounted() {
  //   if (!this.$store.state.user) {
  //     await this.$store.dispatch('fetchProfile');
  //   }
  // },
  methods: {
    async updateProfile() {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ name: this.profile.name })
          .eq('id', this.user.id);

        if (error) throw error;
        alert('Profile updated!');
      } catch (e) {
        alert(e.message);
      }
    },
    async fetchProfile() {
      if (!this.user) return;
      
      try {
        this.loading = true;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', this.user.id)
          .single();

        if (error) throw error;
        this.profile = data;
      } catch (e) {
        console.error('Error fetching profile:', e.message);
      } finally {
        this.loading = false;
      }
    },
  }
};

</script>

<template>
  <div>
    <div v-if="profile && user" class="personal-information">
      <h2>Personal Information</h2>
      <form @submit.prevent="updateProfile" class="d-flex gap-4 form-change-info justify-content-between row">
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Name</label>
          <input v-if="ToggleChange" v-model="profile.name" type="text">
          <p v-else>{{ profile.name }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Surname</label>
          <input v-if="ToggleChange" v-model="profile.surname" type="text">
          <p v-else>{{ profile.surname }}</p>
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
    <div v-else class="personal-information">
      <p>Loading personal information...</p>
    </div>
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