<script>
import { useToast } from "vue-toastification"
import { mapGetters } from "vuex"
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    computed: {
        ...mapGetters(['user']),
    }, 
    data() {
        return {
          ToggleChange: false,
          passwords: {
            old: '',
            confirm: '',
            new: '',
          }
        }
  },
    methods: {
        async updatePassword() {
            if(user.password !== this.passwords.old){
                this.toast.error("Old password doesn't match!")
            }
            if (this.passwords.new !== this.passwords.confirm) {
            this.toast.error("Passwords do not match!")
            return
            }   
            try {
            await this.$store.dispatch('updatePassword', this.passwords.new)
            
            this.toast.success("Password changed successfully!")
            this.ToggleChange = false
            this.passwords = { old: '', new: '', confirm: '' }
            } catch (e) {
            this.toast.error("Error: " + e.message)
            }
        }
    }
}
</script>

<template>
    <h2>Security Settings</h2>
    <div v-if="ToggleChange" class="personal-information mt-3">
    

    <form @submit.prevent="updatePassword" class="d-flex gap-4 form-change-info justify-content-between row">
      
        <div class="d-flex flex-column gap-2 col info-box">
            <label>Current Password</label>
            <input v-if="ToggleChange" v-model="passwords.old" type="password" placeholder="Enter current password">
        <p v-else>••••••••••</p>
        </div>

        <div class="d-flex flex-column gap-2 col info-box">
            <label>New Password</label>
            <input v-if="ToggleChange" v-model="passwords.new" type="password" placeholder="Min 6 characters">
        <p v-else>••••••••••</p>
        </div>

        <div class="d-flex flex-column gap-2 col info-box">
            <label>Confirm Password</label>
            <input v-if="ToggleChange" v-model="passwords.confirm" type="password" placeholder="Repeat new password">
        <p v-else>••••••••••</p>
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