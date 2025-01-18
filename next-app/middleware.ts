import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTypeByService } from './app/data/services';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Legacy route patterns
  const legacyTypePattern = /^\/home\/([^\/]+)$/;
  const legacyCityPattern = /^\/home\/([^\/]+)\/([^\/]+)$/;
  const legacyDistrictPattern = /^\/home\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
  const legacyServiceCityPattern = /^\/home\/t\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
  const legacyServiceDistrictPattern = /^\/home\/t\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;

  // Handle /home/:type -> /home/v/:type
  const typeMatch = pathname.match(legacyTypePattern);
  if (typeMatch) {
    const [, type] = typeMatch;
    return NextResponse.redirect(new URL(`/home/v/${type}`, request.url));
  }

  // Handle /home/:type/:city
  const cityMatch = pathname.match(legacyCityPattern);
  if (cityMatch) {
    const [, type, city] = cityMatch;
    const serviceType = getTypeByService(type);
    if (serviceType) {
      // If type is actually a service, redirect to service route
      return NextResponse.redirect(new URL(`/home/t/${type}/${city}`, request.url));
    }
    // Otherwise redirect to type route
    return NextResponse.redirect(new URL(`/home/v/${type}/${city}`, request.url));
  }

  // Handle /home/:type/:city/:district
  const districtMatch = pathname.match(legacyDistrictPattern);
  if (districtMatch) {
    const [, type, city, district] = districtMatch;
    const serviceType = getTypeByService(type);
    if (serviceType) {
      // If type is actually a service, redirect to service route
      return NextResponse.redirect(new URL(`/home/t/${type}/${city}/${district}`, request.url));
    }
    // Otherwise redirect to type route
    return NextResponse.redirect(new URL(`/home/v/${type}/${city}/${district}`, request.url));
  }

  // Handle /home/t/:type/:service/:city -> /home/t/:service/:city
  const serviceCityMatch = pathname.match(legacyServiceCityPattern);
  if (serviceCityMatch) {
    const [, , service, city] = serviceCityMatch;
    return NextResponse.redirect(new URL(`/home/t/${service}/${city}`, request.url));
  }

  // Handle /home/t/:type/:service/:city/:district -> /home/t/:service/:city/:district
  const serviceDistrictMatch = pathname.match(legacyServiceDistrictPattern);
  if (serviceDistrictMatch) {
    const [, , service, city, district] = serviceDistrictMatch;
    return NextResponse.redirect(new URL(`/home/t/${service}/${city}/${district}`, request.url));
  }

  return NextResponse.next();
}

// Configure which paths should run the middleware
export const config = {
  matcher: [
    // Match all paths starting with /home
    '/home/:path*',
  ],
}; 