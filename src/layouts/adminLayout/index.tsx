import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { Layout, theme, ConfigProvider } from 'antd'
import SideNavAmin from './SidenavAdmin'
import HeaderAdmin from './headerAdmin'
import type { ThemeConfig } from 'antd'
const {  Content, Footer, Sider } = Layout
const { getDesignToken, useToken, darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme

const config: ThemeConfig = {
  token: {
    colorPrimary: '#356bcf',
    colorInfo: '#a5da1b',
    colorBgContainer: '#ffffff', // Là màu của các box con
    colorBgLayout: '#f5f5f5', // Là màu của layout
    colorPrimaryText: '#a5da1b',
    colorPrimaryBg: '#e0e0e0', // Là màu bg khi mình active
    colorPrimaryBgHover: '#e0e0e0', // Là màu bg khi mình active
    colorLink: '#2646ff',

    // Color message
    colorWarning: '#faad14',
    colorSuccess: '#52c41a',
    colorError: "#fe4d4f",
    // end Color message
    // colorLinkHover: '#e7db08', // là màu text khi hover link
    // colorLinkActive: '#266f27', // Là màu bg khi hover link active.
    // colorFill: 'rgba(0, 0, 0, 0.15)', //Là màu bg khi mình active button
    // colorBorder: '#d9d9d9' // border color
    // colorBgBase: '#dd0000' // Là màu chữ toàn bộ site
    // colorTextBase: '#31bb1f' // Là màu toàn bộ site.
  },
  algorithm: [defaultAlgorithm],
  components: {
    Slider: {}
  }
}
// const globalToken = getDesignToken(config)
const LayoutAdmin = () => {
   const { pathname } = useLocation()
   const page = pathname?.replace('/', '')
   const [collapsed, setCollapsed] = useState(false)
    const {
      token: { colorBgContainer }
    } = theme.useToken()
  return (
    <div>
      <ConfigProvider theme={config}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme='light'
          >
            <SideNavAmin></SideNavAmin>
          </Sider>
          <Layout >
            <HeaderAdmin
              subName={page}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              
            ></HeaderAdmin>
            <Content style={{ margin: '0 16px', padding: 24, minHeight: 940, background: colorBgContainer }}>
              <Outlet></Outlet>
            </Content>
            <Footer>Quannvpd06465 ©2023 Created by FPT</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  )
}

export default LayoutAdmin
