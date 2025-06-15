import axios from 'axios'
import { ref } from 'vue';

export interface User {
  id: string;
  name: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToUserId: string;
  status: 'pending' | 'completed' | 'todo';
}

export const loading = ref(false);
const data = ref<User[] | Task[]>([]);

export async function fetchItems(API_URL: string): Promise<User[] | Task[]> {
  loading.value = true;
  try {
    const response = await axios.get(API_URL);
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  } finally {
    loading.value = false;
    return data.value;
  }
}

export async function deleteItem(API_URL: string, id: string): Promise<void> {
  loading.value = true;
  try {
    await axios.delete(`${API_URL}/${id}`);
    await fetchItems(API_URL);
  } catch (error) {
    console.error('Error deleting item:', error);
  } finally {
    loading.value = false;
  }
}

export async function createItem(API_URL: string, item: User | Task): Promise<Task | User> {
  loading.value = true;
  try {
    const response = await axios.post(API_URL, item);
    await fetchItems(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  } finally {
    loading.value = false;
  }
}

export async function getItem(API_URL: string, id: string): Promise<Task | User | null> {
  loading.value = true;
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  } finally {
    loading.value = false;
  }
}

export async function updateItem(API_URL: string, item: Task | User): Promise<void> {
  loading.value = true;
  try {
    await axios.put(`${API_URL}/${item.id}`, item);
    await fetchItems(API_URL);
  } catch (error) {
    console.error('Error updating item:', error);
  } finally {
    loading.value = false;
  }
}
