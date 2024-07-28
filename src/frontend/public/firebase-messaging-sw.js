//import { getMessaging } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'

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
//const messaging = getMessaging(app)
