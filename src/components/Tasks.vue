<template>

     
     <v-container >

         <v-data-table
         :search="serachValue"
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
              <v-btn><v-icon icon="mdi-magnify"></v-icon></v-btn>
              <v-text-field v-model="serachValue" label="Task Id"></v-text-field>
            
            </v-toolbar>
        </template>
        <template #item.actions="{ item }: { item: any }">
          <v-toolbar>
            <v-btn color="primary" @click="updateItem(API_URL,item)">Edit</v-btn>
            <v-btn color="red" @click="deleteItem(API_URL,item.id)">Delete</v-btn>
          </v-toolbar>
        </template>
        </v-data-table>
    </v-container>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import axios from 'axios'
import type {Task} from './CRUD'
import {fetchItems,createItem,updateItem,deleteItem,getItem,loading} from './CRUD'

onMounted(async ()=>{
  tasks.value = await fetchItems(API_URL) as Task[];
})

const serachValue=ref('')


const API_URL:string = 'http://localhost:3000/tasks';

const id= ref<number>(0);
const tasks = ref<Task[]>([]);
const showTasks = ref(false);


function handleShowTasks():void {
  showTasks.value = true;
    fetchItems(API_URL)
}





</script>