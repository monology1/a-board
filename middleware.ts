import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    // List of public paths that don't require authentication
    const publicPaths = ['/signin', '/signup'];

    // Check if the requested path is public
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // Redirect to signin if accessing protected route without token
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Redirect to home if accessing auth pages while logged in
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Specify which routes to run middleware on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};