<template>
  <v-app>
    <v-main>
      <v-navigation-drawer >
        <v-list>
          <v-list-item title="Tasks"  @click="handleShowTasks" ></v-list-item>

          <v-list-item title="Users" ></v-list-item>

          
        </v-list>
      </v-navigation-drawer>
      <v-container>


   
      <Table 
      :loading="loading"
      :tasks="tasks"
      v-show="showTasks"
      @edit-task="updateTask"
      @delete-task="deleteTask"
    />
      
      
      <!-- <v-text-field 
      label="Task Id"
      placeholder="Enter Task Id"
      type="number"
      v-model="id"
      ></v-text-field> -->
<!--       
      <v-btn
      @click="deleteTask(id)"
      color="red"> 
      delete Task
    </v-btn>
    
      <v-btn
      @click="getTask(id)"
      color="primary"> 
      get User
    </v-btn> -->

    <!-- <v-btn
      @click="createTask({
        id: 4,
        title: 'New Task',
        description: 'Task Description',
        assignedToUserId: 1,
        status: 'todo'
      })"
      color="primary"> 
      Create Task
    </v-btn> -->
      


    
</v-container>
</v-main>
</v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import Table from './components/Table.vue';
import { ref,onMounted } from 'vue';
import { isJsxAttributeLike } from 'typescript';

/////////////////////////////////////////
interface Task {
  id: number;
  title: string;
  description: string;
  assignedToUserId: number;
  status: 'pending' | 'completed'|'todo';
}
const API_URL:string = 'http://localhost:3000/tasks';

const id= ref<number>(0);

const loading= ref(false);
// const editedIndex:number=ref(-1);
const tasks = ref<Task[]>([]);
const showTasks = ref(false);

onMounted(()=>{
  fetchTasks();

})


function handleShowTasks():void {
  showTasks.value = true;
    fetchTasks();
  getTask(1);
}


async function fetchTasks():Promise<void> {
    loading.value = true;
    try{
      const response = await axios.get(API_URL);
      tasks.value = response.data;

    }catch (error){
      console.error('shit hit the fan',error);
    }
    finally {
      loading.value=false
    }
  }
    async function deleteTask(id:number):Promise<void>{
      try {
      console.log('Deleting task with id:', id);
      console.log('DELETE URL:', `${API_URL}/${id}`);
      await axios.delete(`${API_URL}/${id}`);
      console.log('Task deleted successfully');
      // Optionally refresh tasks after deletion
      await fetchTasks();
      } catch(error) {
      console.error('Error deleting task:', error);
      }
    }
    async function createTask(task:Task) {
      try{

        const response = await axios.post(API_URL,task)
        console.log(response);
        fetchTasks();
      }catch(error){
        console.log(error);
      }
        }
















       async function getTask(id:number):Promise<void>{
      try {
      console.log('Getting task with id:', id);
      console.log('Get URL:', `${API_URL}/${id}`);
      await axios.get(`${API_URL}/${id}`);
      console.log('Task fetched successfully');
      // Optionally refresh tasks after deletion
      await fetchTasks();
      } catch(error) {
      console.error('Error Getting task:', error);
      }
    }


  //
  async function updateTask(task:Task):Promise<void>{
      try {
      console.log('Deleting task with id:', id);
      console.log('DELETE URL:', `${API_URL}/${id}`);
      await axios.put(`${API_URL}/${id}`);
      console.log('Task deleted successfully');
      // Optionally refresh tasks after deletion
      await fetchTasks();
      } catch(error) {
      console.error('Error deleting task:', error);
      }
    }
</script>