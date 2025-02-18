import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    const { pathname } = request.nextUrl;

    // Allow access to signin page regardless of token status
    if (pathname === '/signin') {
        return NextResponse.next();
    }

    // Define protected routes that require authentication
    const protectedRoutes = [
        '/api/comments',
        '/api/posts',
        '/api/comments'
        // Add other protected routes
    ];

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // If it's a protected route and no token exists, redirect to signin
    if (isProtectedRoute && !token) {
        const signInUrl = new URL('/signin', request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/signin',
        '/api/:path*'
    ]
};