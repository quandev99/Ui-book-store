
import { useForm } from 'react-hook-form'
import InputHook from '~/components/forms/input/input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterMutation } from '~/app/services/auth'
import { handleError, handleSuccess } from '~/utils/toast'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '~/app/services/auth'
import { setCredentials } from '~/store/authSlice/authSlice'
import iconGoogle from '../../../assets/images/google.png'
import iconFacebook from '../../../assets/images/facebook.png'
const schema = yup
  .object({
    email: yup.string().email().required('Please enter your email'),
    password: yup.string().min(6).max(32).required('Please enter your password'),
  
  })
  .required()
const SignIn = () => {

     const dispatch = useDispatch()
     const navigate = useNavigate()
      const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid, isSubmitting, isSubmitSuccessful }
      } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
      })

    const [login,{isLoading}]= useLoginMutation()
    const onSubmit = async (values: any) => {
      try {
        const { metaData } = await login(values).unwrap()
        if (metaData) {
          localStorage.setItem('dataUsers', JSON.stringify(metaData))
          handleSuccess('welcome')
          navigate('/')
        }
      } catch (error) {
        handleError(error?.data?.message)
      }
    }

    return (
      <>
        <div className='min-h-3.5 mx-auto w-full '>
          <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 lg:p-10 md:p-5 rounded-xl'>
            <div className='mx-auto md:w-[600px]'>
              <div className='px-4 py-6 bg-white rounded-md shadow-2xl '>
                <h2 className='text-center text-2xl md:text-4xl  font-semibold mb-5'>Đăng nhập</h2>
                <div className='w-full mb-3'>
                  <InputHook
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your Email'
                    className='w-full p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
                    control={control}
                  ></InputHook>
                  {errors?.email && <p className='text-sm text-red-500 '>{errors?.email?.message}</p>}
                </div>
                <div className='w-full mb-3'>
                  <InputHook
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter your Password'
                    className='w-full p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
                    control={control}
                  ></InputHook>
                  {errors?.password && <p className='text-sm text-red-500 '>{errors?.password?.message}</p>}
                </div>
                <div className='mb-3'>
                  <button
                    type='submit'
                    className={`w-full h-12 flex items-center font-medium text-[16px] md:text-xl uppercase justify-center text-white bg-green-500 rounded-lg mt-5 text-semibold  ${
                      isSubmitting || isLoading ? 'opacity-50' : ''
                    }`}
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <div className='w-full h-full flex items-center justify-center'>
                        <div className='w-5 h-5 rounded-full inline-block  border-2 border-white border-t-transparent transition-all mx-auto animate-spin'></div>
                      </div>
                    ) : (
                      'Đăng Nhập'
                    )}
                  </button>
                </div>
                <div className='mb-4'>
                  <span className='text-sm font-medium'>
                    Bạn chưa có tài khoản?{' '}
                    <Link
                      className='text-blue-500 hover:text-[16px]  hover:border-b-2 hover:border-blue-500'
                      to='/sign-up'
                    >
                      Đăng ký
                    </Link>{' '}
                  </span>
                </div>
                <div className='w-full grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-5'>
                  <div className='w-full flex items-center justify-center border cursor-pointer'>
                    <div className='w-10 h-10 bg-white '>
                      <img className='h-full w-full object-cover' src={iconGoogle} alt='' />
                    </div>
                    <span>Đăng nhập bằng Google</span>
                  </div>
                  <div className='w-full flex items-center justify-center border cursor-pointer'>
                    <div className='w-10 h-10 bg-white'>
                      <img className='h-full w-full object-cover' src={iconFacebook} alt='' />
                    </div>
                    <span>Đăng nhập bằng Facebook</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
export default SignIn