import { initializeApp } from '@firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useCreateNotifyTokenMutation, useGetOneNotificationTokenQuery } from '~/app/services/notificationToken'
import { useEffect } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyByC1PeyYFp9egNMgdrMZ4--mNAEsAQclU',
  authDomain: 'fpoly-medipro.firebaseapp.com',
  projectId: 'fpoly-medipro',
  storageBucket: 'fpoly-medipro.appspot.com',
  messagingSenderId: '617861732796',
  appId: '1:617861732796:web:f329bf742b95ff98d2f3b9',
  measurementId: 'G-3EFC71TGQV'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)
// BD-qlG0zTotLK9zfUS1GY2cxcKEIMD58VV3nFY2JDJzN6it4rcS2C-4RZUQkzOwLK6xNlJl17DGXHZZxWPf4YvU
export async function fetchTokenComponent() {
  const currentToken = await getToken(messaging, {
    vapidKey: 'BMzM9oiKrAdybnTW_y0u9Edy5pJgEyth-MGRkRFj3td_bMsDc2JZwtkoTnleFQezcsOnpTfDEKEIKRD0JFzOD38'
  })
  localStorage.setItem('currentToken', JSON.stringify(currentToken))
  return currentToken
}

export const useGenerateRegistrationToken = () => {
  const [createNotifyToken] = useCreateNotifyTokenMutation()
  const aa = JSON.parse(localStorage.getItem('currentToken'))
  const { data: notifyToken } = useGetOneNotificationTokenQuery(aa)
const notification = notifyToken ?? null

  useEffect(() => {
    const saveToken = async () => {
        if (!notification && notification !== undefined) {
          await createNotifyToken({
            notifyToken:
              'cu7OjLUx7JPeT9kTfJP1am:APA91bECHFsNwWxQWWThFJ-X_EYQKU5c-FdoaVSOVrZJVtbeG4O8BI1wsVwvybIAddWlcgnn2md0oiwKQtdfUJQF0ZzevbsriFD83LcIInhA3Hrm67hZ09kgXgk0FtF2eyvbBKcA4HEm'
          })
        } else {
          console.log('No registration token available. Request permission to generate one.')
        }
    }
    saveToken()
  }, [notification])
  return null
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
