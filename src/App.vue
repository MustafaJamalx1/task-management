<template>
  <v-app>
    <v-navigation-drawer app color="primary" dark>
      <v-list density="compact" nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="`/${item.href}`"
        class="nav-item"
        rounded="lg"
        active-class="nav-item--active"
      >
        <template #prepend>
        <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title style="font-size: 1.25rem;">{{ item.title }}</v-list-item-title>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <router-view />
    <v-main>
      <v-container fluid>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const navItems = [
  { title: 'Tasks', href: 'tasks', icon: 'mdi-format-list-checkbox' },
  { title: 'Users', href: 'users', icon: 'mdi-account-group' }
];
</script>

<style scoped>
.nav-item {
  margin-bottom: 4px;
  transition: background 0.2s;
}
.nav-item--active,
.nav-item:hover {
  background: rgba(255,255,255,0.12);
}
</style>
