<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification"
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  componentName: String,
})

const toast = useToast()

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUser()
})

const ToggleChange = ref(false)

const updateProfile = async () => {
  try {
    if(!authStore.user) return
    await authStore.updateUser(
      authStore.user?.name ?? '',
      authStore.user?.surname ?? '',
      authStore.user?.phone ?? ''
    )
    toast.success("Data saved successfully!")
    ToggleChange.value = false
  } catch (e) {
    toast.error("Error: " + (e as Error).message)
    
  }
}
</script>

<template>
  <div>
    <h2>{{ componentName }}</h2>
    <div v-if="authStore.loading" class="loading-state text-center p-5">
      <div class="spinner-border"></div>
      <p>Loading personal data...</p>
    </div>

    <div v-else-if="authStore.error">
      <p class="text-center">Something went wrong 😕</p>
    </div>

    <div v-else-if="authStore.user" class="personal-information">
      
      <form @submit.prevent="updateProfile" class="d-flex gap-4 form-change-info justify-content-between row">
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Name</label>
          <input v-if="ToggleChange" v-model="authStore.user.name" type="text">
          <p v-else>{{ authStore.user.name }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Surname</label>
          <input v-if="ToggleChange" v-model="authStore.user.surname" type="text">
          <p v-else>{{ authStore.user.surname }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Email</label>
          <input v-if="ToggleChange && authStore.user" v-model.trim="authStore.user.email" type="email">
          <p v-else>{{ authStore.user.email }}</p>
        </div>
        <div class="d-flex flex-column gap-2 col info-box">
          <label for="">Phone number</label>
          <input v-if="ToggleChange" v-model.trim="authStore.user.phone" type="tel">
          <p v-else>{{ authStore.user.phone }}</p>
        </div>
        <button v-if="ToggleChange" type="submit" class="button-color1 btn-change">Save Changes</button>
        <button v-else type="button" class="button-color1 btn-change" @click="ToggleChange = !ToggleChange">Change</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-change-info {
  margin-top: 20px;
}

.info-box p,
.info-box input {
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

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .form-change-info {
    margin-top: 15px;
    gap: 12px !important;
  }

  .info-box {
    flex: 0 0 calc(50% - 6px) !important;
  }

  .info-box p,
  .info-box input {
    width: 100%;
  }

  .btn-change {
    flex: 0 0 calc(50% - 6px) !important;
    width: 100%;
    margin-top: 0;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .form-change-info {
    gap: 10px !important;
    flex-direction: column !important;
  }

  .info-box {
    flex: 0 0 100% !important;
  }

  .info-box p,
  .info-box input {
    width: 100%;
    padding: 10px 8px;
    font-size: 14px;
  }

  .info-box label {
    font-size: 14px;
  }

  .btn-change {
    width: 100% !important;
    margin-top: 10px;
    font-size: 14px;
    padding: 10px;
  }

  h2 {
    font-size: 18px;
  }
}

@media (max-width: 360px) {
  .info-box p,
  .info-box input {
    font-size: 13px;
    padding: 8px 6px;
    min-height: 38px;
  }

  .btn-change {
    font-size: 13px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>