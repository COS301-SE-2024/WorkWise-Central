<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5 text-center"> Verify Your Email Address </v-card-title>
          <v-card-text class="text-center">
            <p>Please click the button below to confirm your email address.</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="verifyEmail"> Confirm Email </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      timeout: 3000
    }
  },
  methods: {
    verifyEmail() {
      // Logic to verify the email address
      // This can involve an API call to the backend server to verify the email

      // Simulating API call with a timeout
      setTimeout(() => {
        this.snackbarText = 'Email verified successfully!'
        this.snackbar = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.pa-4 {
  padding: 16px;
}
</style>
