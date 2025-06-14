

import axios from 'axios'
import {ref} from 'vue';
export interface User {
  id: number;
  Name: string;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  assignedToUserId: number;
  status: 'pending' | 'completed'|'todo';
}
 export const loading =ref(false)
import type from './Users.vue'
const data = ref<User[]|Task[]>([]);


    export async function fetchItems(API_URL:string):Promise<User[]|Task[]>{
      loading.value = true;
      try{
        const response = await axios.get(API_URL);
        data.value = response.data;
        
      }catch (error){
        console.error('shit hit the fan',error);
      }
      finally {
        loading.value=false
        return data.value;
      }
    }
    export async function deleteItem(API_URL:string,id:number):Promise<void>{
      try {
        console.log('Deleting task with id:', id);
        console.log('DELETE URL:', `${API_URL}/${id}`);
        await axios.delete(`${API_URL}/${id}`);
        console.log('Task deleted successfully');
        // Optionally refresh tasks after deletion
        await fetchItems(API_URL);
      } catch(error) {
        console.error('Error deleting task:', error);
      }
    }
    export async function createItem(API_URL:string,task:User) {
      try{
        
        const response = await axios.post(API_URL,task)
        console.log(response);
        fetchItems(API_URL);
      }catch(error){
        console.log(error);
      }
    }
    
    export async function getItem(API_URL:string,id:number):Promise<void>{
      try {
        console.log('Getting task with id:', id);
        console.log('Get URL:', `${API_URL}/${id}`);
        await axios.get(`${API_URL}/${id}`);
        console.log('Task fetched successfully');
        // Optionally refresh tasks after deletion
        await fetchItems(API_URL);
      } catch(error) {
        console.error('Error Getting task:', error);
      }
    }
    
    
    //
    export async function updateItem(API_URL:string,task:User):Promise<void>{
      try {
        console.log('Deleting task with id:', task.id);
        console.log('DELETE URL:', `${API_URL}/${task.id}`);
        await axios.put(`${API_URL}/${task.id}`);
        console.log('Task deleted successfully');
        // Optionally refresh tasks after deletion
        await fetchItems(API_URL);
      } catch(error) {
        console.error('Error deleting task:', error);
      }
    }
    
    