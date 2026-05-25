<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/authStore'

const toast = useToast()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)

const logout = () => {
  try {
    authStore.signOut()
    toast.success('Successful exit!')
  } catch (e) {
    toast.error('Error: ' + (e as Error).message)
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="d-flex">
      <nav id="sidebar" class="sidebar bg-dark min-vh-100 position-fixed" :class="{ 'show': isSidebarOpen }">
        <div class="pt-4 px-3">
          <h4 class="text-white mb-4 fw-bold">Minty <span class="color1">Admin</span></h4>
          
          <ul class="nav-links flex-column gap-2 list-unstyled">
            <li class="nav-item">
              <router-link class="nav-link admin-link" to="/">
                <i class="bi bi-speedometer2 me-2"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link admin-link" to="/products">
                <i class="bi bi-box-seam me-2"></i> Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link admin-link" to="/orders">
                <i class="bi bi-receipt me-2"></i> Orders
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link admin-link" to="/users">
                <i class="bi bi-people me-2"></i> Users
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <main class="main-wrapper flex-grow-1">
        <header class="header-nav d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
          <div class="d-flex gap-3">
            <button class="btn btn-outline-dark d-xl-none" @click="isSidebarOpen = !isSidebarOpen">
              <i class="bi bi-list fs-3"></i>
            </button>
            <button class="btn btn-danger" id="btn-logout" @click="logout">Logout</button>
          </div>

          <h2 class="h4 m-0 fw-bold">Admin Panel</h2>

          <div class="user-profile d-flex align-items-center gap-3">
            <span class="color3">Administrator</span>
            <div class="avatar bg-color1">A</div>
          </div>
        </header>

        <div v-if="isSidebarOpen" class="sidebar-overlay d-xl-none" @click="isSidebarOpen = !isSidebarOpen"></div>

        <div class="p-4 content-area">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 300px;
  z-index: 1000;
  background-color: #1a1a1a !important;
  transition: transform 0.3s ease;
}

.main-wrapper {
  margin-left: 300px;
  background-color: #f8f9fa;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.admin-link {
  color: #ffffff;
  border-radius: 12px;
  padding: 12px 15px;
  transition: all 0.3s ease;
}

.admin-link:hover {
  background: rgba(45, 138, 114, 0.1);
  color: var(--color1);
}

.admin-link.router-link-active {
  background-color: var(--color1) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(45, 138, 114, 0.3);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.header-nav {
  position: sticky;
  top: 0;
  z-index: 999;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

@media (max-width: 1199px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.show {
    transform: translateX(0);
  }

  .main-wrapper {
    margin-left: 0;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>