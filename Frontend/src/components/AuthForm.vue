<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/authStore'

const props = defineProps<{ mode: 'login' | 'register' }>()

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const copyByMode = {
  login: {
    title: 'Welcome back',
    description: 'Sign in to view your orders and saved sneakers.',
    action: 'Sign in',
    pending: 'Signing in…',
    success: 'Sign in successful!',
  },
  register: {
    title: 'Create an account',
    description: 'Save your favorite pairs and check out faster.',
    action: 'Create account',
    pending: 'Creating account…',
    success: 'Account created!',
  },
}

const copy = computed(() => copyByMode[props.mode])
const registering = computed(() => props.mode === 'register')

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const submitting = ref(false)
const formError = ref('')

const submit = async () => {
  if (submitting.value) return
  submitting.value = true
  formError.value = ''

  try {
    const credentials = { email: email.value.trim(), password: password.value }
    if (registering.value) {
      await authStore.signUp({ ...credentials, name: name.value.trim() })
    } else {
      await authStore.signIn(credentials)
    }
    await router.push('/profile')
    toast.success(copy.value.success)
  } catch (error) {
    formError.value = error instanceof TypeError
      ? 'Couldn’t reach Minty. Please try again.'
      : (error as Error).message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="store-shell auth-main">
    <div class="auth-card">
      <div class="auth-photo" aria-hidden="true"></div>

      <section class="auth-content" :aria-labelledby="`${mode}-title`">
        <nav class="auth-nav" aria-label="Account access">
          <RouterLink to="/login">Sign in</RouterLink>
          <RouterLink to="/register">Create account</RouterLink>
        </nav>

        <h1 :id="`${mode}-title`">{{ copy.title }}</h1>
        <p class="auth-description">{{ copy.description }}</p>

        <form class="auth-form" @submit.prevent="submit">
          <div v-if="registering" class="auth-field">
            <label for="register-name">Name</label>
            <input
              id="register-name"
              v-model="name"
              name="name"
              type="text"
              autocomplete="name"
              required
            />
          </div>

          <div class="auth-field">
            <label :for="`${mode}-email`">Email address</label>
            <input
              :id="`${mode}-email`"
              v-model="email"
              name="email"
              type="email"
              autocomplete="username"
              required
            />
          </div>

          <div class="auth-field">
            <label :for="`${mode}-password`">Password</label>
            <div class="auth-password">
              <input
                :id="`${mode}-password`"
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                :autocomplete="registering ? 'new-password' : 'current-password'"
                required
              />
              <button
                type="button"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <p v-if="formError" class="auth-error" role="alert">{{ formError }}</p>
          <button class="auth-submit" type="submit" :disabled="submitting">
            {{ submitting ? copy.pending : copy.action }}
            <i class="bi bi-arrow-right" aria-hidden="true"></i>
          </button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.auth-main {
  flex: 1;
  display: grid;
  align-items: center;
  max-width: 960px;
  padding-block: clamp(24px, 5vw, 64px);
}

.auth-card {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  border: 1px solid var(--minty-line);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 18px 60px #142b2210;
}

.auth-photo {
  border-radius: 23px 0 0 23px;
  background: #1d211e url('/NewBalanceX-90.jpg') center / cover no-repeat;
}

.auth-content {
  min-width: 0;
  padding: clamp(30px, 5vw, 60px);
}

.auth-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 26px;
  padding: 4px;
  border: 1px solid var(--minty-line);
  border-radius: 12px;
  background: var(--minty-paper);
}

.auth-nav a {
  flex: 1;
  min-width: 0;
  padding: 9px 6px;
  border-radius: 8px;
  color: var(--minty-muted);
  font-size: 0.93rem;
  font-weight: 600;
  text-align: center;
}

.auth-nav a:hover {
  background: #edf3e7;
  color: var(--minty-ink);
}

.auth-nav a[aria-current='page'] {
  background: var(--color2);
  color: var(--minty-ink);
}

.auth-content h1 {
  margin: 0;
  color: var(--minty-ink);
  font-size: clamp(2rem, 3.6vw, 3.1rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1.05;
}

.auth-description {
  margin: 9px 0 24px;
  color: var(--minty-muted);
}

.auth-form {
  display: grid;
  gap: 14px;
}

.auth-field {
  display: grid;
  gap: 6px;
}

.auth-field label {
  color: var(--minty-ink);
  font-size: 0.93rem;
  font-weight: 600;
}

.auth-field input {
  width: 100%;
  min-width: 0;
  min-height: 48px;
  border-color: var(--minty-line);
  background: #fbfcfa;
  color: var(--minty-ink);
  font-size: 1rem;
}

.auth-field input:hover,
.auth-field input:focus {
  border-color: var(--color1);
}

.auth-password {
  position: relative;
}

.auth-password input {
  padding-inline-end: 78px;
}

.auth-password button {
  position: absolute;
  inset: 3px 4px 3px auto;
  min-width: 58px;
  padding-inline: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color1);
  font-size: 0.88rem;
  font-weight: 600;
}

.auth-password button:hover {
  background: #edf3e7;
}

.auth-submit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 49px;
  margin-top: 5px;
  padding: 11px 16px;
  border: 0;
  border-radius: 12px;
  background: var(--minty-ink);
  color: white;
  font-weight: 650;
}

.auth-submit:hover:not(:disabled) {
  background: var(--color1);
}

.auth-submit:disabled {
  opacity: 0.72;
  cursor: wait;
}

.auth-error {
  margin: 0;
  padding: 9px 12px;
  border-radius: 8px;
  background: #fbefed;
  color: #8d283b;
  font-size: 0.92rem;
}

@media (max-width: 700px) {
  .auth-card {
    width: min(100%, 470px);
    margin-inline: auto;
    grid-template-columns: minmax(0, 1fr);
    border-radius: 18px;
  }

  .auth-photo {
    display: none;
  }

  .auth-content {
    padding: clamp(20px, 5vw, 30px);
  }

  .auth-nav {
    margin-bottom: 20px;
  }
}
</style>
