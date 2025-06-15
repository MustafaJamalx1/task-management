<template>
  <v-card class="pa-6" max-width="500" elevation="8">
    <v-card-title class="text-h5 mb-4">
      Edit User
    </v-card-title>
    <v-form>
      <v-text-field
        v-model="data.name"
        label="Name"
        prepend-inner-icon="mdi-format-title"
        required
        class="mb-4"
      />
      <v-btn color="primary" block class="mt-2" type="submit" @click="updateItem(USERS_API, data)">
        Update User
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { updateItem, getItem } from './CRUD'
import type { User } from './CRUD'

const USERS_API = 'http://localhost:3000/users'

const props = defineProps<{ id: string }>()

const data = ref({} as User)

watch(
  () => props.id,
  async (newId) => {
    if (newId) {
      const user = await getItem(USERS_API, newId)
      if (user) data.value = { ...user } as User
    }
  },
  { immediate: true }
)
</script>
