import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCartByUserQuery } from '~/app/services/cart'
import LoadingSkeleton from '~/components/loading/LoadingSkeleton'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import formatPrice from '~/utils/fomatPrice'

const CartPage = () => {
  const { user: userData } = getUserData()
  const userId = userData?._id
  const { data: dataCartApi, isLoading } = useGetCartByUserQuery(userId)
  const dataCart = dataCartApi?.cart
  const [checked,setChecked] = React.useState([])
  React.useEffect(()=>{
    if(checked)
      setChecked(dataCart?.products.find((item: any) => item._id === product?.is_checked))
  },[checked,dataCart])
  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 gap-4 mt-10 px-2 lg:px-0 lg:grid-cols-3 lg:gap-8'>
        <div className='mb-4  rounded-lg  lg:col-span-2'>
          {isLoading ? (
            <LoadingSkeleton width='100%' height='250px' className='mb-5 rounded-xl'></LoadingSkeleton>
          ) : (
            <>
              <div className='overflow-x-auto bg-gray-100 border border-gray-200  shadow-xl'>
                <table className='min-w-full  divide-y-2 divide-gray-200 bg-gray-100 text-sm border border-gray-50 shadow-md shadow-gray-300'>
                  <thead className='ltr:text-left rtl:text-right font-medium text-[12px] lg:text-[16px] uppercase'>
                    <tr>
                      <td className='sticky inset-y-0 start-0 px-2 lg:px-4 py-2'>
                        <label htmlFor='SelectAll' className='sr-only'>
                          Select All
                        </label>

                        <input
                          type='checkbox'
                          id='SelectAll'
                          className='lg:h-5 lg:w-5 rounded border-gray-300'
                          // onChange={() => {}}
                          checked={true}
                        />
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Sản phẩm</td>
                      <td className=' whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 hidden lg:table-cell'>
                        Số lượng
                      </td>
                      <td className=' whitespace-nowrap lg:px-4 text-center py-2 font-medium text-gray-900'>Số tiền</td>
                      <td className=' whitespace-nowrap px-1 lg:px-4 py-2 text-center font-medium text-gray-900 hidden lg:table-cell'>
                        Thao tác
                      </td>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200'>
                    {dataCart !== null &&
                      dataCart?.products?.map((product: any) => {
                        return (
                          <tr key={product?._id}>
                            <td className='sticky inset-y-0 start-0 px-2 lg:px-4 py-2'>
                              <label className='sr-only' htmlFor={`Row${product._id}`}></label>
                              <input
                                className='lg:h-5 lg:w-5 rounded border-gray-300'
                                type='checkbox'
                                // onChange={() => handleCheckboxChange(product)}
                                checked={product?.is_checked}
                              />
                            </td>

                            <td className=' col-span-2 gap-2 flex lg:m-4 lg:space-x-2 w-full'>
                              <div className='lg:max-w-[80px] w-[40px] h-[40px] lg:h-[80px] lg:w-full border '>
                                <img
                                  src={product?.product_id?.image[0].url || product?.product_image}
                                  alt='No image'
                                  className='object-cover h-full w-full'
                                />
                              </div>
                              <div className=''>
                                <div className='flex flex-col  lg:gap-y-5'>
                                  <Link
                                    to={`/products/${product?.product_id?._id}`}
                                    className='lg:text-[16px] text-[12px]'
                                  >
                                    <h1>{product?.product_name}</h1>
                                  </Link>
                                  <div className=''>{formatPrice(product?.product_price) + '  đ' || 0}</div>
                                </div>
                              </div>
                            </td>

                            <td className='whitespace-nowrap py-2 text-gray-700  hidden lg:table-cell'>
                              <div className='flex items-center justify-center cursor-pointer w-full'>
                                <p
                                  // onClick={() => decrease(product)}
                                  className='px-[12px] bg-white py-[2px] text-[#181819]  text-center text-xl hover:shadow transition-all border border-gray-200 rounded-s'
                                >
                                  -
                                </p>
                                <input
                                  type='text'
                                  value={product?.quantity}
                                  name='quantity'
                                  id=''
                                  min={1}
                                  className='inline-block w-10 outline-none h-[35px] text-center border border-gray-200 text-[#171718] text-xl'
                                  // onChange={(e) =>}
                                />
                                <p
                                  // onClick={() => increase(product)}
                                  className='px-[12px] bg-white py-[2px] border border-gray-200 hover:shadow transition-all rounded-r text-[#111112] text-xl'
                                >
                                  +
                                </p>
                              </div>
                            </td>
                            <td className='text-center whitespace-nowrap lg:text-[16px]  col-span-1  font-medium '>
                              {formatPrice(product?.product_price * product?.quantity) + '  đ' || 0}
                            </td>
                            <td className='whitespace-nowrap px-2 lg:px-4 text-center py-2 text-gray-700'>
                              <button
                                className='inline-block'
                                // onClick={() =>()}
                              >
                                <i className='fa-solid fa-trash text-[#f00a0a]'></i>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <button
                // onClick={}
                className='bg-red-600 hover:bg-red-700 transition-all duration-200 px-4 lg:px-8 text-white py-1 lg:py-2 mt-5 rounded-sm'
              >
                Xóa tất cả
              </button>
            </>
          )}
        </div>

        <div className=''>
          {isLoading ? (
            <LoadingSkeleton width='100%' height='250px' className='mb-5 rounded-xl'></LoadingSkeleton>
          ) : (
            <div className='bg-gray-100 border border-gray-100  shadow-xl'>
              <div className='box-header  px-4 py-2'>
                <h1 className='uppercase font-medium text-[17px]'>Tổng số lượng</h1>
              </div>
              <hr />
              <div className='box-content px-4 py-3'>
                {dataCart?.totals &&
                  dataCart?.totals.length > 0 &&
                  dataCart?.totals?.map((total: any) => {
                    console.log('asdadssad', total)
                    return (
                      <>
                        <div className=' flex justify-between py-3'>
                          <h1>{total?.title}</h1>
                          <span className='font-medium'>{formatPrice(total?.price) || 0}</span>
                        </div>
                        <hr />
                      </>
                    )
                  })}
                <div className=' bg-[#d26e4b] hover:bg-[#b86142] transition-all duration-200 text-white text-center w-full mt-3'>
                  <Link to={`/checkouts`} className='uppercase block py-3 font-medium'>
                    Tiến hành thanh toán
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
