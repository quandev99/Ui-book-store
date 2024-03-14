import React from 'react'
import Highlighter from 'react-highlight-words'
import { EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import TableCustom from '~/components/ant/AntTable'
import { useGetAllReviewsQuery, useHiddenReviewMutation } from '~/app/services/review'
import { formatDate } from '~/utils/format'
import { Sorter } from '~/utils/sorter'
import { Button, Image, Input, InputRef, Rate, Space, Switch, message } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
interface DataType {
  key: string
  title: string
  comment: string
  user_name: string
  author_id: { name: string }
  active: boolean
}
type DataIndex = keyof DataType
const ListReviews = () => {
   const [current, setCurrent] = React.useState<number>(1)
   const [pageSize, setPageSize] = React.useState<number>(3)
    const [searchText, setSearchText] = React.useState('')
    const [searchedColumn, setSearchedColumn] = React.useState('')
    const searchInput = React.useRef<InputRef>(null)
  const dataQuery = {
    search: searchText,
    page: current,
    limit: pageSize,
    sort: 'createdAt',
    order: 'asc'
  }
  const { data: dataReviewsApi, isLoading} = useGetAllReviewsQuery(dataQuery)
  const [hiddenReview] = useHiddenReviewMutation()
  const [loadingStates, setLoadingStates] = React.useState<{ [key: string]: boolean }>({})
const [messageApi, contextHolder] = message.useMessage()
  const onChange = async (_id: string) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [_id]: true
    }))
    try {
      const result = await hiddenReview(_id).unwrap()
      if (result?.review) {
        messageApi.open({ type: 'success', content: 'Cập nhật trạng thái đánh giá thành công!' })
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [_id]: false
      }))
    }
  }
  const dataReviews = dataReviewsApi?.reviews ?? null
  const totalItems = dataReviewsApi?.pagination.totalItems ?? null
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
        return record[dataIndex].toString().toLowerCase().includes(text)
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
    const columns: ColumnsType<any> = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'user_name',
        ...getColumnSearchProps('user_name'),
        sorter: {
          compare: Sorter.DEFAULT
        }
      },
      {
        title: 'Số sao',
        dataIndex: 'rating_start',
        render: (record: any) => {
          return (
            <div>
              <Rate disabled value={record} />
            </div>
          )
        },
        sorter: {
          compare: Sorter.DEFAULT
        }
      },
      {
        title: 'Nhận xét',
        dataIndex: 'comment',
        ...getColumnSearchProps('comment'),
        render: (record: any) => {
          return <p>{record}</p>
        }
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'product_id',
        width: '20%',
        render: ({ name, image }) => {
          const firstImage = image[0]?.url
          return (
            <div className='text-center'>
              <h5 className='font-medium mb-2'>{name}</h5>
              <Image width={100} height={100} src={firstImage} />
            </div>
          )
        },
        sorter: {
          compare: Sorter.DEFAULT,
          multiple: 3
        }
      },
      {
        title: 'Trạng thái bình luận',
        render: ({ _id, active }: any) => {
          return (
            <div>
              <Switch
                className={`text-white font-semibold text-center shadow-md`}
                checkedChildren='Ẩn'
                unCheckedChildren=''
                checked={active}
                loading={loadingStates[_id]}
                onChange={() => onChange(_id)}
              />
            </div>
          )
        }
      },
      {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        sorter: {
          compare: Sorter.DATE,
          multiple: 2
        },
        render: (record: any) => {
          return <div>{formatDate(record)}</div>
        }
      },
      {
        title: 'Xem',
        render: (record: any) => {
          return (
            <div className='text-white px-1 py-1 block bg-green-500 rounded-md text-center'>
              <EditOutlined />
            </div>
          )
        }
      }
    ]

    // Search 
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
    
  return (
    <div>
      {contextHolder}
      <TableCustom
        loading={isLoading}
        dataSource={dataReviews}
        columns={columns}
        key={dataReviews?._id}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: totalItems || 0,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrent(page) // Cập nhật trạng thái trang hiện tại
            setPageSize(size)
          },
          onShowSizeChange: (current, size) => {
            setCurrent(current) // Cập nhật trạng thái trang hiện tại
            setPageSize(size) // Cập nhật trạng thái số lượng dòng trên mỗi trang
          }
        }}
      />
    </div>
  )
}

export default ListReviews