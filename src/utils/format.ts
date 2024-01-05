function formatPrice(num: any) {
  const formattedNum = num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  return formattedNum ? `${formattedNum} đ` : ''
}

function formatDate(dateString) {
  const dateObject = new Date(dateString)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  const hours = String(dateObject.getHours()).padStart(2, '0')
  const minutes = String(dateObject.getMinutes()).padStart(2, '0')
  const seconds = String(dateObject.getSeconds()).padStart(2, '0')
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  return formattedDate
}

export { formatPrice, formatDate }
