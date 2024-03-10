import { Table, TableProps, Tabs } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useGetAllBillsQuery} from '~/app/services/bill'
import { formatDate } from '~/utils/format'
import { Sorter } from '~/utils/sorter'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import TableCustom from '~/components/ant/AntTable'

const ListOderAdmin = ({tabKey}: any) => {
   const [current, setCurrent] = useState<number>(1)
   const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const params = {
    page: current,
    limit: pageSize,
    bill_status: tabKey
  }
  const { data: dataBillsApi, isLoading, error } = useGetAllBillsQuery(params)
  const dataBills = dataBillsApi?.bills ?? null
  const columns: ColumnsType<any> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'bill_code'
    },
    {
      title: 'Tên khách hàng',
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
      title: 'Phương thức thanh toán',
      dataIndex: 'payment_method',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: 'Trạng thái đơn hàng',
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
      title: 'Thao tác',
      render: (record: any) => {
        return (
          <Link
            to={`/admin/orders/${record?._id}/update`}
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
  return (
    <div className='mb-5'>
      <TableCustom
        loading={isLoading}
        dataSource={dataBills}
        columns={columns}
        onChange={onChange}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: dataBills?.length || 0,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrent(page) // Cập nhật trạng thái trang hiện tại
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

export default ListOderAdmin
