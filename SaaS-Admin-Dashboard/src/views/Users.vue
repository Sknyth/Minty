<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import NavBar from '../components/NavBar.vue'
import { useUsersStore } from '../stores/userStore'
import type { User } from '../types'

const toast = useToast()
const userStore = useUsersStore()

const userSearchQuery = ref('')

userStore.fetchUsers()

const onRoleChange = async (profileId: number, event: Event) => {
  const target = event.target as HTMLSelectElement
  const newRole = target.value as User['role']
  await handleRoleChange(profileId, newRole)
}

const handleRoleChange = async (profileId: number, newRole: User['role']) => {
  try {
    await userStore.updateUserRole(profileId, newRole)
    toast.success(`User role updated to ${newRole}`)
  } catch (error) {
    toast.error('Failed to update: ' + (error as Error).message)
    userStore.fetchUsers()
  }
}

const handleDeleteUser = async (userId: number) => {
  try {
    await userStore.deleteUser(userId)
    toast.success('User deleted successfully')
  } catch (error) {
    toast.error('Error: ' + (error as Error).message)
  }
}
</script>

<template>
  <NavBar>
    <div class="header-section d-flex align-items-center mb-4 row gap-3">
      <div class="header-start col-lg">
        <h2 class="fw-bold">Users Management</h2>
      </div>

      <div class="header-main col-lg">
        <input type="text" placeholder="Search..." class="custom-input mb-3" @keyup="userStore.searchUsers(userSearchQuery)" v-model="userSearchQuery" />
      </div>

      <div class="header-end d-flex col-lg gap-3">
        <div class="stats-mini d-flex">
          <span class="text-muted">Total records:</span>
          <span class="fw-bold color1 ms-1">{{ userStore.users.length }}</span>
        </div>
      </div>
    </div>

    <div class="panel shadow-sm p-0 overflow-hidden">
      <div class="table-responsive table-scroll">
        <table class="custom-table w-full">
          <thead>
            <tr>
              <th class="px-4 py-3">User id</th>
              <th class="px-4 py-3">User</th>
              <th class="px-4 py-3 text-center">Created at</th>
              <th class="px-4 py-3 text-center">Role</th>
              <th class="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in [...userStore.users].sort((a, b) => b.id - a.id)" :key="user.id" class="table-row">
              <td class="px-4 py-3 fw-bold">#{{ user.id }}</td>
              <td class="px-4 py-3">
                <div class="d-flex flex-column">
                  <span class="fw-bold">{{ user.name }} {{ user.surname }}</span>
                  <span class="text-muted small"> {{ user.email }} </span>
                </div>
              </td>
              <td class="px-4 py-3 fw-bold text-center">
                {{ user.created_at ? new Date(user.created_at).toLocaleDateString() : '—' }}
              </td>
              <td class="px-3 py-2 text-center">
                <div class="role-select-container">
                  <select
                    :value="user.role"
                    @change="onRoleChange(user.id, $event)"
                    :class="['role-select-custom', user.role.toLowerCase()]"
                    class="text-center"
                  >
                    <option class="text-center" value="admin">Admin</option>
                    <option class="text-center" value="user">User</option>
                  </select>
                  <i class="bi bi-chevron-down select-icon"></i>
                </div>
              </td>
              <td class="px-4 py-3 text-end text-muted small">
                <button class="btn btn-sm btn-outline-danger"
                  @click="handleDeleteUser(user.id)"
                  :disabled="userStore.loading"
                >Delete</button>
              </td>
            </tr>
            <tr v-if="userStore.users.length === 0">
              <td colspan="6" class="text-center py-5 text-muted">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NavBar>
</template>

<style scoped>
.header-section {
  justify-content: space-between;
}

.table-scroll {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}

.header-end {
  justify-content: end;
  align-items: end;
  flex-direction: column;
}

.custom-input {
  width: 100%;
}

.panel {
  background: #ffffff;
  border: 1px solid rgba(134, 134, 149, 0.15);
  border-radius: 18px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table thead {
  background: #f8fafb;
  border-bottom: 1px solid rgba(134, 134, 149, 0.1);
}

.custom-table th {
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color3);
}

.table-row {
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(134, 134, 149, 0.05);
}

.table-row:hover {
  background: rgba(45, 138, 114, 0.03);
}

.table-row:last-child {
  border-bottom: none;
}

.status-select-container {
  position: relative;
  display: inline-block;
  width: 130px;
}

.role-select-custom {
  appearance: none;
  width: 100%;
  padding: 4px 25px 4px 12px;
  font-weight: 700;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s ease;
}

.select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  pointer-events: none;
  opacity: 0.6;
}

.role-select-custom.admin {
  background-color: #f8d7da;
  color: #721c24;
}

.role-select-custom.user {
  background-color: #cfe2ff;
  color: #084298;
}

.role-select-custom.user:hover, .role-select-custom.user:focus {
  box-shadow: 0 0 0 2px #084298;
}

.role-select-custom.admin:hover, .role-select-custom.admin:focus {
  box-shadow: 0 0 0 2px #721c24;
}

@media (max-width: 991px) {
  .header-start, .header-main {
    text-align: center;
  }
  .custom-input {
    width: 50%;
  }
  .header-section {
    justify-content: center;
  }
  .header-end {
    align-items: center;
    justify-content: center;
  }
}
</style>