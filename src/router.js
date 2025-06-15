import { createMemoryHistory, createRouter } from 'vue-router'

import Task from './components/Tasks.vue'
import User from './components/Users.vue'

const routes = [
  { path: '/',  },
  { path: '/task', component: Task },
  { path: '/user', component: User },


]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router 