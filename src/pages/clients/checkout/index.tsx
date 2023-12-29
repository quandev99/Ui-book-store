import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputHook from "~/components/forms/input/input";
import Radio from "~/components/forms/radio";
import { getUserData } from "~/store/helper/getDataLocalStorage";
import { useGetCartByUserCheckedQuery, useGetCartByUserQuery } from "~/app/services/cart";
const schema = yup
  .object({
    userName: yup.string().required('Please enter your userName'),
    payment: yup
      .string()
      .required('Please select your Payment')
      .oneOf(['nhanhang', 'vnpay'], 'Bạn phải chọn một phương thức thanh toán')
  })
  .required()
const CheckOut = () => {
  const { user: userData } = getUserData()
  const userId = userData?._id
  const { data: dataCartApi, isLoading, error } = useGetCartByUserCheckedQuery(userId)
  const dataCart = dataCartApi?.cart
  console.log("dataCart: " , dataCart)
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
        payment: 'nhanhang'
      }
    })
    const onSubmit = (values) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(values)
          console.log('values', values)
          reset({
            userName: 'quandeptrai',
            payment: 'nhanhang'
          })
        }, 5000)
      })
    }
      const watchPayment = watch('payment')
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto my-10 '>
      <div className='grid grid-cols-3 gap-4'>
        <div>
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
        <div>
          <h2 className='text-2xl font-bold'>Phương thức thánh toán</h2>
          <div className='flex flex-col gap-3 my-5'>
            <div className='flex flex-col gap-5 cursor-pointer'>
              <div className='flex items-center gap-x-3'>
                <Radio control={control} name='payment' value='nhanhang' checked={watchPayment === 'nhanhang'}></Radio>
                <span className='cursor-pointer'>Thanh toán khi nhận hàng</span>
              </div>
              <div className='flex items-center gap-x-3'>
                <Radio control={control} name='payment' value='vnpay' checked={watchPayment === 'vnpay'}></Radio>
                <span className='cursor-pointer'>Thanh toán bằng VnPay</span>
              </div>
            </div>
            {errors.payment && <p className='text-sm text-red-500 '>{errors.payment.message}</p>}
          </div>
        </div>
        <div>
          <div>

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
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckOut

