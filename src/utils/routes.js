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

// 路由配置
export const ROUTES = {
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
export const generatePath = {
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
