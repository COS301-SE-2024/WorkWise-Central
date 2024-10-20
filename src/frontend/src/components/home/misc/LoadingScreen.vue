<template>
  <div class="loading-content" v-if="Loading">
    <img class="loading-logo" />
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    Loading: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    loading: true
  }),
  mounted() {
    console.log('Component mounted. Loading:', this.loading)
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
  width: 100px;
  /* Adjust the size as needed */
  height: auto;
  margin-bottom: 20px;
}
</style>
