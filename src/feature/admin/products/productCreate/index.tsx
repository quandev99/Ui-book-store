import axios from 'axios';
import { Button, Form, Input, Select,Layout, Switch, message } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '~/app/services/category';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteImageMutation } from '~/app/services/image';
import { useCreatePublisherMutation } from '~/app/services/publisher';
import { useCreateAuthorMutation } from '~/app/services/author';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Content} = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductCreate = () => {
  const navigate = useNavigate()
    const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const [createAuthor] = useCreateAuthorMutation()
  const [deleteImage] = useDeleteImageMutation()

const onFileChange = async (e: any) => {
  const file = e.target.files[0]
  const formData = {
    images: file
  }
  if (file) {
    setImageUploading(true) // Bắt đầu tải ảnh
    try {
      const response = await axios.post('http://localhost:2605/api/images/uploads/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response?.status == 200) {
        setSelectedImage(response?.data?.url)
        setImage(response?.data)
      }
    } catch (error: any) {
      message.error('Error uploading image: ' + error?.message)
    } finally {
      setImageUploading(false) // Kết thúc tải ảnh dù có lỗi hay không
    }
  } else {
    setSelectedImage('')
    setImageUploading(false) // Kết thúc tải ảnh (trường hợp không có file)
  }
}
  const onFinish = async (values: any) => {
      if (imageUploading) {
        // Nếu đang tải ảnh, không cho phép gọi onFinish
        message.warning('Vui lòng đợi cho đến khi ảnh tải xong.')
        return
      }
    const dataForm = {
      image: image || undefined,
      ...values
    }
    try {
      const responsive = await createAuthor(dataForm).unwrap()
      if (responsive) {
        message.success('Thêm tác giả thành công!')
        navigate('/admin/authors')
      }
    } catch (error:any) {
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
      <div className='text-2xl text-center mb-5 font-medium'>Thêm tác giả</div>
      <Form {...layout} name='control-ref' onFinish={onFinish} style={{ maxWidth: 600, background: '#ebebeb' }}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='birthdate' label='Birth date' rules={[{ required: true, message: 'Birthdate is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='nationality'
          label='Nationality'
          rules={[{ required: true, message: 'Nationality is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='bio' label='Bio' rules={[{ required: true, message: 'bio is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch defaultChecked />
        </Form.Item>
        <div className='p-4'>
          <section className='grid grid-cols-2 items-center gap-x-8 h-[200px]'>
            <header className='cols-span-1'>
              <p className='text-black mb-5'>
                <span>Vui lòng chọn ảnh tác giả</span>&nbsp;
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

export default ProductCreate
