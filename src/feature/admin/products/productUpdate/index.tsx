import axios from 'axios'
import { Button, Form, Input, Select, Layout, Switch, message, Row, Col, Space, theme } from 'antd'
import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useDeleteImageMutation } from '~/app/services/image'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllPublishersQuery} from '~/app/services/publisher'
import { useGetAllAuthorsQuery } from '~/app/services/author'
import { useGetAllCategoriesQuery } from '~/app/services/category'
import { useGetAllGenresQuery } from '~/app/services/genre'
import { useGetAllSuppliersQuery } from '~/app/services/supplier'
import { useGetProductByIdQuery, useUpdateProductMutation } from '~/app/services/product'
import TextArea from 'antd/es/input/TextArea'
const { Content } = Layout


const ProductUpdate = () => {
   const navigate = useNavigate()
  const { id } = useParams<{ id: string | any }>()
  const [imageUploading, setImageUploading] = useState(false)
  
  const { data: ProductByIdApi, isLoading: isLoadingProductById, error } = useGetProductByIdQuery(id)
  const dataProductById = ProductByIdApi?.product
  
  const [selectedImages, setSelectedImages] = useState<any[]>([...dataProductById?.image])
  const [image, setImage] = useState<any[]>([...selectedImages])
  const [updateProduct] = useUpdateProductMutation()
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
        const newImages = response?.data?.urls
         setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...newImages])
         setImage((prevImages) => [...prevImages, ...newImages])
      }
    } catch (error: any) {
      message.error('Error uploading image: ' + error?.message)
    } finally {
      setImageUploading(false) // Kết thúc tải ảnh dù có lỗi hay không
    }
  } else {
    setSelectedImages([])
    setImage([])
    setImageUploading(false) // Kết thúc tải ảnh (trường hợp không có file)
  }
}
  const [form] = Form.useForm()
  const initialValues = {
    name: dataProductById?.name || '',
    price: dataProductById?.price || '',
    quantity: dataProductById?.quantity || '',
    description: dataProductById?.description || '',
    publishing_year: dataProductById?.publishing_year || '',
    category_id: dataProductById?.category_id?._id || '',
    author_id: dataProductById?.author_id?._id || '',
    publisher_id: dataProductById?.publisher_id?._id || '',
    supplier_id: dataProductById?.supplier_id?._id || '',
    genre_id: dataProductById?.genre_id?._id || '',
    active: dataProductById?.active || false,
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
      image: image || null,
      _id: id,
      ...values
    }
    try {
      const responsive = await updateProduct(dataForm).unwrap()
      if (responsive) {
        message.success('Cập nhật cuốn sách thành công!')
        navigate('/admin/products')
      }
    } catch (error:any) {
      message.error('Error: ' + error?.data?.message)
    }
  }


  const handleRemoveImage = async (publicId: any) => {
    if (publicId) {
      await deleteImage(publicId)
      const updatedImages = selectedImages?.filter((image) => image?.publicId !== publicId)
      setSelectedImages(updatedImages)
        const updatedImageList = image?.filter((item) => item?.publicId !== publicId)
        setImage(updatedImageList)
    }
  }
// css
     const { token } = theme.useToken()
     const formStyle: React.CSSProperties = {
       maxWidth: 'none',
       background: token.colorFillAlter,
       borderRadius: token.borderRadiusLG,
       padding: 24
     }
  return (
    <Content>
      <Form
        style={formStyle}
        form={form}
        name='control-ref'
        layout='vertical'
        onFinish={onFinish}
        initialValues={initialValues}
        className='p-4'
      >
        <div className='text-2xl text-center mb-5 font-medium '>Cập nhật sách</div>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='price' label='Giá' rules={[{ required: true, message: 'price is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Space>
              <Form.Item
                name='quantity'
                label='Số lượng'
                rules={[{ required: true, message: 'quantity is required!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name='active' label='Active' valuePropName='checked'>
                <Switch defaultChecked />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={16} className='grid grid-rows-2 grid-flow-col gap-4'>
            <div className='row-span-2'>
              <Form.Item
                name='description'
                label='Chi tiết'
                rules={[{ required: true, message: 'description is required!' }]}
              >
                <TextArea
                  showCount
                  maxLength={1000}
                  placeholder='disable resize'
                  style={{ height: 120, resize: 'none' }}
                />
              </Form.Item>
              <Form.Item name='category_id' label='Danh mục'>
                <Select
                  placeholder='Select a option and change input text above'
                  allowClear
                  loading={isLoadingCategory}
                >
                  {dataCategories?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item name='author_id' label='Tác giả'>
                <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingAuthor}>
                  {dataAuthors?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            <div className='row-span-2'>
              <div>
                <Form.Item name='genre_id' label='Kiểu sách'>
                  <Select placeholder='Select a option and change input text above' allowClear loading={isLoadingGenre}>
                    {dataGenres?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item
                  name='publishing_year'
                  label='Năm xuất bản'
                  rules={[{ required: true, message: 'Năm xuất bản is required!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item name='publisher_id' label='Nhà xuất bản'>
                <Select
                  placeholder='Select a option and change input text above'
                  allowClear
                  loading={isLoadingPublisher}
                >
                  {dataPublishers?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item name='supplier_id' label='Nhà cung cấp'>
                <Select
                  placeholder='Select a option and change input text above'
                  allowClear
                  loading={isLoadingSupplier}
                >
                  {dataSuppliers?.map((item: any) => <Option value={item._id}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col span={8}>
            <div className='w-full'>
              <p className='text-black mb-5 text-xl font-medium'>
                <span>Vui lòng chọn ảnh</span>&nbsp;
              </p>
              <input type='file' multiple onChange={onFileChange} />
            </div>
            <div className='grid grid-cols-3 gap-5 bg-red-200'>
              {selectedImages?.map((item) => (
                <div className='h-[120px] w-[120px] relative' key={item?.publicId}>
                  <div className='h-full w-full'>
                    <img
                      src={item?.url || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
                      className='w-full h-full object-fill'
                    />
                  </div>
                  <div
                    className='absolute w-10 py-2 right-0 top-0 text-black bg-white opacity-60 text-center hover:text-red-600 hover:bg-white hover:opacity-100'
                    onClick={() => handleRemoveImage(item?.publicId)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row gutter={24}></Row>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  )
}

export default ProductUpdate
