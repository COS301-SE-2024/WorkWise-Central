<script setup lang="ts">
import NavigationBar from '../components/home/NavigationBar.vue'
import TeamMemberList from '@/components/home/jobs/management/TeamMemberList.vue'
import JobLabels from '@/components/home/jobs/management/JobLabels.vue'
import JobChecklist from '@/components/home/jobs/management/JobChecklist.vue'
</script>

<template>
  <NavigationBar />
  <TeamMemberList />
  <JobLabels />
  <JobChecklist />
</template>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
