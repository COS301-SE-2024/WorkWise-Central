<template>
  <v-container>
    <v-card class="bg-white">
      <v-card-title class="text-h5">Payment Successful</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-success">Your payment was successful!</v-list-item-title>
            <v-list-item-subtitle>Please click continue to proceed.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="continueProcess">
          Continue
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaymentSuccess',
  methods: {
    continueProcess() {
      // Redirect the user to the client portal home page
      window.location.href = 'http://localhost:5173/client-portal';
    }
  }
});
</script>

<style scoped>
.bg-white {
  background-color: white; /* Set the background color to white */
}

.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white; /* Ensure the background of the entire container is white */
}

.text-h5 {
  color: #333;
}

.text-success {
  color: #4caf50;
}
</style>
