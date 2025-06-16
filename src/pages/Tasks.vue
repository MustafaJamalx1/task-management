<template>
  <v-container class="pa-6" style="max-width: 1100px;">
    <v-card elevation="3" rounded="lg">
      <v-data-table
        v-show="!showCreate && !showUpdate"
        :search="searchValue"
        :headers="headers"
        :items="tasks"
        :loading="loading"
        class="elevation-0"
        rounded="lg"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="px-4 pt-4">
            <v-toolbar-title class="font-weight-bold text-h5">My Tasks</v-toolbar-title>
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
              Create Task
            </v-btn>
          </v-toolbar>
        </template>
        <template #item.actions="{ item }">
          <v-btn
            icon
            color="primary"
            variant="text"
            @click="editTask(item.id)"
            class="mr-2"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            color="red"
            variant="text"
            @click="deleteTask(item.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
      
      <v-row align="center" justify="center" class="mt-6" style="min-height: 60vh;">
      <v-col cols="12" md="8" lg="6">
    <CreateTask 
    v-if="showCreate" 
    class="mt-6" 
    @close="showCreate = false; 
    reloadTasks()" />
    <UpdateTask 
    v-if="showUpdate" 
    :id="selectedId" 
    class="mt-6" 
    @close="showUpdate = false; 
    reloadTasks()" />
    
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Task } from '../components/CRUD'
import { fetchItems, deleteItem, loading } from '../components/CRUD'
import CreateTask from '../components/CreateTask.vue'
import UpdateTask from '../components/UpdateTask.vue'

const TASKS_API = 'http://localhost:3000/tasks'
const tasks = ref<Task[]>([])
const showCreate = ref(false)
const showUpdate = ref(false)
const searchValue = ref('')
const selectedId = ref<string>('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Description', key: 'description' },
  { title: 'Assigned To User Id', key: 'assignedToUserId' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const reloadTasks = async () => {
  tasks.value = await fetchItems(TASKS_API) as Task[]
}

onMounted(reloadTasks)

function editTask(taskId: string) {
  selectedId.value = taskId
  showUpdate.value = true
}

async function deleteTask(id: string) {
  await deleteItem(TASKS_API, id)
  await reloadTasks()
}
</script>
