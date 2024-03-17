import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAddCheckedAllProductMutation, useAddCheckedProductMutation, useDecreaseQuantityMutation, useDeleteAllCartMutation, useGetCartByUserQuery, useIncreaseQuantityMutation, useRemoveCartItemMutation, useUpdateCartItemMutation } from '~/app/services/cart'
import { LoadingPage } from '~/components/loading/LoadingPage'
import LoadingSkeleton from '~/components/loading/LoadingSkeleton'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { formatPrice } from '~/utils/format'

const CartPage = () => {
  
  const [errUpdate, setErrUpdate] =useState<any>({error:"",productId:""})
  const [checkedAll, setCheckedAll] =useState(false)
  const [loadingChecked, setLoadingChecked] =useState(false)
  const { user: userData } = getUserData()
  const userId = userData?._id
  const { data: dataCartApi, isLoading,error } = useGetCartByUserQuery(userId)
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

  return (
    <div className='w-full'>
      {isLoading || loadingChecked && <LoadingPage />}
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
                      <td onClick={(e) => e.stopPropagation()} className='sticky inset-y-0 start-0 px-2 lg:px-4 py-2'>
                        <label htmlFor='SelectAll' className='sr-only'>
                          Select All
                        </label>

                        <input
                          type='checkbox'
                          id='SelectAll'
                          className='lg:h-5 lg:w-5 rounded border-gray-300'
                          checked={isCheckedAll}
                          onChange={() => handleCheckedAllChange()}
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

                            <td className=' col-span-2 gap-2 flex lg:m-4 lg:space-x-2 w-full'>
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
                                          {formatPrice(
                                            product?.product_id?.price
                                          )}
                                        </span>
                                        <span className='text-primary'>{formatPrice(product?.product_price || 0)}</span>
                                  </div>
                                </div>
                                {errUpdate && errUpdate.productId == product?._id && (
                                  <div className='text-red-500 p-2 '>{errUpdate?.error}</div>
                                )}
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-2 text-gray-700  hidden lg:table-cell'>
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
                  dataCart?.totals?.map((total: any, index) => {
                    return (
                      <React.Fragment key={total?.code + index}>
                        <div className=' flex justify-between py-3' key={total?.code}>
                          <h1>{total?.title}</h1>
                          <span
                            className={`${
                              total?.code == 'grand_total' ? 'text-2xl font-bold text-red-500' : 'font-medium '
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
