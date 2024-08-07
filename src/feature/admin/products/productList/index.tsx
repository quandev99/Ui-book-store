import React from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button, Input, Space, Switch, Image, Popconfirm, message, Modal, Select, Checkbox } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps, FilterValue, TableRowSelection } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { useDeleteAuthorMutation } from '~/app/services/author'
import { useGetAllProductsQuery } from '~/app/services/product'
import TableCustom from '~/components/ant/AntTable'
import { Sorter } from '~/utils/sorter'

interface DataType {
  key: string
  title: string
  name: string
  author_id: {name: string}
  image: object
  price: number
  quantity: number
  publishing_year: string
  active: boolean
}
type DataIndex = keyof DataType

const { Option } = Select
const ProductList = () => {
  const [current, setCurrent] = React.useState<number>(1)
  const [pageSize, setPageSize] = React.useState<number>(5)
  const [searchText, setSearchText] = React.useState('')
  const [searchedColumn, setSearchedColumn] = React.useState('')
  const searchInput = React.useRef<InputRef>(null)
  const dataQuery = {
      category_id:  '',
      supplier_id : '',
      publisher_id : '',
      author_id : '',
      genre_id : '',
      search: searchText ,
      page: current,
      limit: pageSize,
      sort: 'createdAt',
      order: 'asc'
  }
  const { data: productsApi, isLoading, error } = useGetAllProductsQuery(dataQuery)
  console.log('Product - error', error)
  const dataProducts = productsApi?.products ?? null
  const totalItems = productsApi?.pagination?.totalItems ?? null
  const [deleteAuthor] = useDeleteAuthorMutation()

  /// modal
  // State variable for selected name details
  const [selectedNameDetails, setSelectedNameDetails] = React.useState(null)
  // State variable to control modal visibility
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const handleNameClick = (name: any) => {
    // Find the details of the clicked name from the dataProducts
    const details = dataProducts?.find((item: any) => item.name === name)
    setSelectedNameDetails(details)
    setIsModalVisible(true)
  }
  const handlePageSizeChange = (value: any) => {
    setPageSize(value)
  }
  const handleModalClose = () => {
    setIsModalVisible(false)
  }
  // end modal

  const handleSearch =  (
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

  const handleDeleteAuthor = async (id: any) => {
    try {
      const responsive = await deleteAuthor(id).unwrap()
      if (responsive) {
        message.success('Xóa tác giả thành công!')
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
            style={{ width: 90, backgroundColor: 'tomato' }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90, backgroundColor: 'tomato' }}
          >
            Xóa
          </Button>
          <Button
            type='link'
            size='small'
            icon={<FilterOutlined />}
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Lọc
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      const text = value?.toString().toLowerCase()
      if (
        dataIndex === 'author_id'
        ) {
        return record[dataIndex]?.name?.toString().toLowerCase().includes(text)
      } else {
        return record[dataIndex].toString().toLowerCase().includes(text)
      }
    },
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
          textToHighlight={text ? text?.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      key: '1',
      title: 'Tên sách',
      width: '20%',
      ...getColumnSearchProps('name'),
      render: ({ name, image }) => {
        const firstImage = image[0]?.url
        return (
          <div className='text-center'>
            <h5 className=' mb-2'>{name}</h5>
            <Image width={100} height={80} src={firstImage} />
          </div>
        )
      }
    },
    {
      key: '2',
      title: 'Tên Tác Giả',
      dataIndex: 'author_id',
      width: '20%',
      ...getColumnSearchProps('author_id'),
      render: (name: any) => {
        return <div>{name.name}</div>
      },
      sorter: {
        compare: Sorter.TEXT
      }
    },

    {
      key: '3',
      title: 'Giá',
      dataIndex: 'price',
      width: '10%',
      sorter: {
        compare: Sorter.DEFAULT
      },
      render: (record: any) => {
        return <div>{record}</div>
      }
    },
    {
      key: '4',
      title: 'Số lượng',
      dataIndex: 'quantity',
      sorter: {
        compare: Sorter.DEFAULT
      },
      render: (record: any) => {
        return <div>{record}</div>
      }
    },
    {
      key: '5',
      title: 'Năm XB',
      dataIndex: 'publishing_year',
      sorter: {
        compare: Sorter.DEFAULT
      },
      render: (record: any) => {
        return <div>{record}</div>
      }
    },
    {
      key: '6',
      title: 'Trạng thái',
      dataIndex: 'active',
      render: (record: any) => {
        return <Switch checked={record} onChange={onChange} />
      }
    },
    {
      key: '7',
      title: 'Action',
      render: (record: any) => (
        <Space size='middle' key={record?._id}>
          <Button className='bg-green-400 text-white' onClick={() => handleNameClick(record?.name)}>
            <EyeOutlined />
          </Button>
          <Link to={`/admin/products/${record?._id}/update`} className='bg-sky-400 text-white px-4 py-2 rounded-md '>
            <EditOutlined />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Delete the products'
            description='Are you sure to delete this products?'
            onConfirm={() => handleDeleteAuthor(record?._id)}
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

  /// selectedColumns
  const [selectedColumns, setSelectedColumns] = React.useState(columns.map((column) => column.key)) // Danh sách cột mặc định

  const handleColumnCheckboxChange = (checkedColumns:any) => {
    setSelectedColumns(checkedColumns)
  }
  const selectedColumnsConfig = columns.filter((column) => selectedColumns.includes(column?.key))

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
          to='/admin/products/create'
          className='bg-green-500 px-2 py-2 rounded-sm mr-auto absolute right-10 text-white hover:bg-green-600 transition-all duration-200'
        >
          <PlusOutlined />
        </Link>
        <h1 className='text-center py-5 font-medium text-[20px]'>Quản lý sách</h1>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Show Columns:</span>
        {columns.map((column: any) => (
          <Checkbox
            key={column.key}
            checked={selectedColumns.includes(column.key)}
            onChange={(e) => {
              const checkedColumns = e.target.checked
                ? [...selectedColumns, column.key]
                : selectedColumns.filter((key) => key !== column.key)
              handleColumnCheckboxChange(checkedColumns)
            }}
          >
            {column?.title}
          </Checkbox>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <span style={{ marginRight: 8 }}>Show Records:</span>
        <Select defaultValue={pageSize} onChange={handlePageSizeChange} style={{ width: 100 }}>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={30}>30</Option>
        </Select>
      </div>
      <TableCustom
        dataSource={dataProducts}
        columns={selectedColumnsConfig}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: totalItems || 0,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrent(page)
            setPageSize(size)
          },
          onShowSizeChange: (current, size) => {
            setCurrent(current)
            setPageSize(size)
          }
        }}
        rowSelection={{ ...rowSelection }}
        loading={isLoading}
        key={dataProducts?._id}
      />
      <Modal title='Chi tiết cuốn sách' visible={isModalVisible} onCancel={handleModalClose} footer={null} width={850}>
        {selectedNameDetails && (
          <div>
            <p>Tên: {selectedNameDetails?.name}</p>
            <p>Tác giả: {selectedNameDetails?.author_id?.name}</p>
            <p>Năm XB: {selectedNameDetails?.publishing_year}</p>
            <p>Danh mục: {selectedNameDetails?.category_id?.name}</p>
            <p>Nhà Xuất Bản: {selectedNameDetails?.publisher_id?.name}</p>
            <p>Nhà cung cấp: {selectedNameDetails?.supplier_id?.name}</p>
            <p>Kiểu sách: {selectedNameDetails?.genre_id?.name}</p>
            <p>Giá: {selectedNameDetails?.price} Vnd</p>
            <p>Số lượng: {selectedNameDetails?.quantity} cuốn</p>
            <p>Slug: {selectedNameDetails?.slug}</p>
            <p>Chi tiết: {selectedNameDetails?.description}</p>
          </div>
        )}
      </Modal>
      <div className='text-red-500'>
        <Link to={'/admin/products/trash'} className='text-2xl p-2 bg-slate-200 rounded-md'>
          <DeleteOutlined />
        </Link>
      </div>
    </div>
  )
}

export default ProductList