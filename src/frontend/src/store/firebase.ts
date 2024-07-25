import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: 'workwisecentral',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}

const app = initializeApp(firebaseConfig)
const firebaseMessaging = getMessaging(app)
export default firebaseMessaging
