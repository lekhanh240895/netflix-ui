import React from 'react';

function Table() {
    return (
        <table className="w-full">
            <tbody className="w-full divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Giá hàng tháng</td>
                    <td className="tableDataFeature">70.000 ₫</td>
                    <td className="tableDataFeature">180.000 ₫</td>
                    <td className="tableDataFeature">220.000 ₫</td>
                    <td className="tableDataFeature">260.000 ₫</td>
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Chất lượng video</td>
                    <td className="tableDataFeature">Tốt</td>
                    <td className="tableDataFeature">Tốt</td>
                    <td className="tableDataFeature">Tốt nhất</td>
                    <td className="tableDataFeature">260.000 ₫</td>
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Độ phân giải</td>
                    <td className="tableDataFeature">480p</td>
                    <td className="tableDataFeature">720p</td>
                    <td className="tableDataFeature">1080p</td>
                    <td className="tableDataFeature">4K+HDR</td>
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">
                        Các thiết bị bạn có thể dùng để xem
                    </td>
                    <td className="tableDataFeature">Điện thoại</td>
                    <td className="tableDataFeature">Máy tính bảng</td>
                    <td className="tableDataFeature">Máy tính</td>
                    <td className="tableDataFeature">TV</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
