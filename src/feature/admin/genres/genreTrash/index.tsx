import React, { useRef, useState } from 'react'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Switch, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface'
import { Link, useNavigate } from 'react-router-dom'
import { useForceSupplierMutation,useRestoreSupplierMutation } from '~/app/services/supplier'
import { useForceGenreMutation, useGetAllDeletedGenresQuery, useRestoreGenreMutation } from '~/app/services/genre'


interface DataType {
  key: string
  name: string
  description: string
}
type DataIndex = keyof DataType

const GenreTrash = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const navigate = useNavigate()
  const searchInput = useRef<InputRef>(null)
  const { data, isLoading, error } = useGetAllDeletedGenresQuery()
  const dataGenres = data?.genres
const [restoreGenre] = useRestoreGenreMutation()
const [forceGenre] = useForceGenreMutation()
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

  const handleRestoreGenre = async (id: any) => {
    try {
       const responsive = await restoreGenre(id).unwrap()
       if (responsive) {
        message.success('Khôi phục Thể loại sách!')
         navigate('/admin/genres')
      }
    } catch (error) {
      message.error('Error' + error)
    }
  }
  const handleForceGenre = async (id: any) => {
    try {
      const responsive = await forceGenre(id).unwrap()
      if (responsive) {
        message.success('Xóa vĩnh viễn Thể loại sách!')
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
      title: 'Tên thể loại',
      dataIndex: 'name',
      key: '1',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Chi tiết thể loại',
      dataIndex: 'description',
      key: '2'
    },
    {
      title: 'Action',
      key: '3',
      render: (record: any) => (
        <Space size='middle'>
          <Popconfirm
            title='Bạn có chắc muốn xóa vĩnh viễn'
            placement='topRight'
            onConfirm={() => handleForceGenre(record?._id)}
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
            onConfirm={() => handleRestoreGenre(record?._id)}
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
        to='/admin/genres/list'
        className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
      >
        Quay lại
      </Link>
      <h1 className='text-center py-5 font-medium text-[20px]'>Thể loại sách đã xóa mềm</h1>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={dataGenres}
        key={dataGenres?._id}
        loading={isLoading}
      />
    </div>
  )
}

export default GenreTrash
