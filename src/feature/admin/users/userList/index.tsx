import  { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Switch, Image, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { useDeleteAuthorMutation  } from '~/app/services/author'
import { useDeleteUserMutation, useGetAllUsersQuery } from '~/app/services/user'
import { Modal } from 'antd/lib'

interface DataType {
  key: string
  name: string
  image: object
  email: string
  role: number
  active: boolean
  verify: boolean
}
type DataIndex = keyof DataType


const UserList = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const { data: userApi, isLoading, error } = useGetAllUsersQuery()
  const dataUsers = userApi?.users

  // Modal
  /// modal
  // State variable for selected name details
  const [selectedNameDetails, setSelectedNameDetails] = useState(null)
  // State variable to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleNameClick = (name: any) => {
    // Find the details of the clicked name from the dataUsers
    const details = dataUsers?.find((item: any) => item.name === name)
    setSelectedNameDetails(details)
    setIsModalVisible(true)
  }
    const handleModalClose = () => {
      setIsModalVisible(false)
    }
  // end Modal
  const [deleteUser] = useDeleteUserMutation()
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

  const handleDelete = async (id: any) => {
    try {
      const responsive = await deleteUser(id).unwrap()
      if (responsive) {
        message.success('Xóa người dùng thành công!')
      }
    } catch (error) {
      const errorWithMessage = error as { data: { message: string } }
      message.error('Error: ' + errorWithMessage?.data?.message)
    }
  }
  const onChange = async (checked: boolean) => {
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
  const toggleExpand = (record: any) => {
    console.log('toggleExpand', record)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên tài khoản',
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
      width: '15%',
      render: (record: any) => {
        return <Image width={100} height={100} src={record?.url} />
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '3',
      width: '10%',
      render: (record: any) => {
        return <div>{record}</div>
      }
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: '4',
      sorter: (a, b) => a?.name.length - b?.name?.length,
      render: (record: any) => {
        return (
          <div
            className={`${
              record == 0 ? `${'text-white bg-green-400'}` : 'bg-blue-400 text-white'
            } text-center py-2 rounded-md shadow-md`}
          >
            {record == 0 ? 'admin' : 'user'}
          </div>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: '5',
      render: (record: any) => {
        return <Switch checked={record} onChange={onChange} />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size='middle' key={record?._id}>
          <Button className='bg-green-400 text-white' onClick={() => handleNameClick(record?.name)}>
            <EyeOutlined />
          </Button>
          <Link to={`/admin/users/${record?._id}/update`} className='bg-sky-400 text-white px-4 py-2 rounded-md '>
            <EditOutlined />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Delete the users'
            description='Are you sure to delete this users?'
            onConfirm={() => handleDelete(record?._id)}
            okText='Yes'
            cancelText='No'
            key={record?._id}
          >
            <Button danger key={record?._id}>
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
          to='/admin/authors/create'
          className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
        >
          <PlusOutlined />
        </Link>
        <h1 className='text-center py-5 font-medium text-[20px]'>Quản lý tài khoản</h1>
      </div>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowSelection={{ ...rowSelection }}
        loading={isLoading}
        key={dataUsers?._id}
      />
      <Modal title='Chi tiết cuốn sách' visible={isModalVisible} onCancel={handleModalClose} footer={null}>
        {selectedNameDetails && (
          <div>
            <p>Tên: {selectedNameDetails?.name}</p>
            <p>Tài khoản: {selectedNameDetails?.email}</p>
            <p>Giới tính: {selectedNameDetails?.gender === 'male' ? 'Nam' : 'Nữ'}</p>
            <p>Quyền: {selectedNameDetails?.role == 0 ? 'admin' : 'user'}</p>
            <p>Trạng thái: {selectedNameDetails?.active ? 'kích hoạt' : 'chưa kích hoạt'}</p>
            <p>Xác thực: {selectedNameDetails?.verify ? 'xác thực' : 'chưa xác thực'}</p>
          </div>
        )}
      </Modal>
      <div className='text-red-500'>
        <Link to={'/admin/users/trash'} className='text-2xl p-2 bg-slate-200 rounded-md'>
          <DeleteOutlined />
        </Link>
      </div>
    </div>
  )
}

export default UserList