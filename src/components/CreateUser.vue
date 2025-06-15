<template>
    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            Create User
        </v-card-title>
        <v-form>
            <v-text-field
                v-model="data.name"
                label="Name"
                name="Name"
                prepend-inner-icon="mdi-format-title"
                required
                class="mb-4"
            />
            <v-btn color="primary" block class="mt-2" type="submit" @click="createItem(USERS_API, data)">
                Update Task
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchItems, createItem, getItem } from './CRUD'
import type { Task, User } from './CRUD'

const USERS_API = 'http://localhost:3000/users'


const data = ref({} as User)




</script>
