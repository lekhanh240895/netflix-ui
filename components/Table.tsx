import React, { useState } from 'react';
import { Product } from '../typings';

interface Props {
    products: Product[];
}
function Table({ products }: Props) {
    return (
        <table className="w-full">
            <tbody className="divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Giá hàng tháng</td>
                    {products.map((product) => (
                        <td className="tableDataFeature" key={product.id}>
                            <span className="mr-1">{product.price}</span>
                            <span className="underline underline-offset-2">
                                đ
                            </span>
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Chất lượng video</td>
                    {products.map((product) => (
                        <td className="tableDataFeature" key={product.id}>
                            {product.quality}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Độ phân giải</td>
                    {products.map((product) => (
                        <td className="tableDataFeature" key={product.id}>
                            {product.resolution}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">
                        Các thiết bị bạn có thể dùng để xem
                    </td>
                    {products.map((product) => (
                        <td className="tableDataFeature" key={product.id}>
                            {product.devices.map((device, index) => (
                                <span
                                    className="tableDataFeatureDevice"
                                    key={index}
                                >
                                    {device.icon}
                                    <span>{device.name}</span>
                                </span>
                            ))}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
