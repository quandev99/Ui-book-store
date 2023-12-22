
interface UserData {
  user?: {
    _id?: string
    name?: string
    email?: string
    image?: object
  }
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

// Hàm helper để lấy thông tin người dùng từ localStorage
export const getUserData = () => {
  try {
    const dataUsers = JSON.parse(localStorage.getItem('dataUsers') || '{}')
    return dataUsers || {}
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error.message)
    return {}
  }
}



