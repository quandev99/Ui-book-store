
import  { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch } from 'antd'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '~/app/services/auth'
import { setCredentials } from '~/store/authSlice/authSlice'
const { Title } = Typography
const {  Content } = Layout

const imageLoGo = 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'
const SignIn = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()

    const [login,{isLoading}]= useLoginMutation()
    const onFinish = async (values: any) => {
     try {
       const { metaData } = await login(values).unwrap()
       if (metaData) {
         dispatch(setCredentials(metaData))
          localStorage.setItem('accessToken', JSON.stringify(metaData.tokens.accessToken))
         navigate('/')
        }
     } catch (err) {
     console.log('err:', err)
     }
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    return (
      <>
        <Layout className='layout-default layout-signin'>
          <Content className='signin'>
            <Row gutter={[24, 0]} justify='space-around'>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
                <Title className='mb-15'>Đăng nhập</Title>
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical' className='row-col'>
                  <Form.Item
                    className='Email'
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!'
                      }
                    ]}
                  >
                    <Input placeholder='Email' />
                  </Form.Item>

                  <Form.Item
                    className='username'
                    label='Password'
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!'
                      }
                    ]}
                  >
                    <Input placeholder='Password' />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      style={{ width: '100%' }}
                      className='text-blue-500 border-blue-500 border'
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  <p className='font-semibold text-muted'>
                    Bạn chưa đăng ký tài khoản?
                    <Link to='/sign-up' className='ml-2 text-dark font-bold'>
                      Đăng Ký
                    </Link>
                  </p>
                </Form>
              </Col>
              <Col className='sign-img' style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                <img src={imageLoGo} alt='' />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    )
  }
export default SignIn