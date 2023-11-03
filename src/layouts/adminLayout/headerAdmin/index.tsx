import { Row, Col, Breadcrumb, Input, Layout, theme, Button, Popover } from 'antd'
import { SearchOutlined, HomeOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
const { Header } = Layout
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
const HeaderAdmin = ({ subName, collapsed, setCollapsed }: any) => {
  const pathName = subName.split('/').slice(1).join('/')
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const text = <span>Admin</span>

  const content = (
    <div>
      <Link to='/sign-in' className='btn-sign-in'>
        Sig-in
      </Link>
      <p>Content</p>
    </div>
  )
const [isNavOpen, setIsNavOpen] = useState(!collapsed)

const toggleNav = () => {
  setCollapsed(!collapsed)
}
useEffect(() => {
  setIsNavOpen(!collapsed)
}, [collapsed])
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Row gutter={[0, 0]} className='shadow-lg' justify='space-between'>
          <Col span={3} className='header-control'>
            <Button
              type='text'
              icon={isNavOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleNav}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
          </Col>
          <Col span={12}>
            <Row justify='end' gutter={[0, 0]}>
              <Col span={12} className='header-control pr-4'>
                <Input className='header-search' placeholder='Search...' prefix={<SearchOutlined />} />
              </Col>
              <Col flex='100px' className='header-control'>
                <Popover placement='bottomRight' title={text} content={content} trigger='click'>
                  <UserOutlined />
                  <span>Sign in</span>
                </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Row className='py-4 ml-4'>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to='/admin'>
                <HomeOutlined />
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item className='capitalize'>{pathName}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </>
  )
}

export default HeaderAdmin