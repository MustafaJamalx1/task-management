<template>

     
     <v-container >

        <v-data-table
        v-show="!showCreate"
          :search="serachValue"
          :headers="[
            { title: 'ID', key: 'id' },
            { title: 'Title', key: 'title' },
            { title: 'Description', key: 'description' },
            { title: 'Assigned To User Id', key: 'assignedToUserId' },
            { title: 'Status', key: 'status' },
            { title: 'Actions', key: 'actions', sortable: false }
          ]"
          :items="tasks"
          :loading="loading"
          class="elevation-1"
          item-value="name"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My Posts</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="showCreate=!showCreate">
                Create Task
              </v-btn>
              <v-text-field
                v-model="serachValue"
                label="Search"
                density="compact"
                hide-details
                single-line
                prepend-inner-icon="mdi-magnify"
                style="max-width: 180px;"
                class="mr-4"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }: { item: any }">
            <v-toolbar>
              <v-btn color="primary" @click="handleEditClick(item.id )">Edit</v-btn>
              <v-btn color="red" @click="deleteItem(API_URL,item.id )">Delete</v-btn>
            </v-toolbar>
          </template>
        </v-data-table>

      <UpsertTask v-show="showCreate" :id="id"/>
        
        
    </v-container>
    
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import type {Task} from './CRUD'
import {fetchItems,createItem,updateItem,deleteItem,getItem,loading} from './CRUD'
import UpsertTask from './UpsertTask.vue';




onMounted(async ()=>{
  tasks.value = await fetchItems(API_URL) as Task[];
})

const serachValue=ref('')



const API_URL:string = 'http://localhost:3000/tasks';

const id = ref<string>(''); // allow null for create mode
const tasks = ref<Task[]>([]);
const showTasks = ref(false);
const showCreate = ref(false);



function handleEditClick(taskId: string): void {
  id.value = taskId;         // set the id ref to the selected task's id
  showCreate.value = true;   // show the Upsert component

}




</script>