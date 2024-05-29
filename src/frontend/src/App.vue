<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <RouterLink to="/register-modal">Reg</RouterLink>
      <v-btn color="red">Hello</v-btn> <v-dialog>CLICK</v-dialog>
    </v-main>
  </v-app>

  <RouterView />
</template>

<style scoped></style>
