import { Dispatch, SetStateAction } from 'react';
import { Plan } from '../typings';
import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    TvIcon,
} from '@heroicons/react/24/outline';
import { formatAmountForDisplay } from '../utils/stripe-helpers';

interface Props {
    plans: Plan[];
    selectedPlan: Plan | null;
    setSelectedPlan: Dispatch<SetStateAction<Plan | null>>;
}

function Table({ plans, selectedPlan, setSelectedPlan }: Props) {
    const icon = (name: string) => {
        switch (name) {
            case 'phone':
                return <DevicePhoneMobileIcon className="w-8 h-8" />;
            case 'tablet':
                return <DeviceTabletIcon className="w-8 h-8" />;
            case 'computer':
                return <ComputerDesktopIcon className="w-8 h-8" />;
            case 'tv':
                return <TvIcon className="w-8 h-8" />;
            default:
                return;
        }
    };
    return (
        <table className="w-full">
            <tbody className="divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Giá hàng tháng</td>
                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === plan.id
                                    ? 'text-primary'
                                    : 'opacity-70'
                            }`}
                            onClick={() => setSelectedPlan(plan)}
                            key={plan.id}
                        >
                            <span className="mr-1">
                                {formatAmountForDisplay(
                                    plan.price,
                                    plan.currency,
                                )}
                            </span>
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Chất lượng video</td>
                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === plan.id
                                    ? 'text-primary'
                                    : 'opacity-70'
                            }`}
                            onClick={() => setSelectedPlan(plan)}
                            key={plan.id}
                        >
                            {plan.quality}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Độ phân giải</td>
                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === plan.id
                                    ? 'text-primary'
                                    : 'opacity-70'
                            }`}
                            onClick={() => setSelectedPlan(plan)}
                            key={plan.id}
                        >
                            {plan.resolution}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">
                        Các thiết bị bạn có thể dùng để xem
                    </td>

                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === plan.id
                                    ? 'text-primary'
                                    : 'opacity-70'
                            }`}
                            onClick={() => setSelectedPlan(plan)}
                            key={plan.id}
                        >
                            {plan.devices.split(',')?.map((device, index) => (
                                <span
                                    className="tableDataFeatureDevice"
                                    key={index}
                                >
                                    {icon(device)}
                                    <span>{device}</span>
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
