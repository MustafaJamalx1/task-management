<template>
  <BackButton href="/users" class="go-back-btn" />

  <v-card class="pa-6" max-width="500" elevation="8">
    <v-card-title class="text-h5 mb-4">
      Edit User
    </v-card-title>
    <v-form ref="formRef" v-model="formValid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="data.name"
        label="Name"
        prepend-inner-icon="mdi-format-title"
        :rules="nameRules"
        required
        class="mb-4"
      />
      <v-btn color="primary" block class="mt-2" type="submit">
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
const formRef = ref()
const formValid = ref(true)

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => (v && v.length >= 3) || 'Name must be at least 3 characters',
]

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

const onSubmit = async () => {
  if (formRef.value?.validate()) {
    updateItem(USERS_API, data.value)
  }
}
</script>
