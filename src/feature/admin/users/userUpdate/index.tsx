import { Button, Form, Input, Layout, Switch, message } from 'antd'
import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useCreateImageMutation, useDeleteImageMutation } from '~/app/services/image'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useUpdateUserMutation } from '~/app/services/user'
import { Select } from 'antd/lib'
const { Content } = Layout
const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 15
  }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
const { Option } = Select
const UserUpdate = () => {
   const navigate = useNavigate()
  const { id } = useParams<{ id: string | any }>()
  const [image, setImage] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const [selectedImage, setSelectedImage] = useState('')
  const { data: dataUSerAPi, isLoading, error } = useGetUserByIdQuery(id)
  const [updateUser] = useUpdateUserMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [createImage] = useCreateImageMutation()
  const userData = dataUSerAPi?.user

const onFileChange = async (e: any) => {
  const file = e.target.files[0]
  const formData  = new FormData()
  formData.append('image', file)
  if (file) {
    setImageUploading(true) // Bắt đầu tải ảnh
    try {
      const response = await createImage(formData as any)
      if (response || response?.data) {
        setSelectedImage(response?.data?.url)
        setImage(response?.data)
      }
    } catch (error:any) {
      message.error('Error uploading image: ' + error?.message)
    } finally {
      setImageUploading(false) // Kết thúc tải ảnh dù có lỗi hay không
    }
  } else {
    setSelectedImage('')
    setImageUploading(false) // Kết thúc tải ảnh (trường hợp không có file)
  }
}
  const [form] = Form.useForm()
  const initialValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || 'male',
    role: userData?.role || 1,
    active: userData?.active || false,
    verify: userData?.verify || true,
    image: userData?.image || image
  }
  
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  const onFinish = async (values: any) => {
    if (imageUploading) {
      // Nếu đang tải ảnh, không cho phép gọi onFinish
      message.warning('Vui lòng đợi cho đến khi ảnh tải xong.')
      return
    }
   
    // Nếu không đang tải ảnh, tiếp tục thực hiện onFinish
    const dataForm = {
      image: image || userData?.image,
      _id: id,
      ...values
    }
    try {
      const responsive = await updateUser(dataForm).unwrap()
      if (responsive) {
        message.success('Cập nhật tài khoản thành công!')
        navigate('/admin/users')
      }
    } catch (error:any) {
      message.error('Error: ' + error?.data?.message)
    }
  }

   const handleRemoveImage = async (id: any) => {
     if (id) {
       await deleteImage(id)
       setImage(null)
       setSelectedImage('')
     }
   }
  return (
    <Content className='flex justify-center'>
      <Form
        {...layout}
        form={form}
        name='control-ref'
        layout='vertical'
        onFinish={onFinish}
        style={{ maxWidth: 600, background: '#e8e8e8' }}
        initialValues={initialValues}
        className='p-4'
      >
        <div className='text-2xl text-center mb-5 font-medium '>Cập nhật tài khoản</div>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='email' label='Birth date' rules={[{ required: true, message: 'Birth date is required!' }]}>
          <Input readOnly/>
        </Form.Item>
        <Form.Item name='gender' label='Giới tính'>
          <Select placeholder='Chọn giới tính'>
            {[{ value: 'male' }, { value: 'female' }]?.map((item: any) => (
              <Option defaultValue={userData?.gender} key={item.value}>
                {item?.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item name='role' label='Role' >
          <Select placeholder='Phân quyền'>
            {[{ value: 1 }, { value: 2 }]?.map((item: any) => (
              <Option defaultValue={userData?.role} key={item.value}>
                {item?.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className='p-4'>
          <section className='grid grid-cols-2 items-center gap-x-8 h-[200px]'>
            <header className='cols-span-1'>
              <p className='text-black mb-5'>
                <span>Vui lòng chọn ảnh tài khoản</span>&nbsp;
              </p>
              <input type='file' name='image' onChange={onFileChange} />
            </header>
            <div className='relative cols-span-1 h-full'>
              <div className='absolute h-full w-full'>
                <img src={selectedImage || userData?.image?.url} className='w-full h-full object-cover' />
              </div>
              <div
                className='absolute w-10 py-2 right-0 top-0 text-black bg-white opacity-60 text-center hover:text-red-600 hover:bg-white hover:opacity-100'
                onClick={() => handleRemoveImage(image?.publicId || userData?.image?.publicId)}
              >
                <DeleteOutlined />
              </div>
            </div>
          </section>
        </div>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  )
}

export default UserUpdate
