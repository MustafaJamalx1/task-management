import axios from 'axios'
import {ref} from 'vue';
export interface User {
  id: string;
  name: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToUserId: string;
  status: 'pending' | 'completed'|'todo';
}
 export const loading =ref(false)
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
    export async function deleteItem(API_URL:string,id:string):Promise<void>{
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
    export async function createItem(API_URL:string,task:User|Task):Promise<Task|User> {
      try{
        const response = await axios.post(API_URL,task);
        console.log(response);
        fetchItems(API_URL);
        return response.data;
      }catch(error){
        console.log(error);
        throw error;
      }
    }
    
    export async function getItem(API_URL: string, id: string): Promise<Task | User | null> {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error Getting task:', error);
        return null;
      }
    }
    
    
    //
    export async function updateItem(API_URL: string, task: Task | User): Promise<void> {
      try {
        await axios.put(`${API_URL}/${task.id}`, task);
        await fetchItems(API_URL);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }

