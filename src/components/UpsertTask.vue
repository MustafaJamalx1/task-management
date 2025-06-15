<template>
    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            {{ data.id=='' ?   'Create Task':'Edit Task' }}
        </v-card-title>
        <v-form>
            <v-text-field
                v-model="data.title"
                label="Title"
                name="title"
                prepend-inner-icon="mdi-format-title"
                required
                class="mb-4"
            />
            <v-textarea
                v-model="data.description"
                label="Description"
                name="description"
                prepend-inner-icon="mdi-text"
                rows="2"
                auto-grow
                class="mb-4"
            />
            <v-select
                v-model="data.assignedToUserId"
                :items="userOptions"
                label="Assign To"
                name="assignedTo"
                item-title="text"
                item-value="value"
                prepend-inner-icon="mdi-account"
                class="mb-4"
                required
            />
            <v-select
                v-model="data.status"
                :items="['todo', 'in-progress', 'done']"
                label="Status"
                name="status"
                prepend-inner-icon="mdi-progress-check"
                class="mb-4"
                required
            />
            <v-btn color="primary" block class="mt-2" type="submit" @click="data.id==''?createItem(TASKS_API, data) : updateItem(TASKS_API, data) ">
                {{ data.id=="" ? 'Create Task': 'Update Task'  }}
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref ,onMounted,watch} from 'vue'
import type { Task } from './CRUD'
import { fetchItems ,createItem,updateItem,getItem} from './CRUD'
import type { User } from './CRUD'
const TASKS_API: string = 'http://localhost:3000/tasks';
const USERS_API: string = 'http://localhost:3000/users';
const props = defineProps<{
    id: string;
}>()
const userOptions = ref<{ value: string; text: string }[]>([])
const data = ref<Task>({} as Task)
if (props.id) {
    console.log('Fetching task with ID:', props.id);
    // Convert id to number before using
    getItem(TASKS_API, props.id).then((task) => {
        console.log('Fetched task:', task);
        if (task) {
            data.value = task as Task;
        }
    });
}
onMounted(async () => {
    // Fetch users to populate the select options
    const users = await fetchItems(USERS_API) as User[]
    userOptions.value = users.map(user => ({ value: user.id, text: user.name }))
})

watch(
  () => props.id,
  async (newId) => {
    if (newId) {
      const task = await getItem(TASKS_API, newId);
      if (task) {
        data.value = { ...task } as Task;
      }
    } else {
      // Reset form for create mode
      data.value = { id:'' , title: '', description: '', assignedToUserId: '', status: 'todo' };
    }
  },
  { immediate: true }
);
function handleCreateSubmit() {
    // Remove id before creating a new user
    const newUser = { ...data.value };
      newUser.id='';
     console.log('Creating new user:', newUser);
    createItem(TASKS_API, newUser);
}


</script>
