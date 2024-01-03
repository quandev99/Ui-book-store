import { Outlet } from "react-router-dom";
const OderMain = () => {
    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">Danh sách đơn hàng</h1>
            </div>
            <Outlet />
        </div>
    )
}

export default OderMain