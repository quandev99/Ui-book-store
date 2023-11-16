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
  BlockOutlined,
  FolderOpenOutlined,
  ShoppingCartOutlined
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
  getItem(<NavLink to='/admin/products'>Product</NavLink>, 'sub1', <FolderOpenOutlined />, [
    getItem(<NavLink to='/admin/products/list'>List Product</NavLink>, '2', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/products/create'>Create Product</NavLink>, '3', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/categories'>Category</NavLink>, 'sub2', <DatabaseOutlined />, [
    getItem(<NavLink to='/admin/categories/list'>List Category</NavLink>, '4', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/categories/create'>Create Category</NavLink>, '5', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/publishers'>Publisher</NavLink>, 'sub3', <ClusterOutlined />, [
    getItem(<NavLink to='/admin/publishers/list'>List Publisher</NavLink>, '6', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/publishers/create'>Create Publisher</NavLink>, '7', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/authors'>Author</NavLink>, 'sub4', <SolutionOutlined />, [
    getItem(<NavLink to='/admin/authors/list'>List Author</NavLink>, '8', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/authors/create'>Create Author</NavLink>, '9', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/suppliers'>Supplier</NavLink>, 'sub5', <ReadOutlined />, [
    getItem(<NavLink to='/admin/suppliers/list'>List Supplier</NavLink>, '10', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/suppliers/create'>Create Supplier</NavLink>, '11', <PlusOutlined />)
  ]),
  getItem(<NavLink to='/admin/genres'>Genre</NavLink>, 'sub6', <BlockOutlined />, [
    getItem(<NavLink to='/admin/genres/list'>List Genre</NavLink>, '12', <UnorderedListOutlined />),
    getItem(<NavLink to='/admin/genres/create'>Create Genre</NavLink>, '13', <PlusOutlined />)
  ]),
  getItem('User', 'sub7', <UserOutlined />, [
    getItem(<NavLink to='/admin/users/list'>List User</NavLink>, '19', <TeamOutlined />),
    getItem(<NavLink to='/admin/users/create'>Create User</NavLink>, '21', <UserAddOutlined />)
  ]),
  getItem('Order', 'sub8', <ShoppingCartOutlined />, [
    getItem(<NavLink to='/admin/orders/list'>List Order</NavLink>, '22', <ShoppingCartOutlined />)
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
