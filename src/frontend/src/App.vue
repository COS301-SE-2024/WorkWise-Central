<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import axios from 'axios'
import { API_URL } from '@/main'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC19nV-sDhiylf36zvqZJJHmObIkz3RJkY',
  authDomain: 'workwisecentral.firebaseapp.com',
  projectId: 'workwisecentral',
  storageBucket: 'workwisecentral.appspot.com',
  messagingSenderId: '950285135964',
  appId: '1:950285135964:web:1778c46e488b5d20033699',
  measurementId: 'G-TVE6WF34J2'
}
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging()
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload)
  if (payload) {
    toast.add({
      severity: 'info',
      summary: payload?.notification?.title,
      detail: payload?.notification?.body,
      life: 10000,
      closable: true
    })
  }
  // ...
})

async function registerFirebaseToken() {
  try {
    const messaging = getMessaging()
    // Retrieve the token
    const currentToken = await getToken(messaging, {
      vapidKey:
        'BHFxgovddtMIC2TUXezr9v2oRD1E4AQZjr-d-dsY6z_ehd-nUqu9HgXKUtcIhAI6NUG44-m-C4_8nPdTtfLTP8I'
    })
    if (currentToken) {
      console.log('Token is:', currentToken)
      const body = {
        newToken: currentToken
      }
      try {
        const response = await axios.post(`${API_URL}notification/push/token`, body, config)
        console.log('Token registered successfully:', response.data.data)
      } catch (error) {
        //console.log('Error posting the token:', error)
      }
    } else {
      console.log('No registration token available. Request permission to generate one.')
    }
  } catch (err) {
    console.log('An error occurred while retrieving token.', err)
  }
}
registerFirebaseToken()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-kanban/styles/material.css';
</style>
