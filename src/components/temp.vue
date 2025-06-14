<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row align="center" class="pa-4">
          <!-- Search Text Field -->
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Search Desserts (Name, Calories, etc.)"
              variant="solo-inverted"
              density="compact"
              hide-details
              clearable
              @keydown.enter="applySearch"
            ></v-text-field>
          </v-col>

          <!-- Search Button -->
          <v-col cols="auto">
            <v-btn @click="applySearch" color="primary">Search</v-btn>
          </v-col>

          <!-- Clear Button (Optional but recommended) -->
          <v-col cols="auto">
            <v-btn @click="clearSearch" color="grey">Clear</v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <!-- The Data Table -->
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="appliedSearch"
        class="elevation-1"
        item-value="name"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
// Assuming VDataTableHeader is the type for headers, often it's just an array of objects
// You can be more specific if you have the exact type from Vuetify's definitions
type VDataTableHeader = {
  title: string;
  key: string;
  align?: 'start' | 'center' | 'end';
};

// Import our Dessert interface if it's in a separate file
// import type { Dessert } from '@/types/Dessert';
interface Dessert {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}


// --- STATE ---

// This holds the text from the search input field.
const searchQuery: Ref<string> = ref('');

// This holds the search term that is *actually* applied to the table.
// It's only updated when the search button is clicked.
const appliedSearch: Ref<string> = ref('');

// Define the table headers. The `key` must match a property in your item objects.
const headers: VDataTableHeader[] = [
  { title: 'Dessert (100g serving)', key: 'name', align: 'start' },
  { title: 'Calories', key: 'calories', align: 'end' },
  { title: 'Fat (g)', key: 'fat', align: 'end' },
  { title: 'Carbs (g)', key: 'carbs', align: 'end' },
  { title: 'Protein (g)', key: 'protein', align: 'end' },
];

// Sample data for the table. In a real app, you'd fetch this from an API.
const desserts: Ref<Dessert[]> = ref([
  { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
  { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
  { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
  { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
]);


// --- METHODS ---

/**
 * Applies the current search query to the data table filter.
 */
const applySearch = () => {
  appliedSearch.value = searchQuery.value;
};

/**
 * Clears both the input field and the applied search, resetting the table.
 */
const clearSearch = () => {
  searchQuery.value = '';
  appliedSearch.value = '';
};
</script>

<style scoped>
/* Optional: Add some spacing */
.v-col {
  padding-left: 8px;
  padding-right: 8px;
}
</style>