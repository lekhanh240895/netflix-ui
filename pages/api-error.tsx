import Link from 'next/link';
import React from 'react';

function ApiError() {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center px-2">
            <h1 className="text-4xl font-bold mb-4 text-center">
                Authentication failed.
            </h1>

            <p className="text-lg font-semibold mb-4">
                You need to login to use the api.
            </p>

            <Link
                href="/login"
                className="border border-white py-2 px-6 text-base"
            >
                Login
            </Link>
        </div>
    );
}

export default ApiError;
