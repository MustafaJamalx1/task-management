<template>
    <div class="mb-4" style="display: flex; justify-content: flex-start;">
        <BackButton href="/tasks" class="go-back-btn" />
    </div>
    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            Create Task
        </v-card-title>
        <v-form ref="form" v-model="formValid" @submit.prevent="onSubmit">
            <v-text-field
                v-model="data.title"
                label="Title"
                name="title"
                prepend-inner-icon="mdi-format-title"
                :rules="titleRules"
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
                :rules="assignRules"
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
            />
            <v-btn color="primary" block class="mt-2" type="submit">
                Create Task
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchItems, createItem } from './CRUD'
import type { Task, User } from './CRUD'
import BackButton from './BackButton.vue'
import Tasks from '@/pages/Tasks.vue'

const TASKS_API = 'http://localhost:3000/tasks'
const USERS_API = 'http://localhost:3000/users'

const userOptions = ref<{ value: string; text: string }[]>([])
const data = ref<Task>({} as Task)
const form = ref()
const formValid = ref(true)

const titleRules = [
    (v: string) => !!v || 'Title is required',
    (v: string) => (v && v.length >= 3) || 'Title must be at least 3 characters'
]
const assignRules = [
    (v: string) => !!v || 'Assigned user is required'
]


onMounted(async () => {
    const users = await fetchItems(USERS_API) as User[]
    userOptions.value = users.map(user => ({ value: user.id, text: user.name }))
})

const onSubmit = () => {
    if (form.value?.validate()) {
        createItem(TASKS_API, data.value)
        window.history.back()
    }
}
</script>
