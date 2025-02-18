import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get auth token from cookie
    const token = request.cookies.get('access_token');

    // Get the pathname
    const { pathname } = request.nextUrl;

    // Define routes configuration
    const routeConfig = {
        // Public routes that don't require authentication
        publicRoutes: [
            '/signin',
        ],
        // Routes that should redirect to home if authenticated
        authRoutes: ['/signin'],
        // Static assets that should be ignored
        ignoredRoutes: [
            '/_next',
            '/api/',
            '/favicon.ico',
            '/images',
            // Add other static paths as needed
        ]
    };

    // Check if the current path should be ignored
    const isIgnoredPath = routeConfig.ignoredRoutes.some(path =>
        pathname.startsWith(path)
    );

    // Return early if path should be ignored
    if (isIgnoredPath) {
        return NextResponse.next();
    }

    // Check if the path is public
    const isPublicPath = routeConfig.publicRoutes.some(path =>
        pathname.startsWith(path)
    );

    // Check if the path is an auth route (signin/signup)
    const isAuthPath = routeConfig.authRoutes.some(path =>
        pathname.startsWith(path)
    );

    try {
        // Redirect to signin if accessing protected route without token
        if (!token && !isPublicPath) {
            const signInUrl = new URL('/signin', request.url);
            // Preserve the original URL to redirect back after login
            signInUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(signInUrl);
        }

        // Redirect to home if accessing auth pages while logged in
        if (token && isAuthPath) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // Log error and redirect to signin as fallback
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

// Updated matcher configuration
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * 1. /api/ (API routes)
         * 2. /_next/ (Next.js internal routes)
         * 3. /_static (static files)
         * 4. /_vercel (Vercel system files)
         * 5. /favicon.ico, /sitemap.xml (static files)
         */
        '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
    ],
};