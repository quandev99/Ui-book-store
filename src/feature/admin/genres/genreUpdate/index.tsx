import { Button, Form, Input, Layout, Switch, message } from 'antd'
import { useEffect, } from 'react'
import {  LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetGenreByIdQuery, useUpdateGenreMutation } from '~/app/services/genre'
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
const GenreUpdate = () => {
   const navigate = useNavigate()
  const { id } = useParams<{ id: string | any }>()
  const { data, isLoading, error } = useGetGenreByIdQuery(id)
  const [updateGenre] = useUpdateGenreMutation()
  const genreData = data?.gender

  const [form] = Form.useForm()

  const initialValues = {
    name: genreData?.name || '',
    description: genreData?.description || '',
  }
  
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])
    const onFinish = async (values: any) => {
      const dataForm = {
        _id: id,
        ...values
      }
      try {
        const responsive = await updateGenre(dataForm).unwrap()
        if (responsive) {
          message.success('Cập nhật thể loại sách thành công!')
           navigate('/admin/genres')
        }
      } catch (error) {
        message.error('Error: ' + error?.data?.message)
      }
    }
    if (isLoading){
      return (
        <div className='flex items-center justify-center text-3xl text-blue-600 mt-20'>
          <LoadingOutlined />
        </div>
      )
    }
      return (
        <Content className='flex justify-center'>
          <Form
            {...layout}
            form={form}
            name='control-ref'
            layout='vertical'
            onFinish={onFinish}
            style={{ maxWidth: 800, background: '#e8e8e8' }}
            initialValues={initialValues}
            className='p-4'
          >
            <div className='text-2xl text-center mb-5 font-medium '>Cập nhật thể loại sách</div>
            <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Description is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      )
}

export default GenreUpdate
