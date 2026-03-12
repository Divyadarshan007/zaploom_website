import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    // Protect /admin routes, but exclude /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!token) {
            const url = new URL('/admin/login', request.url);
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }
    }

    // Redirect from login if already authenticated
    if (pathname === '/admin/login' && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
