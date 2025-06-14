<template>

     
     <v-container v-show="showTasks">

         <v-data-table
         :headers="[
              { title: 'ID', key: 'id' }
             ,{ title: 'Title', key: 'title' }
             ,{ title: 'Description', key: 'description' }
             ,{ title: 'Assigned To User Id', key: 'assignedToUserId' }
             ,{ title: 'Status', key: 'status' }
             ,{ title: 'Actions', key: 'actions', sortable: false }
            ]"
      :items="tasks"
      :loading="loading"
      class="elevation-1"
      item-value="name"
      >
      <template v-slot:top>
          <v-toolbar flat>
              <v-toolbar-title>My Posts</v-toolbar-title>
            </v-toolbar>
        </template>
        <template #item.actions="{ item }: { item: any }">
          <v-btn color="primary" @click="$emit('edit-task', item)">Edit</v-btn>
          <v-btn color="red" @click="$emit('delete-task', item.id)">Delete</v-btn>
        </template>
        </v-data-table>
    </v-container>
</template>
<script setup lang="ts">
const props = defineProps(['tasks', 'loading','showTasks']);
const emit=defineEmits(['edit-task', 'delete-task']);

</script>