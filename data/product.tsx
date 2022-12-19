import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    TvIcon,
} from '@heroicons/react/24/outline';
import { Product } from '../typings';

const products: Product[] = [
    {
        id: 'prod_N0j0Y5ZoZjH483',
        name: 'Di Động',
        priceId: 'price_1MGhY1FfupIoPTpaVb6UWsyu',
        currency: 'vnd',
        quality: 'Tốt',
        resolution: '480p',
        devices: [
            {
                name: 'Điện thoại',
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính bảng',
                icon: <DeviceTabletIcon className="w-8 h-8" />,
            },
        ],
    },
    {
        id: 'prod_Myxjw3Lr2ULyPe',
        name: 'Cơ bản',
        priceId: 'price_1MEzoNFfupIoPTpaxcIfuh3G',
        currency: 'vnd',
        quality: 'Tốt',
        resolution: '720p',
        devices: [
            {
                name: 'Điện thoại',
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính bảng',
                icon: <DeviceTabletIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính',
                icon: <ComputerDesktopIcon className="w-8 h-8" />,
            },
            {
                name: 'TV',
                icon: <TvIcon className="w-8 h-8" />,
            },
        ],
    },
    {
        id: 'prod_MyxjltWvg9QOmn',
        name: 'Tiêu chuẩn',
        priceId: 'price_1MEzo4FfupIoPTpa4p30IBk6',
        currency: 'vnd',
        quality: 'Tốt hơn',
        resolution: '1080p',
        devices: [
            {
                name: 'Điện thoại',
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính bảng',
                icon: <DeviceTabletIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính',
                icon: <ComputerDesktopIcon className="w-8 h-8" />,
            },
            {
                name: 'TV',
                icon: <TvIcon className="w-8 h-8" />,
            },
        ],
    },
    {
        id: 'prod_Myxie2mkCqtVFk',
        name: 'Cao cấp',
        priceId: 'price_1MEzmqFfupIoPTpaEix19rdc',
        currency: 'vnd',
        quality: 'Tốt nhất',
        resolution: '4K+HDR',
        devices: [
            {
                name: 'Điện thoại',
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính bảng',
                icon: <DeviceTabletIcon className="w-8 h-8" />,
            },
            {
                name: 'Máy tính',
                icon: <ComputerDesktopIcon className="w-8 h-8" />,
            },
            {
                name: 'TV',
                icon: <TvIcon className="w-8 h-8" />,
            },
        ],
    },
];

export default products;
