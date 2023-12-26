export default function formatPrice(num: any) {
  const formattedNum = num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  return formattedNum ? `${formattedNum} đ` : ''
}
