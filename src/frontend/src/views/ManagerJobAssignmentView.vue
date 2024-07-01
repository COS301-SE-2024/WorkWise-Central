<script setup>
import NavigationBar from '../components/home/NavigationBar.vue'
import JobAssignTable from '../components/home/jobs/management/JobAssignmentTable.vue'
</script>

<template>
  <v-app>
    <NavigationBar :component="JobAssignTable" />
  </v-app>
</template>

<style>
.position-static {
  position: static;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.position-fixed {
  position: fixed;
}

.position-sticky {
  position: sticky;
}
</style>
