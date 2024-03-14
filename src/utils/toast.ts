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
  const successMessages = ToastMessages.success
  const successKeys = Object.keys(successMessages)
  for (let i = 0; i < successKeys.length; i++) {
    const key = successKeys[i]
    if (message === key) {
      toast.success(successMessages[key])
      break
    }else {
      toast.success(message)
      break
    }
  }
}
