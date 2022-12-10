import Image from 'next/image';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

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
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <Image
                    src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                    alt=""
                    width={150}
                    height={150}
                    priority
                    className="object-cover cursor-pointer"
                />

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
                <Link href="/account">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt=""
                        className="w-6 h-6 cursor-pointer rounded"
                        width={100}
                        height={100}
                    />
                </Link>
                <span
                    className="text-sm font-semibold cursor-pointer"
                    onClick={() =>
                        signOut({
                            redirect: false,
                        })
                    }
                >
                    Sign out
                </span>
            </div>
        </header>
    );
}

export default Header;
