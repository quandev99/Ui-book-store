import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputHook from "~/components/forms/input/input";
import Radio from "~/components/forms/radio";
import { getUserData } from "~/store/helper/getDataLocalStorage";
import { useGetCartByUserCheckedQuery } from "~/app/services/cart";
import React from "react";
import { useAddBillMutation } from "~/app/services/bill";
import { formatPrice } from "~/utils/format";
import { useCreatePaymentMutation } from "~/app/services/payment";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "~/utils/toast";
const schema = yup
  .object({
    userName: yup.string().required('Please enter your userName'),
    userNote: yup.string().required('Please enter your userNote'),
    userAddress: yup.string().required('Please enter your userAddress'),
    userPhone: yup.string().required('Please enter your userPhone'),
    payment: yup
      .string()
      .required('Please select your Payment')
      .oneOf(['CashPayment', 'OnlinePayment'], 'Bạn phải chọn một phương thức thanh toán')
  })
  .required()
const CheckOut = () => {
  const navigate = useNavigate()
  const { user: userData } = getUserData()
  const userId = userData?._id
  const { data: dataCartApi, isLoading, error } = useGetCartByUserCheckedQuery(userId)
  const [createPayment ] = useCreatePaymentMutation()
const [addBill]=  useAddBillMutation()
  const dataCart = dataCartApi?.carts
    const {
      handleSubmit,
      getValues,
      setValue,
      control,
      reset,
      watch,
      formState: { errors, isValid, isSubmitting, isSubmitSuccessful }
    } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: {
        payment: 'CashPayment'
      }
    })
    const onSubmit = async (values) => {
      const formCheckout: any = {
        user_id: userId,
        bill_userName: values.userName,
        bill_note: values.userNote,
        bill_shippingAddress: values.userAddress,
        bill_phoneNumber: values.userPhone,
        payment_method: values.payment || undefined
      }
      console.log('payment', values?.payment)
      if (values?.payment == 'OnlinePayment') {
        const data: any = await createPayment(formCheckout).unwrap()
        alert('Đặt hàng thành công!')
        console.log("data",data);
        if (data) {
          window.location.href = data
        }
      } else {
        const resolve = await addBill(formCheckout).unwrap()
        if(resolve && resolve.success) 
          handleSuccess(resolve.message)
        reset({
          userName: 'quandeptrai',
          userNote: '',
          userAddress: '',
          userPhone: '',
          payment: 'CashPayment'
        })
        
        return navigate(`/customer/order/${resolve?.bill?._id}/update`)
      }
    }
      // console.log('Success', data)
      // return 
      // const resolve = await addBill(data).unwrap()
      // alert("Đặt hàng thành công!")
      // if (resolve)
      //   reset({
      //     userName: 'quandeptrai',
      //     userNote: '',
      //     userAddress: '',
      //     userPhone: '',
      //     payment: 'CashPayment'
      //   })
  
      const watchPayment = watch('payment')
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto my-10 '>
      <div className='grid grid-cols-3 gap-4'>
        <div className='shadow-2xl  p-4'>
          <h2 className='text-2xl font-bold'>Thông tin giao hàng</h2>
          <div className='flex flex-col gap-3 mb-2'>
            <label htmlFor='userName' className='cursor-pointer'>
              Tên người nhận
            </label>
            <InputHook
              id='userName'
              name='userName'
              type='text'
              placeholder='Enter your userName'
              className='p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
              control={control}
            ></InputHook>
            {errors?.userName && <p className='text-sm text-red-500 '>{errors?.userName?.message}</p>}
          </div>
          <div className='flex flex-col gap-3 mb-2'>
            <label htmlFor='userPhone' className='cursor-pointer'>
              Số điện thoại
            </label>
            <InputHook
              id='userPhone'
              name='userPhone'
              type='text'
              placeholder='Enter your userPhone'
              className='p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
              control={control}
            ></InputHook>
            {errors?.userPhone && <p className='text-sm text-red-500 '>{errors?.userPhone?.message}</p>}
          </div>
          <div className='flex flex-col gap-3 mb-2'>
            <label htmlFor='userAddress' className='cursor-pointer'>
              Địa chỉ
            </label>
            <InputHook
              id='userAddress'
              name='userAddress'
              type='text'
              placeholder='Enter your userAddress'
              className='p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
              control={control}
            ></InputHook>
            {errors?.userAddress && <p className='text-sm text-red-500 '>{errors?.userAddress?.message}</p>}
          </div>
          <div className='flex flex-col gap-3 mb-5'>
            <label htmlFor='userNote' className='cursor-pointer'>
              Ghi chú
            </label>
            <InputHook
              id='userNote'
              name='userNote'
              type='text'
              placeholder='Enter your userNote'
              className='p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
              control={control}
            ></InputHook>
            {errors?.userNote && <p className='text-sm text-red-500 '>{errors?.userNote?.message}</p>}
          </div>
        </div>
        <div className='shadow-2xl p-4 bg-slate-50'>
          <h2 className='text-2xl font-bold'>Phương thức thánh toán</h2>
          <div className='flex flex-col gap-3 my-5 '>
            <div className='flex flex-col gap-5 cursor-pointer'>
              <div className='flex items-center gap-x-3'>
                <Radio control={control} name='payment' value='CashPayment' checked={watchPayment === 'CashPayment'}></Radio>
                <span className='cursor-pointer'>Thanh toán khi nhận hàng</span>
              </div>
              <div className='flex items-center gap-x-3  '>
                <Radio control={control} name='payment' value='OnlinePayment' checked={watchPayment === 'OnlinePayment'}></Radio>
                <span className='cursor-pointer'>Thanh toán bằng VnPay</span>
              </div>
            </div>
            {errors.payment && <p className='text-sm text-red-500 '>{errors.payment.message}</p>}
          </div>
        </div>
        <div className='shadow-2xl  p-4'>
          <h2 className='text-2xl font-bold'>Sản phẩm</h2>
          <tbody>
            {dataCart !== null &&
              dataCart?.products?.map((product: any) => {
                return (
                  <tr key={product?._id}>
                    <td className=' col-span-2 gap-2 flex lg:m-4 lg:space-x-2 w-full'>
                      <div className='w-[60px] h-[60px] relative'>
                        <div className='w-full h-full  border border-1 shadow-md absolute'>
                          <img
                            src={product?.product_id?.image[0]?.url || product?.product_image}
                            alt='No image'
                            className='object-cover h-full w-full '
                          />
                        </div>
                        <div className=' text-white w-5 h-5 rounded-full bg-primary flex items-center justify-center  absolute top-0 right-0 z-50'>
                          <span className='text-xs'>{product.quantity}</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-y-5'>
                        <span className='text-xs'>{product?.product_name}</span>
                        <span>{formatPrice(product?.product_price) || 0 + '  đ'}</span>
                      </div>
                    </td>

                    <td className='text-center whitespace-nowrap lg:text-[16px]  col-span-1  font-medium text-primary'>
                      {formatPrice(product?.product_price * product?.quantity) || 0 + '  đ'}
                    </td>
                  </tr>
                )
              })}
          </tbody>
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
          </div>
          <div>
            <button
              type='submit'
              className={`w-full p-4 text-white bg-green-500 rounded-lg mt-5 text-semibold ${
                isSubmitting ? 'opacity-50' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className='w-5 h-5 rounded-full  border-2 border-white border-t-transparent transition-all mx-auto animate-spin'></div>
              ) : (
                'Đặt Hàng'
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckOut

