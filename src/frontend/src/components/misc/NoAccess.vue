<template>
  <v-container class="text-center">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-3 pa-5">
          <v-card-title class="text-h5">Join Request Pending</v-card-title>
          <v-card-text class="py-4">
            <p>
              Your request to join <strong>{{ companyName }}</strong> is still pending. We are
              currently reviewing your request and will notify you once it has been accepted. Please
              check back later or wait for a notification from us.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToDashboard">Return to Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      companyName: 'Acme Corporation' // Placeholder company name, could be dynamic
    }
  },
  methods: {
    goToDashboard() {
      // This assumes you have a route named 'dashboard' in your Vue Router
      this.$router.push({ name: 'splash' })
    }
  }
})
</script>

<style scoped>
.bg-lighten-5 {
  background-color: #f5f5f5;
}
</style>
