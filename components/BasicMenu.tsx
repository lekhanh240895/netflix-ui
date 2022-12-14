import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { logout } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        /* Custom Authentication */
        // removeCookies('token');
        // router.push('/auth/login');

        /* Firebase */
        await logout();
        router.push('/auth/login');
    };
    return (
        <div className="relative w-6 h-6 cursor-pointer rounded">
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Avatar"
                fill
                sizes="large"
                onClick={handleClick}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem>
                    <Link href="/account">My account</Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default BasicMenu;
