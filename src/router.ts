import { createWebHistory, createRouter } from 'vue-router'

import Tasks from './components/Tasks.vue'
import Users from './components/Users.vue'

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', component: Tasks },

  { path: '/users', component: Users },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

