// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    if (!token) {
        if (!pathname.startsWith('/api')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // else if (!pathname.startsWith('/api/auth')) {
        //     // return new NextResponse(
        //     //     JSON.stringify({
        //     //         success: false,
        //     //         message: 'Authentication failed',
        //     //     }),
        //     //     {
        //     //         status: 401,
        //     //         headers: { 'content-type': 'application/json' },
        //     //     },
        //     // );

        //     request.nextUrl.searchParams.set('from', request.nextUrl.pathname);
        //     request.nextUrl.pathname = '/api-error';

        //     return NextResponse.redirect(request.nextUrl);
        // }
    }
}

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: ['/', '/account', '/planform', '/api/:function*'],
};
