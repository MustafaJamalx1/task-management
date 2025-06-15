import { createWebHistory, createRouter } from 'vue-router'

import Tasks from './components/Tasks.vue'
import Users from './components/Users.vue'
import App from './App.vue'
import { components } from 'vuetify/dist/vuetify.js'

const routes = [
  
  { path: '/', component: App },
  { path: '/tasks', component: Tasks },
  { path: '/users', component: Users },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

