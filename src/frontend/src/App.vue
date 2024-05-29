<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <RouterLink to="/register-modal">Reg</RouterLink>
      <br />
      <RouterLink to="/register-modal2">Reg2</RouterLink>
      <br />
      <RouterLink to="/join">Join</RouterLink>
      <br />
      <RouterLink to="/client-details">ClientDetails</RouterLink>
      <br />
      <RouterLink to="/add-employee">AddEmployee</RouterLink>
      <br />
      <v-btn color="red">Hello</v-btn> <v-dialog>CLICK</v-dialog>
    </v-main>
  </v-app>

  <RouterView />
</template>

<style scoped></style>
