import axios from 'axios'
import { Button, Form, Input, Select, Layout, Switch, message } from 'antd'
import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useCreateImageMutation, useDeleteImageMutation } from '~/app/services/image'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPublisherByIdQuery, useUpdatePublisherMutation } from '~/app/services/publisher'
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

const PublisherUpdate = () => {
   const navigate = useNavigate()
  const { id } = useParams<{ id: string | any }>()
  const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState(undefined)
  const [selectedImage, setSelectedImage] = useState('')
  const { data: data, isLoading, error } = useGetPublisherByIdQuery(id)
  const [updatePublisher] = useUpdatePublisherMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [createImage] = useCreateImageMutation()
  const publisherData = data?.publisher

   const onFileChange = async (e: any) => {
     const file = e.target.files[0]
     const formData = new FormData()
     formData.append('images', file)
     if (file) {
       setImageUploading(true) // Bắt đầu tải ảnh
       try {
         const response = await createImage(formData as any)
         if (response || response?.data) {
           setSelectedImage(response?.data?.url)
           setImage(response?.data)
         }
       } catch (error: any) {
         message.error('Error uploading image: ' + error?.message)
       } finally {
         setImageUploading(false)
       }
     } else {
       setSelectedImage('')
       setImageUploading(false)
     }
   }
 
  const [form] = Form.useForm()
  const initialValues = {
    name: publisherData?.name || '',
    phone_number: publisherData?.phone_number || '',
    founded: publisherData?.founded || '',
    address: publisherData?.address || '',
    active: publisherData?.active || false,
    image: publisherData?.image || image
  }
  
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])
    const onFinish = async (values: any) => {
       if (imageUploading) {
         message.warning('Vui lòng đợi cho đến khi ảnh tải xong.')
         return
       }
      const dataForm = {
        image: image || publisherData?.image,
        _id: id,
        ...values
      }
      console.log("onFinish", dataForm);
      try {
        const responsive = await updatePublisher(dataForm).unwrap()
        if (responsive) {
          message.success('Cập nhật NXB thành công!')
           navigate('/admin/publishers')
        }
      } catch (error) {
        message.error('Error: ' + error?.data?.message)
      }
    }
   const handleRemoveImage = async (id: any) => {
     console.log(id)
     if (id) {
       await deleteImage(id)
       setImage({})
       setSelectedImage('')
     }
   }
  return (
    <Content className='flex justify-center '>
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
        <div className='text-2xl text-center mb-5 font-medium '>Cập nhật danh mục</div>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='founded' label='Founded' rules={[{ required: true, message: 'Founded is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='address' label='Address' rules={[{ required: true, message: 'Address is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='phone_number' label='PhoneNumber' rules={[{ required: true, message: 'PhoneNumber is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <div className='p-4'>
          <section className='grid grid-cols-2 items-center gap-x-8 h-[200px]'>
            <header className='cols-span-1'>
              <p className='text-black mb-5'>
                <span>Vui lòng chọn ảnh thương hiệu</span>&nbsp;
              </p>
              <input type='file' name='image' onChange={onFileChange} />
            </header>
            <div className='relative cols-span-1 h-full'>
              <div className='absolute h-full w-full'>
                <img src={selectedImage || publisherData?.image?.url} className='w-full h-full object-cover' />
              </div>
              <div
                className='absolute w-10 py-2 right-0 top-0 text-black bg-white opacity-60 text-center hover:text-red-600 hover:bg-white hover:opacity-100'
                onClick={() => handleRemoveImage(image?.publicId || publisherData?.image?.publicId )}
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

export default PublisherUpdate
