import { Table, TableProps, Tabs } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useGetAllBillsQuery } from '~/app/services/bill'

const ListOderItem = ({tabKey}) => {
  const [url, setUrl] = useState(tabKey)
 const { data: dataBillsApi, isLoading, error } = useGetAllBillsQuery(url)
 console.log('tabKey', tabKey)
  useEffect(() => {
    setUrl(`?_page=${1}&_limit=${10}&_sort=createdAt&bill_status=${url}`)
  }, [dataBillsApi])
  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'bill_user_name'
    },
    {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'bill_shipping_Address',
      sorter: {
        compare: (a, b) => a. bill_shipping_Address - b. bill_shipping_Address,
        multiple: 2
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'bill_phoneNumber',
      sorter: {
        compare: (a, b) => a.bill_phoneNumber - b.bill_phoneNumber,
        multiple: 1
      }
    }
  ]
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <div className='mb-5'>
      <Table columns={columns} dataSource={dataBillsApi?.bills} onChange={onChange} />
    </div>
  )
}

export default ListOderItem
