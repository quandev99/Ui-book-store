import { Button, Form, Input, Layout, Switch, message } from 'antd'
import { useEffect, } from 'react'
import {  LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSupplierByIdQuery, useUpdateSupplierMutation } from '~/app/services/supplier'
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
const SupplierUpdate = () => {
   const navigate = useNavigate()
  const { id } = useParams<{ id: string | any }>()
  const { data, isLoading, error } = useGetSupplierByIdQuery(id)
  const [updateSupplier] = useUpdateSupplierMutation()
  const supplierData = data?.supplier

  const [form] = Form.useForm()

  const initialValues = {
    name: supplierData?.name || '',
    contact: supplierData?.contact || '',
    address: supplierData?.address || '',
    active: supplierData?.active || false,
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
        const responsive = await updateSupplier(dataForm).unwrap()
        if (responsive) {
          message.success('Cập nhật nhà cung cấp thành công!')
           navigate('/admin/suppliers')
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
        <Content className='flex justify-center '>
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
            <div className='text-2xl text-center mb-5 font-medium '>Cập nhật nhà cung cấp</div>
            <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='contact' label='Contact' rules={[{ required: true, message: 'Contact is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Address' rules={[{ required: true, message: 'Address is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='active' label='Active' valuePropName='checked'>
              <Switch />
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

export default SupplierUpdate
