
export const ToastMessages = {
  success: {
    removed: 'removed from cart successfully!',
    removedOrder: 'Order was removed successfully!',
    added: 'added to cart',
    thanks: 'Thank you for choose us!!',
    welcome: 'Chào mừng bạn đến với Book Store!',
    created: 'Your account was created',
    Empty: 'No result found with that query ',
    logout: 'Đăng xuất thành công'
  },
  error: {
    400: 'Bad Request',
    404: '404 Not Found',
    500: 'Internal error 500',
    401: 'Unauthorized',
    403: 'Forbidden'
  }
}


export const tabContent = [
  { key: '', title: 'Tất cả' },
  { key: 'Pending', title: 'Đang chờ xác nhận' },
  { key: 'Confirmed', title: 'Đã Xác Nhận' },
  { key: 'Delivering', title: 'Đang Giao Hàng' },
  // { key: 'Delivered', title: 'Đã Giao Hàng' },
  // { key: 'DeliveryFailed', title: 'Giao Hàng Thất Bại' },
  { key: 'Completed', title: 'Hoàn thành' },
  { key: 'Abort', title: 'Đã Hủy' }
]
