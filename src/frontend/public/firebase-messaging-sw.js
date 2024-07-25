import { getMessaging } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'

importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: 'workwisecentral',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}

export const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
