import { Link } from "react-router-dom"
import { formatPrice } from "~/utils/format"

export  function PurchaseDiscount({ subtotalTotal, dataDiscount }) {
  return dataDiscount?.map((discount) => {
    const minPurchaseAmount = discount.min_purchase_amount - subtotalTotal
    const minPrice = discount.min_purchase_amount
    const percentage = Math.floor((subtotalTotal / minPrice) * 100)
    const isExceed = percentage >= 100

    if (minPrice > subtotalTotal && !isExceed) {
      return (
        <div className='flex flex-col mb-3 border-b border-gray-300 pb-3' key={discount?._id}>
          <div className='grid grid-cols-5 gap-x-2 mb-5'>
            <div className='col-span-4'>
              <h6 className='text-xl truncate font-medium'>{discount?.discount_name}</h6>
              <div className='truncate'>{discount?.discount_content}</div>
            </div>
            <Link to='/products' className='col-span-1 underline text-blue-500 text-right'>
              Chi tiết
            </Link>
          </div>
          <div className='grid grid-cols-6  gap-x-2 items-center '>
            <div className='col-span-4'>
              <div className='bg-[#B6D3F9]'>
                <hr
                  className={`h-[8px] bg-blue-600 `}
                  style={{ width: `${percentage >= 100 ? 'w-[100%]' : `${percentage.toString()}%`}` }}
                />
              </div>
              <span className='truncate text-[12px] text-black font-medium '>
                Mua thêm {formatPrice(minPurchaseAmount) || 0} để nhận mã {formatPrice(minPrice)}
              </span>
            </div>
            <Link
              to='/products'
              className='col-span-2 md:py-2 md:px-4 w-full text-center block rounded-md text-white bg-blue-500 '
            >
              Mua thêm
            </Link>
          </div>
        </div>
      )
    } else if (minPurchaseAmount < 0 && minPrice < subtotalTotal) {
      return (
        <div className='flex flex-col mb-3 border-b border-gray-300 pb-3' key={discount?._id}>
          <div className='grid grid-cols-5 gap-x-2 mb-5'>
            <div className='col-span-4'>
              <h6 className='text-xl truncate font-medium'>{discount?.discount_name}</h6>
              <div className='truncate'>{discount?.discount_content}</div>
            </div>
            <Link to='/products' className='col-span-1 underline text-blue-500 text-right'>
              Chi tiết
            </Link>
          </div>
          <div className='grid grid-cols-6  gap-x-2 items-center '>
            <div className='col-span-4'>
              <div className='bg-[#B6D3F9]'>
                <hr className={`h-[8px] bg-blue-600 `} style={{ width: '0%' }} />
              </div>

              <span className='truncate text-[12px] text-black font-medium '>
                Mua thêm {formatPrice(minPurchaseAmount) || 0} để nhận mã {formatPrice(minPrice)}
              </span>
            </div>
            <Link
              to='/products'
              className='col-span-2 md:py-2 md:px-4 w-full text-center block rounded-md text-white bg-blue-500 '
            >
              Mua thêm
            </Link>
          </div>
        </div>
      )
    }
    return null
  })
}
