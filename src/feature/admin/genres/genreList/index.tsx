import React, { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table, Switch, Popconfirm, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { useDeleteGenreMutation, useGetAllGenresQuery } from '~/app/services/genre'

interface DataType {
  key: string
  name: string
  description: string
}
type DataIndex = keyof DataType


const GenreList = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const { data, isLoading, error } = useGetAllGenresQuery()
  const dataGenres = data?.genres
 const [deleteGenre] = useDeleteGenreMutation()

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

  const handleDeleteGenre = async (id:any) => {
    try {
      const responsive = await deleteGenre(id).unwrap()
      if (responsive) {
        message.success('Xóa thể loại thành công!')
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
        <Space size='middle' key={record?._id}>
          <Link to={`/admin/genres/${record?._id}/update`} className='bg-sky-400 text-white px-4 py-2 rounded-md '>
            <EditOutlined />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Delete the genres'
            description='Are you sure to delete this genres?'
            onConfirm={() => handleDeleteGenre(record?._id)}
            okText='Yes'
            cancelText='No'
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
          to='/admin/genres/create'
          className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
        >
          Thêm mới
        </Link>
        <h1 className='text-center py-5 font-medium text-[20px]'>Quản lý thể loại sách</h1>
      </div>
      <Table
        columns={columns}
        dataSource={dataGenres}
        rowSelection={{ ...rowSelection }}
        loading={isLoading}
        key={dataGenres?._id}
      />
      <div className='text-red-500'>
        <Link to={'/admin/genres/trash'} className='text-2xl p-2 bg-slate-200 rounded-md'>
          <DeleteOutlined />
        </Link>
      </div>
    </div>
  )
}

export default GenreList