<template>

     
     <v-container >

         <v-data-table
         v-show="!showCreate"
         :search="serachValue"
         :headers="[
              { title: 'ID', key: 'id' }
             ,{ title: 'Name', key: 'name' }
             ,{ title: 'Assigned Tasks', key: 'title' }
             ,{ title: 'Actions', key: 'actions', sortable: false }
            ]"
      :items="users"
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
            <v-btn color="primary" @click="handleEditClick(item.id)">Edit</v-btn>
            <v-btn color="red" @click="deleteItem(USERS_API,item.id)">Delete</v-btn>
          </v-toolbar>
        </template>
        <template #item.title="{ item }: { item: User }">
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <template v-if="tasks.filter(t => t.assignedToUserId == item.id).length">
              <v-chip
                v-for="task in tasks.filter(t => t.assignedToUserId == item.id)"
                :key="task.id"
                class="ma-1"
                color="primary"
                label
                small
              >
                {{ task.title }}
              </v-chip>
            </template>
            <template v-else>
              <span>No tasks</span>
            </template>
          </div>
        </template>
        </v-data-table>
        <UpsertUser v-show="showCreate" :id="id"/>
    </v-container>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {fetchItems,createItem,updateItem,deleteItem,getItem} from './CRUD'
import type {User,Task} from  './CRUD'
import UpsertUser from './UpsertUser.vue';
const USERS_API:string = 'http://localhost:3000/users';
const TASKS_API:string = 'http://localhost:3000/tasks';

const id= ref<string>('');
const loading= ref(false);
const users = ref<User[]>([]);
const tasks = ref<Task[]>([]);
const showTasks = ref(false);
const showCreate = ref(false);

onMounted(async ()=>{
  users.value = await fetchItems(USERS_API) as User[];
  tasks.value = await fetchItems(TASKS_API) as Task[];
})
const serachValue=ref('')


function handleShowTasks():void {
  showTasks.value = true;
  fetchItems(USERS_API)
  console.log("mounted")
}
function handleEditClick(userId:string){
  id.value= userId;
  showCreate.value = true;
  
}






</script>