import Image from 'next/image';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import BasicMenu from './BasicMenu';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();

    const handleSignOut = async () => {
        /* Custom Authentication */
        // removeCookies('token');
        // router.push('/auth/login');

        /* Firebase */
        await logout();
        router.push('/auth/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${isScrolled && 'bg-[#141414]/80'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <div className="relative w-36 h-36">
                    <Image
                        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                        alt=""
                        fill
                        priority
                        className="object-contain cursor-pointer"
                    />
                </div>

                <ul className="hidden md:flex space-x-4 items-center ">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">TV Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 text-sm font-light">
                <MagnifyingGlassIcon className="hidden h-6 w-6 text-white md:inline" />
                <p className="hidden lg-inline">Kis</p>
                <BellIcon className="h-6 w-6" />

                <BasicMenu />
            </div>
        </header>
    );
}

export default Header;
