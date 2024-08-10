<script setup lang="ts">
import NavigationBar from '@/components/home/NavigationBar.vue'
import TeamsDashboard from '@/components/home/teams/management/TeamsDashboard.vue'
</script>

<template>
  <NavigationBar :component="TeamsDashboard" />
</template>

<style scoped></style>
