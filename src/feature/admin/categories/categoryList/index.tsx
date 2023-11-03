import React, { useRef, useState } from 'react'
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '~/app/services/category'
import { DeleteOutlined, EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Switch, Image, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, FilterValue, TableRowSelection } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import { TablePaginationConfig } from 'antd/lib'
import Highlighter from 'react-highlight-words'

interface DataType {
  key: string
  name: string
  image: object
  parent: string
  // subcategories: string
  active: boolean
  subcategories?: DataType[]
}
type DataIndex = keyof DataType


const CategoryList = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
 const [deleteCategory] = useDeleteCategoryMutation()
  const { data: data, isLoading, error } = useGetAllCategoriesQuery()
  const categories = data?.data

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

  const handleDeleteCategory = async (categoryId:any) => {
    try {
      const responsive = await deleteCategory(categoryId).unwrap()
      if (responsive) {
        message.success('Xóa danh mục thành công!')
      }
    } catch (error) {
      const errorWithMessage = error as { data: { message: string } }
      message.error('Error: ' + errorWithMessage?.data?.message)
    }
  }
  const onChange =async (checked: boolean) => {
    console.log(`switch to ${checked}`)
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
const toggleExpand = (record:any) => {
  console.log("toggleExpand", record);
}
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
        if (record?.length > 0) {
          return (
            <Button
              type='link'
              onClick={() => {
                toggleExpand(record)
              }}
              style={{ paddingLeft: 0 }}
            >
              <p className='text-black font-medium'>{record?.length} danh mục con</p>
              <p>{record?.map((item: object) => item?.name).join(', ') || 'Chưa có'}</p>
            </Button>
          )
        } else {
          return 'Chưa có'
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: '4',
      render: (record: any) => {
        return <Switch checked={record} onChange={onChange} />
      }
    },
    {
      title: 'Action',
      key: '5',
      render: (record: any) => (
        <Space size='middle'>
          <Link to={`/admin/categories/${record._id}/update`} className='bg-sky-400 text-white px-4 py-2 rounded-md '>
            <EditOutlined />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Delete the category'
            description='Are you sure to delete this category?'
            onConfirm={() => handleDeleteCategory(record._id)}
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
      <div>
        <Link
          to='/admin/categories/create'
          className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
        >
          Thêm mới
        </Link>
        <h1 className='text-center py-5 font-medium text-[20px]'>Quản lý danh mục</h1>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        rowSelection={{ ...rowSelection }}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              rowSelection={{ ...rowSelection }}
              columns={columns} // You can define columns for subcategories here
              dataSource={record.subcategories} // Subcategories data
              pagination={false} // Optional: Hide pagination for subcategories
            />
          ),
          rowExpandable: (record: any) => record?.subcategories?.length > 0
        }}
        loading={isLoading}
      />
      <div className='text-red-500'>
        <Link to={'/admin/categories/trash'} className='text-2xl p-2 bg-slate-200 rounded-md'>
          <DeleteOutlined />
        </Link>
      </div>
    </div>
  )
}

export default CategoryList