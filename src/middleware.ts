import { auth } from '@/auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const publicPages: string[] = ['/login'];

const authPages: string[] = ['/login'];

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${routing.locales.join('|')}))?(${pages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(pathName);
};

const intlMiddleware = createMiddleware(routing);

const authMiddleware = auth((req) => {
  const isAuthPage = testPathnameRegex(authPages, req.nextUrl.pathname);
  const session = req.auth;

  // Redirect to sign-in page if not authenticated
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const isPublicPage = testPathnameRegex(publicPages, req.nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authPages, req.nextUrl.pathname);

  if (isAuthPage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
};

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== '/login') {
//     const newUrl = new URL('/login', req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });

export const config = {
  matcher: [
    '/(en|fr)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

export default middleware;
