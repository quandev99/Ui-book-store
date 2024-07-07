import { toast } from 'react-toastify'
import { ToastMessages } from '~/constans'
export const handleError = (error) => {
  if (error && error.status) {
    const statusCode = error.status
    const errorMessage = ToastMessages.error[statusCode]
    if (errorMessage) {
      toast.error(errorMessage)
    } else {
      toast.error(error.message)
    }
  } else {
    toast.error(error)
  }
}
export const handleSuccess = (message) => {
  // const successMessages = ToastMessages.success
  // const successKeys = Object.keys(successMessages)
  // for (let i = 0; i < successKeys.length; i++) {
  //   const key = successKeys[i]
  //   if (message === key) {
  //     toast.success(successMessages[key])
  //     break
  //   }else {
  //     console.log('message', message)
  //     toast.success(message)
  //     break
  //   }
  // }
   const successMessages = ToastMessages.success

   if (successMessages.hasOwnProperty(message)) {
     toast.success(successMessages[message])
   } else {
     toast.success(message)
   }
}
export const handleMessage = (message) => {
   const successMessages = ToastMessages.success

   if (successMessages.hasOwnProperty(message)) {
     toast.info(successMessages[message], {
       position: toast.POSITION.TOP_CENTER
     })
   } else {
     toast.info(message, {
       position: toast.POSITION.TOP_CENTER
     })
   }
}
