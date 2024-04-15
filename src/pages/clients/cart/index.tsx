import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAddCheckedAllProductMutation, useAddCheckedProductMutation, useDecreaseQuantityMutation, useDeleteAllCartMutation, useGetCartByUserQuery, useIncreaseQuantityMutation, useRemoveCartItemMutation, useUpdateCartItemMutation } from '~/app/services/cart'
import { LoadingPage } from '~/components/loading/LoadingPage'
import LoadingSkeleton from '~/components/loading/LoadingSkeleton'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { formatPrice } from '~/utils/format'
import ApplyDiscount from './components/ApplyDiscount'
import Icon from '../../../assets/images/coupon.png'
import { useGetAllDiscountsQuery, useUnDiscountCartMutation } from '~/app/services/discount'
import { handleError, handleSuccess } from '~/utils/toast'
import { PurchaseDiscount } from './components/PurchaseDiscount'
const CartPage = () => {
  
  const [errUpdate, setErrUpdate] =useState<any>({error:"",productId:""})
  const [checkedAll, setCheckedAll] =useState(false)
  const [loadingChecked, setLoadingChecked] =useState(false)
  const { user: userData } = getUserData()
  const userId = userData?._id
  const { data: dataCartApi, isLoading, error, refetch } = useGetCartByUserQuery(userId,{refetchOnMountOrArgChange: true,})
  const dataCart = dataCartApi?.carts
  const isCheckedAll = dataCart?.products?.every((item) => item.is_checked == true)

useEffect(() => {
  if (dataCart && dataCart?.products) {
    dataCart?.products.forEach((product) => {
      inputRefs.current[product._id] = React.createRef()
    })
    setErrUpdate({ error: '', productId: '' })
  }
  setCheckedAll(isCheckedAll)
}, [dataCart?.products, isCheckedAll])
useEffect(() => {
  refetch()
}, [dataCartApi])
  const [addCheckedProduct] = useAddCheckedProductMutation()
  const [addCheckedAllProduct] = useAddCheckedAllProductMutation()
  const [removeCartItem] = useRemoveCartItemMutation()
  const [updateCartItem] = useUpdateCartItemMutation()
  const [increaseQuantity] = useIncreaseQuantityMutation()
  const [decreaseQuantity] = useDecreaseQuantityMutation()
  const [deleteAllCart] = useDeleteAllCartMutation()
const handlerChecked = async (product: { is_checked: any; product_id: { _id: any }}) => {
  setLoadingChecked(true)
  try {
    const data = {
      userId,
      isChecked: product?.is_checked ? false : true,
      productId: product?.product_id?._id
    }
    const result = await addCheckedProduct(data).unwrap()
    if (result?.success) {
      setLoadingChecked(false)
    }
  } catch (error) {
    console.log('error', error)
  }finally{
    setLoadingChecked(false)
  }
}

const handleCheckedAllChange = async () => {
  setLoadingChecked(true)
  try {
    const data = {
      userId,
      isChecked: checkedAll ? false : true
    }
    const result = await addCheckedAllProduct(data).unwrap()
    if (result?.success) {
       setLoadingChecked(false)
    }
  } catch (error) {
    console.log('error', error)
  }finally{
    setLoadingChecked(false)
  }
}

const handleRemoveItem = async (id: String) => {
  setLoadingChecked(true)
  try {
    const data = {
      userId,
      productId: id
    }
    const result = await removeCartItem(data as any).unwrap()
    if (result?.success) {
      setLoadingChecked(false)
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    setLoadingChecked(false)
  }
}

const deleteAllCartUser = async () => {
  setLoadingChecked(true)
  try {
    const data = {
      userId,
    }
    const result = await deleteAllCart(data as any).unwrap()
    if (result?.success) {
      setLoadingChecked(false)
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    setLoadingChecked(false)
  }
}

const [updatedQuantities, setUpdatedQuantities] = useState({})
const inputRefs = useRef({})


const increase = async (product) => {
  const newQuantity = Math.max(0, Number(product?.quantity + 1))
  setLoadingChecked(true)
  try {
    const data = {
      userId,
      productId: product?.product_id?._id,
      newQuantity: newQuantity || 1
    }
    const result = await updateCartItem(data as any).unwrap()
    if (result?.success) {
      setUpdatedQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product?._id]: Number(product.quantity + 1)
      }))
      setLoadingChecked(false)
    }
  } catch (error) {
    if (error && error.status === 402) {
     setErrUpdate({ error: error?.data?.message, productId: product?._id })
      setUpdatedQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product?._id]: Number(product?.quantity)
      }))
    } else {
      console.log('Error:', error.data.message)
    }
  } finally {
    setLoadingChecked(false)
  }
}
const decrease = async (product) => {
    const newQuantity = Math.max(0, Number((product?.quantity)-1 ))
    setLoadingChecked(true)
  try {
    const data = {
      userId,
      productId: product?.product_id?._id,
      newQuantity: newQuantity || 1
    }
      const result = await updateCartItem(data as any).unwrap()
      if (result?.success) {
        setUpdatedQuantities((prevQuantities) => ({
          ...prevQuantities,
          [product?._id]: +newQuantity !== 0 ? Number(product.quantity - 1) : 1
        }))
        setLoadingChecked(false)
      }
  } catch (error) {
    if (error && error.status === 402) {
     setErrUpdate({ error: error?.data?.message, productId: product?._id })
      setUpdatedQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product?._id]: Number(product?.quantity)
      }))
    } else {
      console.log('Error:', error.data.message)
    }
  } finally {
    setLoadingChecked(false)
  }
}
const handleQuantityChange =async  (newQuantity, product) => {
 setUpdatedQuantities((prevQuantities) => {
   return {
     ...prevQuantities,
     [product?._id]: Number(newQuantity)
   }
 })

  
}

const handleBlur = async (product) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
   const newQuantity = updatedQuantities[product?._id]
  if (newQuantity !== undefined) {
    setLoadingChecked(true)
    try {
      const data = {
        userId,
        productId: product?.product_id?._id,
        newQuantity: newQuantity 
      }
      const result = await updateCartItem(data as any).unwrap()
      if (result?.success) {
        setLoadingChecked(false)
      }
    } catch (error) {
      if (error && error.status === 402) {
        setErrUpdate({ error: error?.data?.message, productId: product?._id })
        setUpdatedQuantities((prevQuantities) => ({
          ...prevQuantities,
          [product?._id]: Number(product?.quantity)
        }))
      } else {
        console.log('Error:', error.data.message)
      }
    } finally {
      console.log("asdad")
      setLoadingChecked(false)
    }
  }
}


 const [isModalOpen, setIsModalOpen] = React.useState(false)

 const showModal = () => {
   setIsModalOpen(true)
 }

 // Discount
const [url,setUrl] = React.useState<String>("")
const [pageDiscount, setPageDiscount] = React.useState(1)
const [limitPage, setLimitPage] = React.useState(2)
const [sortDiscount, setSortDiscount] = React.useState('updatedAt')
const [orderDiscount, setOrderDiscount] = React.useState('desc')

const { data: dataDiscountApi } = useGetAllDiscountsQuery(url)
const dataDiscount = dataDiscountApi?.discounts
React.useEffect(() => {
  setUrl(`?_page=${pageDiscount}&_limit=${limitPage}&_sort=${sortDiscount}&_order=${orderDiscount}`)
}, [ url, orderDiscount, sortDiscount, limitPage, pageDiscount])

 const [unDiscountCart] = useUnDiscountCartMutation()
 const discountUse = dataCart?.totals?.find((t) => t?.code === 'discount');
 const handleUnDiscount =async(value)=>{
  try {
    const data: any = {
      userId,
      ...value
    }
    const result = await unDiscountCart(data).unwrap()
    if (result) {
      refetch()
      handleSuccess(result?.message)
    }
  } catch (error) {
    handleError(error?.data?.message)
    console.log(error)
  }
 }
  const subtotalTotal = dataCart?.totals?.find((t) => t?.code === 'subtotal')?.price
 // Kiểm tra xem phần trăm có vượt quá 80% không (trong trường hợp này)
  return (
    <div className='w-full h-auto'>
      {isLoading || (loadingChecked && <LoadingPage />)}
      <div className=' grid grid-cols-1 lg:px-0  md:grid-cols-3 gap-y-5 gap-x-2 md:gap-x-4 '>
        <div className='lg:h-auto w-full z-10  col-span-1 rounded-lg md:col-span-2'>
          {isLoading ? (
            <LoadingSkeleton width='100%' height='250px' className='mb-5 rounded-xl'></LoadingSkeleton>
          ) : (
            <>
              <div className='overflow-x-auto overscroll-x-auto bg-white border border-gray-200 shadow-xl'>
                <table className=' min-w-full text-sm  h-auto'>
                  <thead className='px-4 py-2 font-medium text-[12px] lg:text-[16px] uppercase'>
                    <tr className=''>
                      <th
                        onClick={(e) => e.stopPropagation()}
                        className='text-center block sticky ml-4 inset-y-0 start-0 '
                      >
                        <input
                          type='checkbox'
                          id='SelectAll'
                          className='lg:h-8 lg:w-5 block rounded border-gray-300'
                          checked={isCheckedAll}
                          onChange={() => handleCheckedAllChange()}
                        />
                      </th>
                      <th className='whitespace-nowrap text-left  font-medium text-gray-900'>
                        Chọn tất cả ({dataCart?.products?.length})
                      </th>
                      <th className=' whitespace-nowrap  text-center font-medium text-gray-900 hidden lg:table-cell'>
                        Số lượng
                      </th>
                      <th className=' whitespace-nowrap lg:px-4 text-center py-2 font-medium text-gray-900'>Số tiền</th>
                      <th className=' whitespace-nowrap px-1 text-center font-medium text-gray-900 hidden lg:table-cell'>
                        Thao tác
                      </th>
                    </tr>
                  </thead>

                  <tbody className=''>
                    {dataCart !== null &&
                      dataCart?.products?.map((product: any) => {
                        return (
                          <tr key={product?._id} className='border border-y'>
                            <td
                              onClick={() => handlerChecked(product)}
                              className='sticky inset-y-0 start-0 px-2 lg:px-4 py-2'
                            >
                              <label className='sr-only' htmlFor={`Row${product._id}`}></label>
                              <input
                                className='lg:h-5 lg:w-5 rounded border-gray-300'
                                type='checkbox'
                                checked={product?.is_checked}
                                readOnly
                              />
                            </td>

                            <td className='col-span-2 m-2 gap-2 flex lg:m-4 lg:space-x-2 w-full'>
                              <div className='lg:max-w-[80px] w-[40px] h-[40px] lg:h-[80px] lg:w-full border '>
                                <img
                                  src={product?.product_id?.image[0]?.url || product?.product_image}
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
                                  <div className='flex gap-2'>
                                    <span className='line-through text-gray-500'>
                                      {formatPrice(product?.product_id?.price)}
                                    </span>
                                    <span className='text-primary'>{formatPrice(product?.product_price || 0)}</span>
                                  </div>
                                </div>
                                {errUpdate && errUpdate.productId == product?._id && (
                                  <div className='text-red-500 p-2 '>{errUpdate?.error}</div>
                                )}
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-2 text-gray-700  lg:table-cell'>
                              <div className='flex items-center justify-center cursor-pointer w-full'>
                                <p
                                  onClick={() => decrease(product)}
                                  className='px-[12px] bg-white py-[2px] text-[#181819] text-center text-xl hover:shadow transition-all border border-gray-200 rounded-l'
                                >
                                  -
                                </p>
                                <input
                                  ref={inputRefs.current[product._id]}
                                  value={
                                    updatedQuantities[product._id] !== undefined
                                      ? updatedQuantities[product._id]
                                      : product.quantity
                                  }
                                  name={`quantity-${product._id}`}
                                  className='inline-block w-10 outline-none h-[35px] text-center border border-gray-200 text-[#171718] text-xl'
                                  onChange={(e) => handleQuantityChange(e.target.value, product)}
                                  onBlur={() => handleBlur(product)}
                                />
                                <p
                                  onClick={() => increase(product)}
                                  className='px-[12px] bg-white py-[2px] border border-gray-200 hover:shadow transition-all rounded-r text-[#111112] text-xl'
                                >
                                  +
                                </p>
                              </div>
                            </td>
                            <td className='text-center whitespace-nowrap lg:text-[16px]  col-span-1  font-medium '>
                              {formatPrice(product?.product_price * product?.quantity) || 0 + '  đ'}
                            </td>
                            <td className='whitespace-nowrap px-2 lg:px-4 text-center py-2 text-gray-700'>
                              <button className='inline-block' onClick={() => handleRemoveItem(product?._id)}>
                                xóa
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <button
                onClick={deleteAllCartUser}
                className='hidden sm:block bg-red-600 hover:bg-red-700 transition-all duration-200 px-4 lg:px-8 text-white py-1 lg:py-2 mt-5 rounded-sm'
              >
                Xóa tất cả
              </button>
            </>
          )}
        </div>
        <div className='w-full relative grid grid-flow-row h-auto  lg:h-[800px] lg:gap-y-5 md:sticky top-[10px]'>
          {isLoading ? (
            <>
              <LoadingSkeleton width='100%' height='300px' className='mb-2 rounded-xl'></LoadingSkeleton>
              <LoadingSkeleton width='100%' height='300px' className=' rounded-xl'></LoadingSkeleton>
            </>
          ) : (
            <>
              <div className=' shadow-xl bg-white'>
                <div className='box-header px-3 py-4 cursor-pointer  '>
                  <div className='flex items-center gap-x-4 border-b border-gray-300 pb-4' onClick={showModal}>
                    <div className='h-full w-10 '>
                      <img src={Icon} alt='' />
                    </div>
                    <h1 className='uppercase font-medium text-[17px]'>Khuyến mãi</h1>
                  </div>
                  <div className='my-3'>
                    <PurchaseDiscount subtotalTotal={subtotalTotal} dataDiscount={dataDiscount}></PurchaseDiscount>
                  </div>
                  {/* {discountUse && (
                    <div className='p-2 w-full h-[40px] bg-orange-200 text-orange-500  rounded-lg text-sm  flex justify-between items-center mb-1'>
                      <div className=''>{discountUse?.title}</div>
                      <div
                        onClick={() => handleUnDiscount({ discountId: dataCart?.discount_id })}
                        className=' text-primary font-semibold'
                      >
                        X
                      </div>
                    </div>
                  )} */}
                  {discountUse && (
                    <div className='p-2 w-full h-[40px] bg-green-200 text-green-700  rounded-lg text-sm  flex justify-between items-center'>
                      <div className=''>{discountUse?.title}</div>
                      <div
                        onClick={() => handleUnDiscount({ discountId: dataCart?.discount_id })}
                        className=' text-primary font-semibold'
                      >
                        X
                      </div>
                    </div>
                  )}
                  <span className='text-[11px] text-gray-400 font-medium'>Có thể áp dụng đồng thời nhiều mã</span>
                </div>
                <ApplyDiscount
                  discountId={dataCart?.discount_id}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  refetch={refetch}
                ></ApplyDiscount>
              </div>
              <div className='bg-white fixed z-10 bottom-0 left-0 w-full lg:relative border border-gray-100  shadow-xl'>
                <h1 className='uppercase px-4 py-2 font-medium text-sm lg:text-[17px]'>Tổng số lượng</h1>
                <hr />
                <div className='px-4 py-3'>
                  {dataCart?.totals &&
                    dataCart?.totals.length > 0 &&
                    dataCart?.totals?.map((total: any, index) => {
                      return (
                        <React.Fragment key={total?.code + index}>
                          <div className=' flex justify-between py-3' key={total?.code}>
                            <h1 className='text-sm md:text-[16px]'>{total?.title}</h1>
                            <span
                              className={`${
                                total?.code == 'grand_total'
                                  ? ' md:text-xl lg:text-2xl font-bold text-red-500'
                                  : 'font-medium '
                              }`}
                            >
                              {formatPrice(total?.price) || 0}
                            </span>
                          </div>
                          <hr />
                        </React.Fragment>
                      )
                    })}
                  <div className=' bg-[#d26e4b] hover:bg-[#b86142] transition-all duration-200 text-white text-center w-full mt-3'>
                    <Link to={`/checkout`} className='uppercase block py-3 font-medium'>
                      Tiến hành thanh toán
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
