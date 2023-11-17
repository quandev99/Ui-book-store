import { Button, Form, Input,Layout, Switch, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useCreateImageMutation, useDeleteImageMutation } from '~/app/services/image';
import { useCreatePublisherMutation } from '~/app/services/publisher';
import { useNavigate } from 'react-router-dom';
const { Content} = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const PublisherCreate = () => {
   const navigate = useNavigate()
  const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const [createPublisher] = useCreatePublisherMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [createImage] = useCreateImageMutation()

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
  const onFinish = async (values: any) => {
      if (imageUploading) {
        message.warning('Vui lòng đợi cho đến khi ảnh tải xong.')
        return
      }
    const dataForm = {
      image: image || undefined,
      ...values
    }
    try {
      const responsive = await createPublisher(dataForm).unwrap()
      if (responsive) {
        message.success('Thêm nhà xuất bản!')
        navigate('/admin/publishers')
      }
    } catch (error) {
      message.error('Error: ' + error?.data?.message)
    }
  }
  const handleRemoveImage = async (id: any) => {
     if (id) {
       await deleteImage(id)
       setImage({})
       setSelectedImage('')
    }
  }
  return (
    <Content>
      <div className='text-2xl text-center mb-5 font-medium'>Thêm danh mục</div>
      <Form {...layout} name='control-ref' onFinish={onFinish} style={{ maxWidth: 600, background: '#ebebeb' }}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='founded' label='Founded' rules={[{ required: true, message: 'Founded is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='phone_number'
          label='PhoneNumber'
          rules={[{ required: true, message: 'PhoneNumber is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='address' label='Address' rules={[{ required: true, message: 'Address is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch defaultChecked />
        </Form.Item>
        <div className='p-4'>
          <section className='grid grid-cols-2 items-center gap-x-8 h-[200px]'>
            <header className='cols-span-1'>
              <p className='text-black mb-5'>
                <span>Vui lòng chọn ảnh nhà xuất bản</span>&nbsp;
              </p>
              <input type='file' onChange={onFileChange} />
            </header>
            <div className='relative cols-span-1 h-full'>
              <div className='absolute h-full w-full'>
                <img
                  src={selectedImage || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
                  className='w-full h-full object-fill'
                />
              </div>
              <div
                className='absolute w-10 py-2 right-0 top-0 text-black bg-white opacity-60 text-center hover:text-red-600 hover:bg-white hover:opacity-100'
                onClick={() => handleRemoveImage(image?.publicId)}
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

export default PublisherCreate
