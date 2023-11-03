
import { Button, Form, Input,Layout, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateGenreMutation } from '~/app/services/genre';

import { useCreateSupplierMutation } from '~/app/services/supplier';
const { Content} = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GenreCreate = () => {
  const navigate = useNavigate()
  const [createGenre] = useCreateGenreMutation()


  const onFinish = async (values: any) => {
    const dataForm = {
      ...values
    }
    try {
      const responsive = await createGenre(dataForm).unwrap()
      if (responsive) {
         navigate('/admin/genres')
        message.success('Thêm thể loại sách thành công!')
      }
    } catch (error) {
      message.error('Error: ' + error?.data?.message)
    }
  }

  return (
    <Content>
      <div className='text-2xl text-center mb-5 font-medium'>Thêm thể loại sách</div>
      <Form {...layout} name='control-ref' onFinish={onFinish} style={{ maxWidth: 600, background: '#ebebeb' }}>
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

export default GenreCreate
