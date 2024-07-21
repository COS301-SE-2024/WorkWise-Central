<script setup>
import NavigationBar from '../../../components/home/NavigationBar.vue'
import JobAssignTable from '../../../components/home/jobs/management/JobAssignmentTable.vue'
</script>

<template>
  <v-app>
    <NavigationBar :component="JobAssignTable" />
  </v-app>
</template>

<style>
</style>
