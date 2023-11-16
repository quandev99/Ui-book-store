import { Link, Outlet } from "react-router-dom";
const dataList = [
  {value:"Pending"},
  {value:"Pending"},
  {value:"Pending"},
  {value:"Pending"},
  {value:"Pending"},
]
const OderMain = () => {
    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">Danh sách đơn hàng</h1>
            </div>

            <div className="text-sm font-medium text-center bg-white mb-5 text-gray-500 shadow-sm border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex justify-between">
                    <li className="w-full">
                        <Link
                            to={`/admin/oders`}
                            className=" block p-4 focus:border-red-500 hover:border-red-500 border-b-2 border-transparent rounded-t-lg hover:text-gray-600  dark:hover:text-gray-300">
                            Tất cả</Link>
                    </li>
                    {dataList?.map((item: any, index: any) => {
                        return (
                          <li className='w-full' key={index}>
                            <Link
                              to={`/admin/oders/${item.value}/status`}
                              className='block focus:border-red-500 p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-red-500 dark:hover:text-gray-300'
                            >
                              {item.value}
                            </Link>
                          </li>
                        )
                    })}
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default OderMain