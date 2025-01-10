import { locations } from '../data/locations';
import { services } from '../data/services';
import { format } from './format';

// 從 locations.js 動態獲取所有城市
const getAllCities = () => {
  return Object.values(locations.countries).flatMap(country => 
    Object.keys(country.cities)
  );
};

// 從 locations.js 獲取指定城市的所有區域
const getDistrictsForCity = (city) => {
  const formattedCity = format.toDisplayFormat(city);
  for (const country of Object.values(locations.countries)) {
    if (country.cities[formattedCity]) {
      return country.cities[formattedCity];
    }
  }
  return [];
};

// 從 locations.js 獲取城市所屬的國家
const getCountryForCity = (city) => {
  const formattedCity = format.toDisplayFormat(city);
  for (const [country, data] of Object.entries(locations.countries)) {
    if (data.cities[formattedCity]) {
      return country;
    }
  }
  return null;
};

// 驗證城市是否存在
const isCityValid = (city) => {
  return getAllCities().map(c => format.toStorageFormat(c))
    .includes(format.toStorageFormat(city));
};

// 驗證區域是否存在於指定城市
const isDistrictValid = (city, district) => {
  const districts = getDistrictsForCity(city);
  return districts.map(d => format.toStorageFormat(d))
    .includes(format.toStorageFormat(district));
};

// 路由配置
const ROUTES = {
  get TYPES() {
    return Object.keys(services.types).map(format.toStorageFormat);
  },
  get CITIES() {
    return getAllCities().map(format.toStorageFormat);
  },
  get DISTRICTS() {
    const districts = {};
    getAllCities().forEach(city => {
      districts[format.toStorageFormat(city)] = 
        getDistrictsForCity(city).map(format.toStorageFormat);
    });
    return districts;
  },
  get SERVICES() {
    return Object.fromEntries(
      Object.entries(services.types).map(([type, { services }]) => [
        format.toStorageFormat(type),
        services.map(format.toStorageFormat)
      ])
    );
  }
};

// 路徑生成函數
const generatePath = {
  type: (type) => `/home/${format.toRouteFormat(type)}`,
  city: (type, city) => `/home/${format.toRouteFormat(type)}/${format.toRouteFormat(city)}`,
  district: (type, city, district) => 
    `/home/${format.toRouteFormat(type)}/${format.toRouteFormat(city)}/${format.toRouteFormat(district)}`,
  serviceCity: (type, service, city) => 
    `/home/${format.toRouteFormat(type)}/${format.toRouteFormat(service)}-${format.toRouteFormat(city)}`,
  serviceDistrict: (type, service, city, district) => 
    `/home/${format.toRouteFormat(type)}/${format.toRouteFormat(service)}-${format.toRouteFormat(city)}/${format.toRouteFormat(service)}-${format.toRouteFormat(district)}`,
  business: (id) => `/business/${id}`
};

// 位置相關工具函數
const locationUtils = {
  getAllCities,
  getDistrictsForCity,
  getCountryForCity,
  isCityValid,
  isDistrictValid
};

// 統一導出
export {
  generatePath,
  ROUTES,
  locationUtils
};
