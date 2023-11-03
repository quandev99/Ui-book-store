import React from 'react'
import {
  UserAddOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DatabaseOutlined,
  ClusterOutlined,
  SolutionOutlined,
  ReadOutlined,
  BlockOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {   Menu } from 'antd'
import { NavLink } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<NavLink to='/admin/dashboard'>DashBoar</NavLink>, '1', <PieChartOutlined />),
  getItem(<NavLink to='/admin/categories'>Category</NavLink>, 'sub1', <DatabaseOutlined />, [
    getItem(<NavLink to='/admin/categories/list'>List Category</NavLink>, '3', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/categories/create'>Create Category</NavLink>, '4', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/publishers'>Publisher</NavLink>, 'sub2', <ClusterOutlined />, [
    getItem(<NavLink to='/admin/publishers/list'>List Publisher</NavLink>, '5', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/publishers/create'>Create Publisher</NavLink>, '6', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/authors'>Author</NavLink>, 'sub3', <SolutionOutlined />, [
    getItem(<NavLink to='/admin/authors/list'>List Author</NavLink>, '7', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/authors/create'>Create Author</NavLink>, '8', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/suppliers'>Supplier</NavLink>, 'sub4', <ReadOutlined />, [
    getItem(<NavLink to='/admin/suppliers/list'>List Supplier</NavLink>, '9', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/suppliers/create'>Create Supplier</NavLink>, '10', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/genres'>Genre</NavLink>, 'sub5', <BlockOutlined />, [
    getItem(<NavLink to='/admin/genres/list'>List Genre</NavLink>, '11', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/genres/create'>Create Genre</NavLink>, '12', <PlusOutlined />)
  ]),
  getItem('User', 'sub5', <UserOutlined />, [
    getItem(<NavLink to='/admin'>List User</NavLink>, '19', <TeamOutlined />),
    getItem(<NavLink to='/admin'>Create User</NavLink>, '110', <UserAddOutlined />)
  ]),
  getItem('Files', '111', <FileOutlined />)
]
const SideNavAmin = () => {
  return (
    <>
        <div className='demo-logo-vertical' />
        <Menu 
        theme='light' 
        defaultSelectedKeys={['1']}
         mode='inline'
          items={items}  />
    </>
  )
}

export default SideNavAmin
