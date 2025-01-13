export const PAGE_SIZE = 4; // 每頁顯示的商家數量
export const MAX_SUGGESTIONS = 5; // 搜尋建議最大數量

export const URL_PATTERNS = {
  HOME: '/',
  TYPE: '/home/:type',
  CITY: '/home/:type/:city',
  DISTRICT: '/home/:type/:city/:district',
  SERVICE_CITY: '/home/:type_:service/:city',
  SERVICE_DISTRICT: '/home/:type_:service/:city/:district',
  BUSINESS_DETAIL: '/home/:type/:city/:district/:businessId'
};

export const LEVELS = {
  HOME: 'home',
  TYPE: 'type',
  CITY: 'city',
  DISTRICT: 'district',
  SERVICE_CITY: 'service_city',
  SERVICE_DISTRICT: 'service_district'
};
