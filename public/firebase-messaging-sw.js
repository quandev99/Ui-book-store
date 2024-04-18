// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDyme83aRu_X9mNoyJwWQBYIXvWnyl7IdE',
  authDomain: 'book-store-3fd4f.firebaseapp.com',
  projectId: 'book-store-3fd4f',
  storageBucket: 'book-store-3fd4f.appspot.com',
  messagingSenderId: '591932006341',
  appId: '1:591932006341:web:90e0eed8e2bda29560b5ac',
  measurementId: 'G-YXV1RH74XE'
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions)
})
