<template>
  <v-container>
    <NavigationBar />
    <v-row>
      <v-col> <v-sheet :elevation="10" :height="200" :width="200" color="red"></v-sheet> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
export default defineComponent({
  name: 'EmployeeDesk',
  components: {
    NavigationBar
  }
})
</script>

<style scoped></style>
