import React, { useRef, useState } from 'react'
import { useForceCategoryMutation, useGetAllDeletedCategoriesQuery, useRestoreCategoryMutation } from '~/app/services/category'
import { DeleteOutlined, EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Switch, Image, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, FilterValue, TableRowSelection } from 'antd/es/table/interface'
import { Link, useNavigate } from 'react-router-dom'
import { TablePaginationConfig } from 'antd/lib'

interface DataType {
  key: string
  name: string
  image: object
  parent: string
  subcategories: string
  active: boolean
}
type DataIndex = keyof DataType

const CategoryTrash = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const navigate = useNavigate()
  const searchInput = useRef<InputRef>(null)
  const { data, isLoading, error } = useGetAllDeletedCategoriesQuery()
  const dataCategories = data?.categories
const [restoreCategory] = useRestoreCategoryMutation()
const [forceCategory] = useForceCategoryMutation()
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const handleRestoreCategory = async (categoryId: any) => {
    try {
       const responsive = await restoreCategory(categoryId).unwrap()
       if (responsive) {
        message.success('Khôi phục danh mục!')
         navigate('/admin/categories')
      }
    } catch (error) {
      message.error('Error' + error)
    }
  }
  const handleForceCategory = async (categoryId: any) => {
    try {
       const responsive = await forceCategory(categoryId).unwrap()
       if (responsive) {
         message.success('Xóa vĩnh viễn danh mục!')
       }
    } catch (error) {
      message.error('Error' + error)
    }
  }
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: '1',
      width: '20%',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Ảnh danh mục',
      dataIndex: 'image',
      key: '2',
      width: '20%',
      render: (record: any) => {
        return <Image width={150} height={100} src={record?.url} />
      }
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'parent',
      key: '3',
      sorter: (a, b) => a?.name.length - b?.name?.length,
      render: (record: any) => {
        return <div>{record?.name == null ? 'Danh mục chính' : record?.name || 'chưa có'}</div>
      }
    },
    {
      title: 'Danh mục con',
      dataIndex: 'subcategories',
      key: '4',
      sorter: (a, b) => a?.name.length - b?.name?.length,
      render: (record: any) => {
        return <p>{record?.map((item: object) => item?.name) || 'Chưa có'}</p>
      }
    },

    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: '4',
      render: (record: any) => {
        return <Switch checked={record} />
      }
    },
    {
      title: 'Action',
      key: '5',
      render: (record: any) => (
        <Space size='middle'>
          <Popconfirm
            title='Bạn có chắc muốn xóa vĩnh viễn'
            placement='topRight'
            onConfirm={() => handleForceCategory(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Popconfirm
            title='Bạn có muốn khôi phục'
            placement='topRight'
            onConfirm={() => handleRestoreCategory(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

 
  if (error) {
    if ('data' in error) {
      if (error.data) {
        const errorWithMessage = error as { data: { message: string } }
        return (
          <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: {errorWithMessage.data.message}</div>
        )
      }
    } else {
      // Xử lý trường hợp `error` không có thuộc tính 'data' ở đây
      return <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: Error connect server</div>
    }
  }
/// 

const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
  return (
    <div>
      <Link
        to='/admin/categories/list'
        className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
      >
        Quay lại
      </Link>
      <h1 className='text-center py-5 font-medium text-[20px]'>Danh mục đã xóa mềm</h1>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={dataCategories?.map((brand: any) => ({
          ...brand,
          key: brand?._id
        }))}
        loading={isLoading}
      />
    </div>
  )
}

export default CategoryTrash
