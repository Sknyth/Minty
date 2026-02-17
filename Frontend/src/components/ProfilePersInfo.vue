<script>
import { useToast } from "vue-toastification"
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
export default {
  props: {
    componentName: String,
  },
  setup() {
    const toast = useToast()

    const profileStore = useProfileStore()
    const authStore = useAuthStore()

    return { toast, profileStore, authStore }
  },
  data() {
    return {
      ToggleChange: false,
    }
  },
  async mounted() {
    await this.profileStore.fetchProfile()
  },
  methods: {
    async updateProfile() {
      try {
        await this.profileStore.updateProfile({
          name: this.profileStore.profile.name,
					surname: this.profileStore.profile.surname,
          phone: this.profileStore.profile.phone
        })

        await this.authStore.updateEmail({
          email: String(this.authStore.user.email).trim()
        })
        
        this.toast.success("Data saved successfully!")
        this.ToggleChange = false
      } catch (e) {
        alert(e)
        this.toast.error("Error: " + e.message)
        
      }
    },
    async fetchProfile(){
      try {
        await this.profileStore.fetchProfile()
      } finally {
        this.loading = false
      }
    },
  }
};

</script>

<template>
  <div>
    <h2>{{ componentName }}</h2>
    <div v-if="profileStore.profile" class="personal-information">
      
      <form @submit.prevent="updateProfile" class="d-flex gap-4 form-change-info justify-content-between row">
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Name</label>
          <input v-if="ToggleChange" v-model="profileStore.profile.name" type="text">
          <p v-else>{{ profileStore.profile.name }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Surname</label>
          <input v-if="ToggleChange" v-model="profileStore.profile.surname" type="text">
          <p v-else>{{ profileStore.profile.surname }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Email</label>
          <input v-if="ToggleChange" v-model.trim="authStore.user.email" type="email">
          <p v-else>{{ authStore.user.email }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Phone number</label>
          <input v-if="ToggleChange" v-model.trim="profileStore.profile.phone" type="tel">
          <p v-else>{{ profileStore.profile.phone }}</p>
        </div>
        <button v-if="ToggleChange" type="submit" class="button-color1 btn-change">Save Changes</button>
        <button v-else type="button" class="button-color1 btn-change" @click="ToggleChange = !ToggleChange">Change</button>
      </form>
    </div>
    <div v-else class="loading-state text-center p-5">
			<div class="spinner-border"></div>
			<p>Loading products data...</p>
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
  border: 1px solid var(--color1);
}
.btn-change {
  margin-top: 30px;
  width: 340px;
  border: none;
}
</style>