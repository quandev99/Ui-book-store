import { Table, TableProps, Tabs } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useGetAllBillsQuery, useUpdateBillStatusMutation } from '~/app/services/bill'
import { formatDate } from '~/utils/format'
import { Sorter } from '~/utils/sorter'
import TableCustom from './orderList/asss'
import { EditOutlined } from '@ant-design/icons'

const ListOderItem = ({tabKey}: any) => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const params = {
    page, limit, bill_status:tabKey
  }
  const [updateBillStatus] = useUpdateBillStatusMutation()
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
          <div onClick={() => handlerUpdateBillStatus(record?._id)} className='text-white px-1 py-1 bg-green-500 rounded-md text-center'>
            <EditOutlined />
          </div>
        )
      }
    }
  ]
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const handlerUpdateBillStatus = async (id) => {
    const data = {
      id,
      newStatus: 'Confirmed'
    }
    const result = await updateBillStatus(data).unwrap();
    console.log(result);
  }
  return (
    <div className='mb-5'>
      <TableCustom loading={isLoading} dataSource={dataBills} columns={columns} onChange={onChange} />
    </div>
  )
}

export default ListOderItem
