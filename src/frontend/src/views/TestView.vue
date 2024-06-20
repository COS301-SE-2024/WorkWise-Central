><script setup lang="ts">
// import NavigationBar from '../components/NavigationBar.vue'
// import JobDetailsList from '../components/AddJob.vue';
import JobCard from '../components/JobCard.vue';
import EmployeeCard from '../components/EmployeeCard.vue';

</script>

<template>
  <v-app>
<!--    <NavigationBar :component="JobDetailsList"/>-->
    <JobCard/>
<!--    <EmployeeCard/>-->
  </v-app>
</template>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>