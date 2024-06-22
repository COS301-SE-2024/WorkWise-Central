<script setup lang="ts">
import NavigationBar from '../components/NavigationBar.vue'
import TeamMemberList from '@/components/TeamMemberList.vue'
import JobLabels from '@/components/JobLabels.vue'
import JobChecklist from '@/components/JobChecklist.vue'
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
