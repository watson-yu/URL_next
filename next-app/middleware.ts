import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTypeByService } from './app/data/services';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Legacy route patterns (now redirecting from /home/... to /...)
  const legacyTypePattern = /^\/home\/([^\/]+)$/;
  const legacyCityPattern = /^\/home\/([^\/]+)\/([^\/]+)$/;
  const legacyDistrictPattern = /^\/home\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
  const legacyServiceCityPattern = /^\/home\/t\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
  const legacyServiceDistrictPattern = /^\/home\/t\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;

  // Handle /home/:type -> /v/:type
  const typeMatch = pathname.match(legacyTypePattern);
  if (typeMatch) {
    const [, type] = typeMatch;
    return NextResponse.redirect(new URL(`/v/${type}`, request.url));
  }

  // Handle /home/:type/:city -> /v/:type/:city
  const cityMatch = pathname.match(legacyCityPattern);
  if (cityMatch) {
    const [, type, city] = cityMatch;
    const serviceType = getTypeByService(type);
    if (serviceType) {
      return NextResponse.redirect(new URL(`/t/${type}/${city}`, request.url));
    }
    return NextResponse.redirect(new URL(`/v/${type}/${city}`, request.url));
  }

  // Handle /home/:type/:city/:district -> /v/:type/:city/:district
  const districtMatch = pathname.match(legacyDistrictPattern);
  if (districtMatch) {
    const [, type, city, district] = districtMatch;
    const serviceType = getTypeByService(type);
    if (serviceType) {
      return NextResponse.redirect(new URL(`/t/${type}/${city}/${district}`, request.url));
    }
    return NextResponse.redirect(new URL(`/v/${type}/${city}/${district}`, request.url));
  }

  return NextResponse.next();
}

// Configure which paths should run the middleware
export const config = {
  matcher: ['/home/:path*'],
}; 