<template>
    <BackButton href="/tasks" class="go-back-btn" />

    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            Edit Task
        </v-card-title>
        <v-form ref="formRef" v-model="formValid">
            <v-text-field
                v-model="data.title"
                label="Title"
                name="title"
                prepend-inner-icon="mdi-format-title"
                required
                class="mb-4"
                :rules="titleRules"
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
                :rules="assignedToRules"
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
            <v-btn color="primary" block class="mt-2" type="submit" @click.prevent="onSubmit">
                Update Task
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchItems, updateItem, getItem } from './CRUD'
import type { Task, User } from './CRUD'
import BackButton from './BackButton.vue'
const TASKS_API = 'http://localhost:3000/tasks'
const USERS_API = 'http://localhost:3000/users'

const props = defineProps<{ id: string }>()
const userOptions = ref<{ value: string; text: string }[]>([])
const data = ref<Task>({} as Task)

const formRef = ref()
const formValid = ref(false)

const titleRules = [
    (v: string) => !!v || 'Title is required',
    (v: string) => (v && v.length >= 3) || 'Title must be at least 3 characters'
]
const assignedToRules = [
    (v: string) => !!v || 'Assigned user is required'
]

onMounted(async () => {
    const users = await fetchItems(USERS_API) as User[]
    userOptions.value = users.map(user => ({ value: user.id, text: user.name }))
})

watch(
    () => props.id,
    async (newId) => {
        if (newId) {
            const task = await getItem(TASKS_API, newId)
            if (task) data.value = task as Task
        }
    },
    { immediate: true }
)

const onSubmit = async () => {
    const {valid} = await formRef.value?.validate();
    if (valid) {
        await updateItem(TASKS_API, data.value);
        window.location.reload();
    }
}
</script>
