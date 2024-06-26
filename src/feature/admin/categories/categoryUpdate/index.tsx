import axios from 'axios'
import { Button, Form, Input, Select, Layout, Switch, message } from 'antd'
import { useEffect, useState } from 'react'
import { useCreateCategoryMutation, useGetAllCategoriesQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation } from '~/app/services/category'
import { DeleteOutlined } from '@ant-design/icons'
import { useCreateImageMutation, useDeleteImageMutation } from '~/app/services/image'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select
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

const CategoryUpdate = () => {
  const { id } = useParams<{ id: string | any }>()
  const navigate = useNavigate()
     const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const { data, isLoading, error } = useGetCategoryByIdQuery(id)
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [createImage] = useCreateImageMutation()
  const category = data?.category

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
       setImageUploading(false) // Kết thúc tải ảnh dù có lỗi hay không
     }
   } else {
     setSelectedImage('')
     setImageUploading(false) // Kết thúc tải ảnh (trường hợp không có file)
   }
 }

  const [form] = Form.useForm()
  const initialValues = {
    name: category?.name || '',
    parent: category?.parent?._id || undefined,
    active: category?.active || false,
    image: category?.image || image
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
        image: category?.image || image,
        _id: id,
        ...values
      }
      try {
        const responsive = await updateCategory(dataForm).unwrap()
        if (responsive) {
          message.success('Sửa danh mục thành công!')
          navigate('/admin/categories')
        }
      } catch (error) {
          message.error('Error: ' + error?.data?.message)
      }
    }
    const handleRemoveImage = async (id: any) => {
      if (id) {
        await deleteImage(id)
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
        // loading={isLoading}
        className='p-4'
        >
        <div className='text-2xl text-center mb-5 font-medium '>Cập nhật danh mục</div>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
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
                <img src={selectedImage || category?.image?.url} className='w-full h-full object-cover' />
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

export default CategoryUpdate
