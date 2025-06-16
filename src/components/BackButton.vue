<template>
    <v-btn
        :href="href"
        color="primary"
        variant="outlined"
        class="ma-2"
        rounded
        elevation="2"
    >
        <v-icon start>mdi-arrow-left</v-icon>
        Back
    </v-btn>
</template>

<script setup lang="ts">
defineProps<{
    href: string
}>()
</script>
