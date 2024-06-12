<template>
  <NavigationBar :component="ManagerViewBody" />
  <!--    <v-col> <v-sheet :elevation="10" :height="200" :width="200" color="red"></v-sheet> </v-col>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManagerViewBody from '@/components/ManagerViewBody.vue'
import NavigationBar from '@/components/NavigationBar.vue'
export default defineComponent({
  name: 'ManagerEmployeesView',
  computed: {
    ManagerViewBody() {
      return ManagerViewBody
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
