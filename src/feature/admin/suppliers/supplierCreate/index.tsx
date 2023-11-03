
import { Button, Form, Input,Layout, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';


import { useCreateSupplierMutation } from '~/app/services/supplier';
const { Content} = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SupplierCreate = () => {
  const navigate = useNavigate()
  const [createSupplier] = useCreateSupplierMutation()


  const onFinish = async (values: any) => {
    const dataForm = {
      ...values
    }
    try {
      const responsive = await createSupplier(dataForm).unwrap()
      if (responsive) {
         navigate('/admin/suppliers')
        message.success('Thêm nhà cung cấp thành công!')
      }
    } catch (error) {
      message.error('Error: ' + error?.data?.message)
    }
  }

  return (
    <Content>
      <div className='text-2xl text-center mb-5 font-medium'>Thêm nhà cung cấp</div>
      <Form {...layout} name='control-ref' onFinish={onFinish} style={{ maxWidth: 600, background: '#ebebeb' }}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='contact'
          label='Contact'
          rules={[{ required: true, message: 'Contact is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='address' label='Address' rules={[{ required: true, message: 'Address is required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='active' label='Active' valuePropName='checked'>
          <Switch defaultChecked />
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

export default SupplierCreate
