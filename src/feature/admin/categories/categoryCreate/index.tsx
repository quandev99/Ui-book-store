import axios from 'axios';
import { Button, Form, Input, Select,Layout, Switch, message } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '~/app/services/category';
import { DeleteOutlined } from '@ant-design/icons';
import { useCreateImageMutation, useDeleteImageMutation } from '~/app/services/image';
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

 function getSubcategoriesByParentId(data:any) {
   // Sử dụng filter để lọc danh mục con của danh mục cha
   const subcategories = data?.filter((category:any) => category.parent?._id == null)
   return subcategories
 }
const CategoryCreate = () => {
  const navigate = useNavigate()
   const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const [createCategory] = useCreateCategoryMutation()
  const { data, isLoading, error } = useGetAllCategoriesQuery()
  const [deleteImage] = useDeleteImageMutation()
    const [createImage] = useCreateImageMutation()
  const categories = data?.categories
  const subcategories = getSubcategoriesByParentId(categories)

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
      const responsive = await createCategory(dataForm).unwrap()
      if (responsive) {
        message.success('Thêm danh mục!')
         navigate('/admin/categories')
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
        <Form.Item name='parent' label='Danh mục cha'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoading}>
            {subcategories?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch defaultChecked unCheckedChildren='unActive' checkedChildren='active' />
        </Form.Item>
        <div className='p-4'>
          <section className='grid grid-cols-2 items-center gap-x-8 h-[200px]'>
            <header className='cols-span-1'>
              <p className='text-black mb-5'>
                <span>Vui lòng chọn ảnh thương hiệu</span>&nbsp;
              </p>
              <input type='file' onChange={onFileChange} />
            </header>
            <div className='relative cols-span-1 h-full'>
              <div className='absolute h-full w-full'>
                <img
                  src={selectedImage || 'https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg'}
                  className='w-full h-full object-cover'
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

export default CategoryCreate
