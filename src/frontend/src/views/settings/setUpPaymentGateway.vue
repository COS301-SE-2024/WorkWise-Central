<script setup lang="ts">
import NavigationBar from '../../components/home/NavigationBar.vue'
import setUpPaymentGateway from '../../components/home/settings/company/setUpPaymentGateway.vue'
</script>

<template>
  <NavigationBar :component="setUpPaymentGateway" />
</template>

<style scoped></style>
