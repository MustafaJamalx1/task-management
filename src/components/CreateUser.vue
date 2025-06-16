<template>
    <BackButton href="/users" class="go-back-btn" />

    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            Create User
        </v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <v-text-field
                v-model="data.name"
                label="Name"
                name="Name"
                prepend-inner-icon="mdi-format-title"
                :rules="nameRules"
                required
                class="mb-4"
            />
            <v-btn color="primary" block class="mt-2" type="submit">
                Create User
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createItem } from './CRUD'
import type { User } from './CRUD'
import BackButton from './BackButton.vue'

const USERS_API = 'http://localhost:3000/users'

const data = ref({} as User)
const valid = ref(false)
const form = ref()

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => (v && v.length >= 2) || 'Name must be at least 2 characters'
]

const onSubmit = async () => {
    const {valid} = await form.value?.validate();
    if (valid) {
        await createItem(USERS_API, data.value);
        window.location.reload()
    }
}
</script>
