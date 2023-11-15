import  { useRef, useState } from 'react'

import { DeleteOutlined, LoadingOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Image, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface'
import { Link, useNavigate } from 'react-router-dom'

import { useForceAuthorMutation, useGetAllDeletedAuthorsQuery, useRestoreAuthorMutation } from '~/app/services/author'
import { useForceUserMutation, useGetAllDeletedUsersQuery, useRestoreUserMutation } from '~/app/services/user'

interface DataType {
  key: string
  name: string
  image: object
  founded: string
  address: string
  phone_number: string
}
type DataIndex = keyof DataType

const UserTrash = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const navigate = useNavigate()
  const searchInput = useRef<InputRef>(null)
  const { data: dataUserApi, isLoading, error } = useGetAllDeletedUsersQuery()
  const dataUsers = dataUserApi?.users
const [restoreUser] = useRestoreUserMutation()
const [forceUser] = useForceUserMutation()
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

  const handleRestore = async (id: any) => {
    try {
       const responsive = await restoreUser(id).unwrap()
       if (responsive) {
        message.success('Khôi phục tài khoản thành công!')
         navigate('/admin/users')
      }
    } catch (error) {
      message.error('Error' + error)
    }
  }
  const handleForce = async (id: any) => {
    try {
       const responsive = await forceUser(id).unwrap()
       if (responsive) {
         message.success('Xóa vĩnh viễn tài khoản!')
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
      title: 'Tên Tác Giả',
      dataIndex: 'name',
      key: '1',
      width: '20%',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: '2',
      width: '20%',
      render: (record: any) => {
        return <Image width={150} height={100} src={record?.url} />
      }
    },
    {
      title: 'Năm Sinh',
      dataIndex: 'birthdate',
      key: '3',
      width: '10%',
      render: (record: any) => {
        return <div>{record}</div>
      }
    },
    {
      title: 'Quốc Tịch',
      dataIndex: 'nationality',
      key: '4',
      sorter: (a, b) => a?.name.length - b?.name?.length,
      render: (record: any) => {
        return <div>{record}</div>
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
            onConfirm={() => handleForce(record._id)}
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
            onConfirm={() => handleRestore(record._id)}
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
        to='/admin/users/list'
        className='bg-green-500 px-2 py-2 text-2xl rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
      >
        <RedoOutlined />
      </Link>
      <h1 className='text-center py-5 font-medium text-[20px]'>Danh sách tài khoản đã xóa mềm</h1>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={dataUsers?.map((author: any) => ({
          ...author,
          key: author?._id
        }))}
        loading={isLoading}
      />
    </div>
  )
}

export default UserTrash
