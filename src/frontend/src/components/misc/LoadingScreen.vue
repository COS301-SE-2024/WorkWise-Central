<template>
  <v-overlay :value="loading" absolute>
    <div class="loading-content">
      <img src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.png" alt="Loading" class="loading-logo" />
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  mounted() {
    console.log('Component mounted. Loading:', this.loading);
  }
}
</script>


<style scoped>
.v-overlay__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-logo {
  width: 100px; /* Adjust the size as needed */
  height: auto;
  margin-bottom: 20px;
}
</style>
