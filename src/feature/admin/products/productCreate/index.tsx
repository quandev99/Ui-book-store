import axios from 'axios';
import { Button, Form, Input, Select,Layout, Switch, message } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '~/app/services/category';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteImageMutation } from '~/app/services/image';
import { useCreatePublisherMutation, useGetAllPublishersQuery } from '~/app/services/publisher';
import { useCreateAuthorMutation, useGetAllAuthorsQuery } from '~/app/services/author';
import { useNavigate } from 'react-router-dom';
import { useGetAllGenresQuery } from '~/app/services/genre';
import { useGetAllSuppliersQuery } from '~/app/services/supplier';
import { useCreateProductMutation } from '~/app/services/product';
const { Option } = Select;
const { Content} = Layout;
const { TextArea } = Input
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductCreate = () => {
  const navigate = useNavigate()
  const [imageUploading, setImageUploading] = useState(false)
  const [image, setImage] = useState([{}])
  const [selectedImages, setSelectedImages] = useState([])
  const [createProduct] = useCreateProductMutation()
  const [deleteImage] = useDeleteImageMutation()
  const { data: categoriesApi, isLoading: isLoadingCategory } = useGetAllCategoriesQuery()
  const dataCategories = categoriesApi?.categories
//author
const { data: authorsApi, isLoading: isLoadingAuthor } = useGetAllAuthorsQuery()
const dataAuthors = authorsApi?.authors
// Publisher
 const { data: publishersApi, isLoading: isLoadingPublisher } = useGetAllPublishersQuery()
 const dataPublishers = publishersApi?.publishers
// Genre
 const { data: genresApi, isLoading: isLoadingGenre } = useGetAllGenresQuery()
 const dataGenres = genresApi?.genres
 // supperlier
 const { data: suppliersApi, isLoading: isLoadingSupplier } = useGetAllSuppliersQuery()
 const dataSuppliers = suppliersApi?.suppliers


const onFileChange = async (event: any) => {
  const files = event.target.files
  if (files) {
    setImageUploading(true) // Bắt đầu tải ảnh
    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append(`images`, files[i])
      }

      const response = await axios.post('http://localhost:2605/api/images/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response?.status === 200) {
        setSelectedImages(response?.data?.urls)
        setImage(response?.data.urls)
      }
    } catch (error: any) {
      message.error('Error uploading image: ' + error?.message)
    } finally {
      setImageUploading(false) // Kết thúc tải ảnh dù có lỗi hay không
    }
  } else {
    setSelectedImages([])
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
      const responsive = await createProduct(dataForm).unwrap()
      if (responsive) {
        message.success('Thêm cuốn sách thành công!')
        navigate('/admin/products')
      }
    } catch (error:any) {
      message.error('Error: ' + error?.data?.message)
    }
  }
  const handleRemoveImage = async (publicId: any) => {
    if (publicId) {
      await deleteImage(publicId)
      const updatedImages = selectedImages.filter((image) => image?.publicId !== publicId)
      setSelectedImages(updatedImages)
       setImage(updatedImages)
    }
  }
  return (
    <Content>
      <div className='text-2xl text-center mb-5 font-medium'>Thêm cuốn sách</div>
      <Form {...layout} name='control-ref' onFinish={onFinish} style={{ background: '#ebebeb' }}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='price' label='price' rules={[{ required: true, message: 'price is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='quantity' label='quantity' rules={[{ required: true, message: 'quantity is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='publishing_year'
          label='Năm xuất bản'
          rules={[{ required: true, message: 'Năm xuất bản is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='description'
          rules={[{ required: true, message: 'description is required!' }]}
        >
          <TextArea showCount maxLength={1000} placeholder='disable resize' style={{ height: 120, resize: 'none' }} />
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item name='category_id' label='Danh mục'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingCategory}>
            {dataCategories?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='author_id' label='Tác giả'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingAuthor}>
            {dataAuthors?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='publisher_id' label='Nhà xuất bản'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingPublisher}>
            {dataPublishers?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='supplier_id' label='Nhà cung cấp'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingSupplier}>
            {dataSuppliers?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='genre_id' label='Kiểu sách'>
          <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingGenre}>
            {dataGenres?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <div className='p-4 h-[500px] w-[500px]'>
          <header className='cols-span-1'>
            <p className='text-black mb-5'>
              <span>Vui lòng chọn ảnh tác giả</span>&nbsp;
            </p>
            <input type='file' multiple onChange={onFileChange} />
          </header>
          <div className='flex items-center gap-x-5'>
            {selectedImages?.map((item) => (
              <div className='cols-span-1 h-full'>
                <div className='h-full w-full'>
                  <img
                    src={item?.url || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
                    className='w-full h-full object-fill'
                  />
                </div>
                <div
                  className=' w-10 py-2 right-0 top-0 text-black bg-white opacity-60 text-center hover:text-red-600 hover:bg-white hover:opacity-100'
                  onClick={() => handleRemoveImage(item?.publicId)}
                >
                  <DeleteOutlined />
                </div>
              </div>
            ))}
          </div>
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
