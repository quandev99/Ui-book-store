// // Scripts for firebase and firebase messaging
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: 'AIzaSyDyme83aRu_X9mNoyJwWQBYIXvWnyl7IdE',
//   authDomain: 'book-store-3fd4f.firebaseapp.com',
//   projectId: 'book-store-3fd4f',
//   storageBucket: 'book-store-3fd4f.appspot.com',
//   messagingSenderId: '591932006341',
//   appId: '1:591932006341:web:90e0eed8e2bda29560b5ac',
//   measurementId: 'G-YXV1RH74XE'
// }

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig)

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging()

// messaging.onBackgroundMessage(function (payload) {
//   console.log('Received background message ', payload)

//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body
//   }

//   // eslint-disable-next-line no-restricted-globals
//   self.registration.showNotification(notificationTitle, notificationOptions)
// })




importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyByC1PeyYFp9egNMgdrMZ4--mNAEsAQclU',
  authDomain: 'fpoly-medipro.firebaseapp.com',
  projectId: 'fpoly-medipro',
  storageBucket: 'fpoly-medipro.appspot.com',
  messagingSenderId: '617861732796',
  appId: '1:617861732796:web:f329bf742b95ff98d2f3b9',
  measurementId: 'G-3EFC71TGQV'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.info('[firebase-messageing-sw.js] Received notify:', payload)
  const { title, body, link } = payload.data
  const notificationOptions = {
    body,
    icon: 'https://res.cloudinary.com/mediapro-cloud/image/upload/v1701252620/mediaPro-DATN/logo-icon_jfhiit.png'
  }
  self.registration.showNotification(title, notificationOptions)

  self.addEventListener('notificationclick', (event) => {
    if (link) {
      event.waitUntil(clients.openWindow(link))
    }
    event.notification.close()
  })
})

