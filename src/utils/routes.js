import { locations } from '../data/locations';
import { services } from '../data/services';
import { URL_PATTERNS } from '../constants';

// 首先定義 locationUtils 的具體函數
const getAllCities = () => {
  try {
    const cities = [];
    Object.values(locations.countries).forEach(country => {
      Object.keys(country.cities).forEach(city => {
        cities.push(city);
      });
    });
    return cities;
  } catch (error) {
    console.error('Error getting all cities:', error);
    return [];
  }
};

const getDistrictsForCity = (city) => {
  try {
    for (const country of Object.values(locations.countries)) {
      if (city in country.cities) {
        return country.cities[city].districts;
      }
    }
    return [];
  } catch (error) {
    console.error('Error getting districts for city:', error);
    return [];
  }
};

const getCountryForCity = (city) => {
  try {
    for (const [country, data] of Object.entries(locations.countries)) {
      if (city in data.cities) {
        return country;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting country for city:', error);
    return null;
  }
};

const isCityValid = (city) => {
  try {
    return getAllCities().includes(city);
  } catch (error) {
    console.error('Error validating city:', error);
    return false;
  }
};

const isDistrictValid = (city, district) => {
  try {
    const districts = getDistrictsForCity(city);
    return districts.includes(district);
  } catch (error) {
    console.error('Error validating district:', error);
    return false;
  }
};

// 導出 locationUtils
export const locationUtils = {
  getAllCities,
  getDistrictsForCity,
  getCountryForCity,
  isCityValid,
  isDistrictValid
};

// 驗證函數
const validateType = (type) => {
  try {
    return Boolean(type && services.types[type]);
  } catch (error) {
    console.error('Error validating type:', error);
    return false;
  }
};

const validateCity = (city) => {
  try {
    return Boolean(city && locationUtils.isCityValid(city));
  } catch (error) {
    console.error('Error validating city:', error);
    return false;
  }
};

const validateDistrict = (city, district) => {
  try {
    return Boolean(
      city && 
      district && 
      locationUtils.isDistrictValid(city, district)
    );
  } catch (error) {
    console.error('Error validating district:', error);
    return false;
  }
};

const validateService = (type, service) => {
  try {
    const typeInfo = services.types[type];
    return Boolean(
      typeInfo && 
      service && 
      typeInfo.services.includes(service)
    );
  } catch (error) {
    console.error('Error validating service:', error);
    return false;
  }
};

// 導出 validatePath
export const validatePath = {
  type: validateType,
  city: validateCity,
  district: validateDistrict,
  service: validateService
};

// 生成路徑函數
export const generatePath = {
  // 實際 URL 路徑生成
  actual: {
    type: (type) => {
      try {
        if (!validatePath.type(type)) return '/';
        return URL_PATTERNS.V_ROUTES.TYPE.replace(':type', type);
      } catch (error) {
        console.error('Error generating actual type path:', error);
        return '/';
      }
    },

    city: (type, city) => {
      try {
        if (!validatePath.type(type) || !validatePath.city(city)) return '/';
        return URL_PATTERNS.V_ROUTES.CITY
          .replace(':type', type)
          .replace(':city', city);
      } catch (error) {
        console.error('Error generating actual city path:', error);
        return '/';
      }
    },

    district: (type, city, district) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.city(city) || 
            !validatePath.district(city, district)) return '/';
        return URL_PATTERNS.V_ROUTES.DISTRICT
          .replace(':type', type)
          .replace(':city', city)
          .replace(':district', district);
      } catch (error) {
        console.error('Error generating actual district path:', error);
        return '/';
      }
    },

    serviceCity: (type, service, city) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.service(type, service) || 
            !validatePath.city(city)) return '/';
        return URL_PATTERNS.T_ROUTES.SERVICE_CITY
          .replace(':type', type)
          .replace(':service', service)
          .replace(':city', city);
      } catch (error) {
        console.error('Error generating actual service-city path:', error);
        return '/';
      }
    },

    serviceDistrict: (type, service, city, district) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.service(type, service) || 
            !validatePath.city(city) || 
            !validatePath.district(city, district)) return '/';
        return URL_PATTERNS.T_ROUTES.SERVICE_DISTRICT
          .replace(':type', type)
          .replace(':service', service)
          .replace(':city', city)
          .replace(':district', district);
      } catch (error) {
        console.error('Error generating actual service-district path:', error);
        return '/';
      }
    }
  },

  // Breadcrumb 顯示用路徑生成
  display: {
    type: (type) => {
      try {
        if (!validatePath.type(type)) return '/';
        return URL_PATTERNS.DISPLAY.TYPE.replace(':type', type);
      } catch (error) {
        console.error('Error generating display type path:', error);
        return '/';
      }
    },

    city: (type, city) => {
      try {
        if (!validatePath.type(type) || !validatePath.city(city)) return '/';
        return URL_PATTERNS.DISPLAY.CITY
          .replace(':type', type)
          .replace(':city', city);
      } catch (error) {
        console.error('Error generating display city path:', error);
        return '/';
      }
    },

    district: (type, city, district) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.city(city) || 
            !validatePath.district(city, district)) return '/';
        return URL_PATTERNS.DISPLAY.DISTRICT
          .replace(':type', type)
          .replace(':city', city)
          .replace(':district', district);
      } catch (error) {
        console.error('Error generating display district path:', error);
        return '/';
      }
    },

    serviceCity: (type, service, city) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.service(type, service) || 
            !validatePath.city(city)) return '/';
        return URL_PATTERNS.DISPLAY.SERVICE_CITY
          .replace(':type', type)
          .replace(':service', service)
          .replace(':city', city);
      } catch (error) {
        console.error('Error generating display service-city path:', error);
        return '/';
      }
    },

    serviceDistrict: (type, service, city, district) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.service(type, service) || 
            !validatePath.city(city) || 
            !validatePath.district(city, district)) return '/';
        return URL_PATTERNS.DISPLAY.SERVICE_DISTRICT
          .replace(':type', type)
          .replace(':service', service)
          .replace(':city', city)
          .replace(':district', district);
      } catch (error) {
        console.error('Error generating display service-district path:', error);
        return '/';
      }
    },

    businessDetail: (type, city, district, businessId) => {
      try {
        if (!validatePath.type(type) || 
            !validatePath.city(city) || 
            !validatePath.district(city, district) || 
            !businessId) return '/';
        return URL_PATTERNS.DISPLAY.BUSINESS_DETAIL
          .replace(':type', type)
          .replace(':city', city)
          .replace(':district', district)
          .replace(':businessId', businessId);
      } catch (error) {
        console.error('Error generating display business detail path:', error);
        return '/';
      }
    }
  }
};

// 解析服務城市
export const parseServiceCity = (serviceCity) => {
  try {
    if (!serviceCity || !serviceCity.includes('-')) {
      return { service: null, city: serviceCity };
    }

    const [service, city] = serviceCity.split('-');
    return { 
      service: service?.toLowerCase(),
      city: city?.toLowerCase()
    };
  } catch (error) {
    console.error('Error parsing service-city:', error);
    return { service: null, city: null };
  }
};
