import React from 'react'
import { useForm } from 'react-hook-form'
import InputHook from '~/components/forms/input/input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterMutation } from '~/app/services/auth'
import { handleError, handleSuccess } from '~/utils/toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const schema = yup
  .object({
    name: yup.string().required('Please enter your userName'),
    email: yup.string().email().required('Please enter your email'),
    password: yup.string().min(6).max(32).required('Please enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  })
  .required()
const SignUp = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const [register, { isLoading }] = useRegisterMutation()
  const onSubmit = async (values) => {

    const dataForm = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }

    try {
      const result = await register(dataForm as any).unwrap()
      console.log('Register', result)
      if (result) 
        handleSuccess(result?.message) 
        reset({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        navigate('/')
    } catch (error) {
       handleError(error?.data?.message)
    }
  }
  return (
    <div className='min-h-3.5 mx-auto w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 lg:p-10 md:p-5 rounded-xl'>
        <div className=' mx-auto md:w-[600px]'>
          <div className='px-4 py-6 bg-white rounded-md shadow-2xl '>
            <h2 className='text-center text-2xl md:text-4xl  font-semibold mb-5'>Đăng ký tài khoản</h2>
            <div className='w-full mb-3'>
              <InputHook
                id='name'
                name='name'
                type='text'
                placeholder='Enter your name'
                className='w-full p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
                control={control}
              ></InputHook>
              {errors?.name && <p className='text-sm text-red-500 '>{errors?.name?.message}</p>}
            </div>
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
            <div className='w-full mb-3'>
              <InputHook
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Enter your confirmPassword'
                className='w-full p-4 border-gray-100 border bg-white rounded-lg outline-none focus:border-blue-500 transition-all'
                control={control}
              ></InputHook>
              {errors?.confirmPassword && <p className='text-sm text-red-500 '>{errors?.confirmPassword?.message}</p>}
            </div>
            <div className='mb-3'>
              <button
                type='submit'
                className={`w-full h-12 flex items-center font-medium text-[16px] md:text-xl uppercase justify-center text-white bg-green-500 rounded-lg mt-5 text-semibold ${
                  isSubmitting ? 'opacity-50' : ''
                }`}
                disabled={isSubmitting}
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
                Bạn đã có tài khoản ?{' '}
                <Link className='text-blue-500 hover:text-[16px] hover:border-b-2 hover:border-blue-500' to='/sign-in'>
                  Đăng nhập
                </Link>{' '}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp