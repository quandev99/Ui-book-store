import React, { useRef, useState } from 'react'
import { useGetUserByIdQuery, useUpdateUserMutation } from '~/app/services/user'
import InputHook from '~/components/forms/input/input'
import { getUserData, updateLocalStorageData } from '~/store/helper/getDataLocalStorage'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ErrorInput from '~/components/forms/error'
import Radio from '~/components/forms/radio'
import { Spin, message } from 'antd'
import { useCreateImageMutation, useDeleteImageMutation, useUpdateImageMutation } from '~/app/services/image'
const schema = yup
  .object({
    userName: yup.string().required('Vui lòng nhập tên của bạn'),
    userPhone: yup.string().required('Vui lòng nhập số điện thoại của bạn'),
    userGender: yup
      .string()
      .required('Vui lòng chọn giới tính của bạn')
      .oneOf(['male', 'female'], 'Bạn phải chọn một phương thức ')
  })
  .required()
const AccountPage = () => {
  const { user } = getUserData()
  const userId = user?._id
  const { data: dataUserApi, isLoading, error } = useGetUserByIdQuery(userId)
  const dataUser = dataUserApi?.user
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      userGender: dataUser?.gender
    }
  })
  React.useEffect(() => {
    if (dataUser) {
      setValue('userName', dataUser?.name)
      setValue('userEmail', dataUser?.email)
      setValue('userPhone', dataUser?.phone)
      setValue('userGender', dataUser?.gender)
      setImageLarge(dataUser?.image)
    }
    setImageLarge(dataUser?.image)
  }, [dataUser])
  const watchGender = watch('userGender')

  // useRef
  const fileInputRef = useRef<any>(null)
  /// uupdate image
  const [publicId, setPublicId] = useState<any>('')
  const [imageLarge, setImageLarge] = useState<any>({})
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  const [deleteImage] = useDeleteImageMutation()
  const [updateImage] = useUpdateImageMutation()
  const [updateUser] = useUpdateUserMutation()
  const [createImage] = useCreateImageMutation()
  const handleFileChangeImage = async (event: any) => {
    const newImage = event.target.files[0]
    const urlImage = URL.createObjectURL(newImage)
    setIsLoadingImage(true)
    try {
      setImageLarge({ file: newImage, url: urlImage })
    } catch (error) {
      console.log('Error uploading images: ', error)
    } finally {
      setIsLoadingImage(false)
    }
  }

  const onHandleRemoveImage = async (id: string) => {
    try {
      const dataUser: any = { _id: userId, image: {} }
      setImageLarge(null)
      if (id !== undefined && imageLarge !== null) {
        const data = await deleteImage(id).unwrap()
        if (data) {
          const data: any = await updateUser(dataUser).unwrap()
          if (data) {
            message.success(`${data.message}`)
            setImageLarge(null)
          } else {
            message.error(`${data.message}`)
          }
        } else {
          const data: any = await updateUser(dataUser).unwrap()
          if (data) {
            message.success(`${data.message}`)
            setImageLarge(null)
          }
        }
      }
    } catch (error: any) {
      message.error(error)
    }
  }
  const onHandleUpdateImage = async (id: string) => {
    console.log('onHandleUpdateImage', id)
    setPublicId(id)
    try {
      if (fileInputRef.current) {
        fileInputRef.current?.click()
      }
    } catch (error: any) {
      message.error(error)
    }
  }

  const onSubmit = async (values) => {
    // upload image main
    let imageLargeReq = {}
    if (imageLarge && publicId === "") {
      const formDataImage: any = new FormData()
      formDataImage.append('image', imageLarge.file)
      const result: any = await createImage(formDataImage)
      imageLargeReq = result?.data
    } else {
      // Upload main image if available
      if (imageLarge && imageLarge.file) {
        if (publicId && fileInputRef.current) {
          const formDataImageUpdate = new FormData()
          formDataImageUpdate.append('images', imageLarge.file)
          const data = await updateImage({ publicId, formData:formDataImageUpdate }).unwrap()
          imageLargeReq = data || {}
        } 
      }
    }
    // return 
    // Nếu không đang tải ảnh, tiếp tục thực hiện onFinish
    const dataForm: any = {
      _id: userId,
      name: values.userName,
      phone: values.userPhone,
      gender: values.userGender,
      image: imageLargeReq || values.image
    }
    try {
      const { user } = await updateUser(dataForm).unwrap()
      const updateUserData = {
        name: user?.name,
        email: user?.email,
        image: user?.image
      }
      if (user) {
        message.success('Cập nhật tài khoản thành công!')
        updateLocalStorageData({ user: updateUserData})
      }
    } catch (error: any) {
      message.error('Error: ' + error?.data?.message)
    }
  }
  return (
    <div>
      <h2 className='font-medium text-2xl mb-5'>Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
        <div className='flex justify-between items-center'>
          <label className='w-[20%] font-medium' htmlFor='userName'>
            Tên
          </label>
          <div className='w-[80%]'>
            <InputHook
              id='userName'
              name='userName'
              type='text'
              placeholder='Nhập tên'
              className='p-4 border-gray-100 font-medium border bg-white w-full rounded-lg outline-none focus:border-blue-500 transition-all'
              control={control}
            ></InputHook>
            {errors?.userName && (
              <ErrorInput className='text-sm text-red-500' message={errors?.userName?.message}></ErrorInput>
            )}
          </div>
        </div>
        <div className='mb-5'>
          <div className='flex justify-between items-center'>
            <label className='w-[20%] font-medium' htmlFor='userEmail'>
              Email
            </label>
            <div className='w-[80%]'>
              <InputHook
                id='userEmail'
                name='userEmail'
                type='text'
                placeholder='Nhập email'
                className='p-4 border-gray-100 font-medium border bg-white w-full rounded-lg outline-none focus:border-blue-500 transition-all'
                readOnly
                control={control}
              ></InputHook>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <div className='flex justify-between items-center'>
            <label className='w-[20%] font-medium' htmlFor='userPhone'>
              Số điện thoại
            </label>
            <div className='w-[80%]'>
              <InputHook
                id='userPhone'
                name='userPhone'
                type='text'
                placeholder='Nhập số diện thoại'
                className='p-4 border-gray-100 font-medium border bg-white w-full rounded-lg outline-none focus:border-blue-500 transition-all'
                control={control}
              ></InputHook>
              {errors?.userPhone && (
                <ErrorInput className='text-sm text-red-500' message={errors?.userPhone?.message}></ErrorInput>
              )}
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <div className='flex justify-between items-center'>
            <label className='w-[20%] font-medium' htmlFor='userGender'>
              Giới tính
            </label>
            <div className='w-[80%] flex items-center'>
              <div className='flex items-center gap-x-3  mr-3'>
                <Radio control={control} name='userGender' value='male' checked={watchGender === 'male'}></Radio>
                <span className='cursor-pointer'>Nam</span>
              </div>
              <div className='flex items-center gap-x-3 '>
                <Radio control={control} name='userGender' value='female' checked={watchGender === 'female'}></Radio>
                <span className='cursor-pointer'>Nữ</span>
              </div>
            </div>
            {errors.userGender && (
              <ErrorInput className='text-sm text-red-500 ' message={errors?.userGender?.message} />
            )}
          </div>
        </div>

        {imageLarge && imageLarge ? (
          <div className='relative w-full h-[250px] col-span-3 border shadow-md bg-gray-200'>
            <span
              className='absolute px-2 text-white transition-all duration-300 bg-red-400 border rounded-full cursor-pointer top-2 right-2 hover:bg-red-500'
              onClick={() => onHandleRemoveImage(dataUser?.image?.publicId)}
            >
              x
            </span>
            <span
              className='absolute px-2 text-white transition-all duration-300 bg-red-400 border rounded-full cursor-pointer top-2 left-2 hover:bg-red-500'
              onClick={() => {
                onHandleUpdateImage(dataUser?.image?.publicId)
              }}
            >
              edit
            </span>
            <input type='file' onChange={handleFileChangeImage} ref={fileInputRef} className='hidden' />
            <img src={imageLarge?.url} className='object-cover w-full h-full' alt='Image' />
          </div>
        ) : (
          <div className='relative w-full h-[250px] col-span-3 flex justify-center'>
            <div className='w-full px-2 m-4 rounded-lg shadow-xl bg-gray-50'>
              <label className='block mb-2 text-gray-500'>File Upload</label>
              <div className='flex items-center justify-center px-2'>
                <label className='flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                  <div className='flex flex-col items-center justify-center pt-7'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-8 h-8 text-gray-400 group-hover:text-gray-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>Upload Images</p>
                  </div>
                  <input type='file' onChange={handleFileChangeImage} ref={fileInputRef} className='opacity-0' />
                </label>
              </div>
            </div>
          </div>
        )}

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
              'Cập nhật'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountPage
