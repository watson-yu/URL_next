export const PAGE_SIZE = 4;
export const MAX_SUGGESTIONS = 5;

export const URL_PATTERNS = {
  // 實際路由路徑
  V_ROUTES: {
    TYPE: '/home/v/:type',
    CITY: '/home/v/:type/:city',
    DISTRICT: '/home/v/:type/:city/:district',
  },
  T_ROUTES: {
    SERVICE_CITY: '/home/t/:service/:city',
    SERVICE_DISTRICT: '/home/t/:service/:city/:district',
  },
  
  // 顯示用路徑（用於 breadcrumb）
  DISPLAY: {
    HOME: '/',
    TYPE: '/home/:type',
    CITY: '/home/:type/:city',
    DISTRICT: '/home/:type/:city/:district',
    SERVICE_CITY: '/home/:type/:service-:city',
    SERVICE_DISTRICT: '/home/:type/:service-:city/:district',
    BUSINESS_DETAIL: '/home/:type/:city/:district/:businessId'
  }
};

export const LEVELS = {
  HOME: 'home',
  TYPE: 'type',
  CITY: 'city',
  DISTRICT: 'district',
  SERVICE_CITY: 'service_city',
  SERVICE_DISTRICT: 'service_district'
};
