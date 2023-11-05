import axios from 'axios';
import { Button, Form, Input, Select,Layout, Switch, message } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '~/app/services/category';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteImageMutation } from '~/app/services/image';
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
  const [image, setImage] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const [createCategory] = useCreateCategoryMutation()
  const { data, isLoading, error } = useGetAllCategoriesQuery()
  const [deleteImage] = useDeleteImageMutation()
  const categories = data?.categories
  const subcategories = getSubcategoriesByParentId(categories)

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    const formData = {
      images: file
    }
    if (file) {
      const response = await axios.post('http://localhost:2605/api/images/uploads/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setSelectedImage(response?.data?.url)
      setImage(response?.data)
    } else {
      setSelectedImage('')
    }
  }
  const onFinish = async (values: any) => {
    const dataForm = {
      image: image || undefined,
      ...values
    }
    try {
      const responsive = await createCategory(dataForm).unwrap()
      if (responsive) {
        message.success('Thêm danh mục!')
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
          <Switch defaultChecked />
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
