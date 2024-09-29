<script setup lang="ts">
import NavigationBar from '@/components/home/NavigationBar.vue'
import ChatUI from '@/components/home/chat/ChatUI.vue'
</script>

<template>
  <NavigationBar :component="ChatUI" />
</template>

<style scoped></style>
