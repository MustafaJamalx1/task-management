<template>
  <v-container class="pa-6" style="max-width: 1100px;">
    <v-card elevation="3" rounded="lg">
      <v-data-table
        v-show="!showCreate && !showUpdate"
        :search="searchValue"
        :headers="headers"
        :items="users"
        :loading="loading"
        class="elevation-0"
        rounded="lg"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="px-4 pt-4">
            <v-toolbar-title class="font-weight-bold text-h5">My Users</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchValue"
              label="Search"
              density="compact"
              hide-details
              single-line
              prepend-inner-icon="mdi-magnify"
              style="max-width: 200px;"
              class="mr-4"
              variant="outlined"
              rounded
            />
            <v-btn
              color="primary"
              variant="outlined"
              rounded
              class="ml-2"
              @click="showCreate = true"
              prepend-icon="mdi-plus"
            >
              Create User
            </v-btn>
          </v-toolbar>
        </template>
        <template #item.userTasks="{ item }">
          <div v-if="userTasks(item).length">
            <v-chip
              v-for="task in userTasks(item)"
              :key="task.id"
              class="ma-1"
              color="primary"
              variant="outlined"
              size="small"
            >
              {{ task.title }}
            </v-chip>
          </div>
          <span v-else class="text-grey">No tasks</span>
        </template>
        <template #item.actions="{ item }">
          <v-btn
            icon
            color="primary"
            variant="text"
            @click="editUser(item.id)"
            class="mr-2"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            color="red"
            variant="text"
            @click="deleteUser(item.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-row align="center" justify="center" class="mt-6" style="min-height: 60vh;">
      <v-col cols="12" md="8" lg="6">
      <CreateUser
        v-if="showCreate"
        @close="showCreate = false; reload()"
        class="pa-8"
      />
      <UpdateUser
        v-if="showUpdate"
        :id="selectedId"
        @close="showUpdate = false; reload()"
        class="pa-8"
      />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User, Task } from '../components/CRUD'
import { fetchItems, deleteItem, loading } from '../components/CRUD'
import UpdateUser from '../components/UpdateUser.vue'
import CreateUser from '@/components/CreateUser.vue'

const USERS_API = 'http://localhost:3000/users'
const TASKS_API = 'http://localhost:3000/tasks'

const users = ref<User[]>([])
const tasks = ref<Task[]>([])
const showCreate = ref(false)
const showUpdate = ref(false)
const searchValue = ref('')
const selectedId = ref<string>('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'User Tasks', key: 'userTasks' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const reload = async () => {
  users.value = await fetchItems(USERS_API) as User[]
  tasks.value = await fetchItems(TASKS_API) as Task[]
}

onMounted(()=>{
  reload()
})

const userTasks = (user: User) =>
  tasks.value.filter(task => task.assignedToUserId === user.id)

const editUser = (userId: string) => {
  selectedId.value = userId
  showUpdate.value = true
}

const deleteUser = async (userId: string) => {
  await deleteItem(USERS_API, userId)
  reload()
}
</script>

<style scoped>
.pa-6 {
  padding: 24px !important;
}
</style>
