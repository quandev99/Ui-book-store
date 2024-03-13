import React from 'react'
import { EditOutlined } from '@ant-design/icons'
import TableCustom from '~/components/ant/AntTable'
import { ColumnsType } from 'antd/es/table'
import { useGetAllReviewsQuery, useHiddenReviewMutation } from '~/app/services/review'
import { formatDate } from '~/utils/format'
import { Sorter } from '~/utils/sorter'
import { Image, Rate, Switch, message } from 'antd'

const ListReviews = () => {
   const [current, setCurrent] = React.useState<number>(1)
   const [pageSize, setPageSize] = React.useState<number>(3)
  const dataQuery = {
    search : '',
    page : current,
    limit : pageSize,
    sort : 'createdAt',
    order : 'asc'
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

    const columns: ColumnsType<any> = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'user_name'
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
        title: 'Thao tác',
        render: (record: any) => {
          return (
            <div className='text-white px-1 py-1 block bg-green-500 rounded-md text-center'>
              <EditOutlined />
            </div>
          )
        }
      }
    ]
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