// Import the Firebase scripts using importScripts
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker with your app's Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyC19nV-sDhiylf36zvqZJJHmObIkz3RJkY",
  authDomain: "workwisecentral.firebaseapp.com",
  projectId: "workwisecentral",
  storageBucket: "workwisecentral.appspot.com",
  messagingSenderId: "950285135964",
  appId: "1:950285135964:web:1778c46e488b5d20033699",
  measurementId: "G-TVE6WF34J2"
});

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/fireEmoji.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
