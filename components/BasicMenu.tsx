import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
    PencilSquareIcon,
    QuestionMarkCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { deleteCookie } from 'cookies-next';

interface Props {
    children: React.ReactNode;
}

function BasicMenu({ children }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const router = useRouter();

    const handleSignOut = async () => {
        deleteCookie('token');
        router.push('/login');
    };
    return (
        <div>
            <div
                onClick={handleClick}
                className="flex flex-row items-center space-x-1 md:space-x-3 cursor-pointer"
            >
                {children}

                <ChevronDownIcon
                    className="w-4 h-4 transition-all 200ms hidden md:block"
                    color="white"
                    style={{
                        transform: open ? 'rotateZ(180deg)' : 'none',
                    }}
                />
            </div>

            <Menu
                className="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <div className="relative w-8 h-8">
                        <Image
                            src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABd-zRyXt4X3giGFwUe7qTBje-Oy0aZBYnKki5vcWzgm0QKx2sCWU3pvizcNsi6LQjZSbMpMmHScVNw8MNGoBzELgjzCrnPg.png?r=df6"
                            alt=""
                            fill
                            sizes="large"
                            className="rounded -ml-1"
                        />
                    </div>
                    <span>Kids</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <PencilSquareIcon className="w-6 h-6" />
                    <span>Profile</span>
                </MenuItem>
                <MenuItem>
                    <Link
                        href="/account"
                        className="flex flex-row w-full items-center space-x-5"
                    >
                        <UserIcon className="w-6 h-6" />
                        <span>Account</span>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                    <span>Help center</span>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Logout from Netflix</MenuItem>
            </Menu>
        </div>
    );
}

export default BasicMenu;
