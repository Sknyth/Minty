<script setup lang="ts">
import { useToast } from "vue-toastification"
import { useAuthStore } from '../stores/authStore'
import { reactive, ref } from 'vue'

const toast = useToast()

const authStore = useAuthStore()

const ToggleChange = ref(false)
const passwords = reactive({
    old: '',
    confirm: '',
    new: ''
})
const updatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
        toast.error("Passwords do not match!")
        return
    }   
    try {
    await authStore.changePass(passwords.old ,passwords.new)
            
    toast.success("Password changed successfully!")
    passwords.old = ''
    passwords.new = ''
    passwords.confirm = ''
    ToggleChange.value = false

    } catch (e) {
        toast.error("Error: " + (e as Error).message)
    }
}
</script>

<template>
    <div>
        <h2>Security Settings</h2>
        <div v-if="ToggleChange" class="personal-information mt-3">
        
        <form @submit.prevent="updatePassword" class="d-flex gap-4 form-change-info justify-content-between row">
        
            <div class="d-flex flex-column gap-2 col info-box">
                <label>Current Password</label>
                <input v-if="ToggleChange" v-model="passwords.old" type="password" placeholder="Enter current password">
            </div>

            <div class="d-flex flex-column gap-2 col info-box">
                <label>New Password</label>
                <input v-if="ToggleChange" v-model="passwords.new" type="password" placeholder="Min 6 characters">
            </div>

            <div class="d-flex flex-column gap-2 col info-box">
                <label>Confirm Password</label>
                <input v-if="ToggleChange" v-model="passwords.confirm" type="password" placeholder="Repeat new password">
        </div>

        <div class="gap-3 d-flex">
            <button 
            v-if="ToggleChange" 
            type="submit" 
            class="button-color1"
            >
            Save New Password
            </button>
            <button @click="ToggleChange = false" class="button-color1">
            Back
            </button>
        </div>
            
        </form>

        </div>
    
        <div class="d-flex pass-change-box" v-if="!ToggleChange">
            <p>To change password click</p>
            <span class="fw-bold btn-change" @click="ToggleChange = !ToggleChange">here</span>
        </div>
    </div>
</template>

<style scoped>
.form-change-info {
    margin-top: 20px;
}
.info-box label {
    font-weight: 500;
    color: var(--color3);
}
.info-box p, .info-box input {
    width: 340px;
    padding: 8px 12px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 42px;
    font-family: inherit;
}
.info-box input {
    border: 1px solid var(--color1);
}
.btn-change {
    color: var(--color1);
    cursor: pointer;
    margin-left: 4px;
}
.pass-change-box {
    margin-top: 20px;
}

</style>