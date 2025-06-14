<template>
  <v-app>
    <v-main>
      <v-navigation-drawer >
        <v-list>
          <v-list-item title="Tasks" ></v-list-item>

          <v-list-item title="Users" ></v-list-item>

          
        </v-list>
      </v-navigation-drawer>
      <v-container>


   <!-- <temp></temp> -->
      <Tasks />
      <Users></Users>
      
      
   


    
</v-container>
</v-main>
</v-app>
</template>

<script setup lang="ts">
import Tasks from './components/Tasks.vue'
import Users from './components/Users.vue';




// const routes:Record<string,Component> = {
 
//   '/tasks': Tasks
// }

// const currentPath = ref<string>(window.location.hash)

// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })

// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1)]
// })

/////////////////////////////////////////

</script>