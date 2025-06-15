<!-- <template>
    <v-card class="pa-6" max-width="500" elevation="8">
        <v-card-title class="text-h5 mb-4">
            {{ data.id=='' ?   'Create User':'Edit User' }}
        </v-card-title>
        <v-form>
            <v-text-field
                v-model="data.name"
                label="Name"
                name="title"
                prepend-inner-icon="mdi-format-title"
                required
                class="mb-4"
            />
           
            <v-btn color="primary" block class="mt-2" type="submit" @click="data.id==''?  createItem(USERS_API, data): updateItem(USERS_API, data) ">
                {{ data.id=="" ? 'Create User': 'Update User'  }}
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref ,onMounted,watch} from 'vue'
import type { Task } from './CRUD'
import { fetchItems ,createItem,updateItem,getItem} from './CRUD'
import type { User } from './CRUD'
const TASKS_API: string = 'http://localhost:3000/tasks';
const USERS_API: string = 'http://localhost:3000/users';
const props = defineProps<{
    id: string;
}>()

const data = ref({} as User)
if (props.id) {
    console.log('Fetching task with ID:', props.id);
 
    getItem(USERS_API, props.id).then((user) => {
        console.log('Fetched task:', user);
        if (user) {
            data.value = user as User;
        }
    });
}
// onMounted(async () => {
//     // Fetch users to populate the select options
//     const users = await fetchItems(USERS_API) as User[]
//     userOptions.value = users.map(user => ({ value: user.id, text: user.name }))
// })

watch(
  () => props.id,
  async (newId) => {
    if (newId) {
      const user = await getItem(USERS_API, newId);
      if (user) {
        data.value = { ...user } as User;
      }
    } else {
      // Reset form for create mode
      data.value = { id: '', name: '' } as User;
    }
  },
  { immediate: true }
);



</script> -->
