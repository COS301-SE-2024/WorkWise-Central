<script setup>
import NavigationBar from '../components/NavigationBar.vue'
import JobAssignTable from '../components/JobAssignmentTable.vue'
</script>

<template>
    <v-app>
      <NavigationBar/>
      <JobAssignTable class="position-sticky" />
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
