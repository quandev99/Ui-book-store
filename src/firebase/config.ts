// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDyme83aRu_X9mNoyJwWQBYIXvWnyl7IdE",
  authDomain: "book-store-3fd4f.firebaseapp.com",
  projectId: "book-store-3fd4f",
  storageBucket: "book-store-3fd4f.appspot.com",
  messagingSenderId: "591932006341",
  appId: "1:591932006341:web:90e0eed8e2bda29560b5ac",
  measurementId: "G-YXV1RH74XE",
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
// BD-qlG0zTotLK9zfUS1GY2cxcKEIMD58VV3nFY2JDJzN6it4rcS2C-4RZUQkzOwLK6xNlJl17DGXHZZxWPf4YvU
export const fetchToken =async (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: ''
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
        setTokenFound(true)
      } else {
        console.log('No registration token available. Request permission to generate one.')
        setTokenFound(false)
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
  
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

