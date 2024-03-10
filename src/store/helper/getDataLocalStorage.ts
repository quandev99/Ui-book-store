
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

export const updateLocalStorageData = (updateObject) => {
  try {
    // Lấy dữ liệu hiện tại từ localStorage
    const storedData = JSON.parse(localStorage.getItem('dataUsers')) || {}

    // Cập nhật cả thông tin người dùng và thông tin tokens
    const updatedData = {
      user: { ...storedData.user, ...updateObject.user },
      tokens: { ...storedData.tokens, ...updateObject.tokens }
    }

    // Lưu dữ liệu đã cập nhật vào localStorage
    localStorage.setItem('dataUsers', JSON.stringify(updatedData))
    console.log('Dữ liệu đã được cập nhật trong localStorage.')
  } catch (error) {
    console.error('Lỗi khi cập nhật dữ liệu trong localStorage:', error)
  }
}






