import { TableProps} from 'antd'
import { ColumnsType } from 'antd/es/table'
import{  useState } from 'react'
import {  useGetBillByUserQuery } from '~/app/services/bill'
import { formatDate, formatPrice } from '~/utils/format'
import { Sorter } from '~/utils/sorter'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import TableCustom from '~/components/ant/AntTable'
import { getUserData } from '~/store/helper/getDataLocalStorage'

const ListOrderCustomer = ({ tabKey }: any) => {
  const { user } = getUserData()
  const userId = user?._id
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const params = {
    userId,
    page,
    limit,
    bill_status: tabKey
  }
  
  const { data: dataBillsApi, isLoading, error } = useGetBillByUserQuery(params)
  const dataBills = dataBillsApi?.bills ?? null
  const columns: ColumnsType<any> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'bill_code'
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      },
      render: (record: any) => {
        return <div>{formatDate(record)}</div>
      }
    },
    {
      title: 'Người nhận',
      dataIndex: 'bill_user_name'
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'bill_details',
      render: (record: any) => {
        return <div>{record?.length}</div>
      },
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'bill_totals',
      render: (record: any) => {
        const priceBill = record.find((item) => item?.code === 'grand_total')?.price
        return <div className='font-medium text-primary'>{formatPrice(priceBill)}</div>
      },
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'bill_status',
      render: (bill_status: any) => {
        return (
          <div
            className={`text-white  font-semibold text-center rounded-md ${
              bill_status == 'Abort' ? ' bg-primary px-4 py-2' : ' bg-blue-400 px-4 py-2'
            }`}
          >
            {bill_status}
          </div>
        )
      }
    },
    {
      title: 'Thao tác',
      render: (record: any) => {
        return (
          <Link
            to={`/customer/order/${record?._id}/update`}
            className='text-white px-1 py-1 block bg-green-500 rounded-md text-center'
          >
            <EditOutlined />
          </Link>
        )
      }
    }
  ]
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
    setPage(pagination.current) 
    setLimit(pagination.pageSize)
  }
  if (error) {
    if ('data' in error) {
      if (error.data) {
        const errorWithMessage = error as { data: { message: string } }
        return (
          <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>
            Error: {errorWithMessage?.data?.message}
          </div>
        )
      }
    } else {
      // Xử lý trường hợp `error` không có thuộc tính 'data' ở đây
      return <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: Error connect server</div>
    }
  }
  const totalItems = dataBillsApi?.pagination?.totalItems ?? null;
  return (
    <>
      <TableCustom
        loading={isLoading}
        dataSource={dataBills}
        columns={columns}
        onChange={onChange}
        pagination={{
          current: page,
          pageSize: limit,
          total: totalItems,
          showSizeChanger: true,
          onChange: (page, size) => {
            setPage(size) 
            setLimit(page) 
          },
          onShowSizeChange: (current, size) => {
            setPage(size) 
            setLimit(current)
          }
        }}
      />
    </>
  )
}

export default ListOrderCustomer
