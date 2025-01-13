import { locations } from '../data/locations';
import { services } from '../data/services';

// First, define and export locationUtils
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

// Export locationUtils first
export const locationUtils = {
  getAllCities,
  getDistrictsForCity,
  getCountryForCity,
  isCityValid,
  isDistrictValid
};

// Then define and export validatePath
export const validatePath = {
  type: (type) => {
    try {
      return Boolean(type && services.types[type]);
    } catch (error) {
      console.error('Error validating type:', error);
      return false;
    }
  },

  city: (city) => {
    try {
      return Boolean(city && locationUtils.isCityValid(city));
    } catch (error) {
      console.error('Error validating city:', error);
      return false;
    }
  },

  district: (city, district) => {
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
  },

  service: (type, service) => {
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
  }
};

// Then define and export generatePath
export const generatePath = {
  type: (type) => {
    try {
      console.log('Generating type path:', { type }); // Debug
      if (!validatePath.type(type)) {
        console.warn('Invalid type:', type);
        return '/';
      }
      return `/home/${type}`;
    } catch (error) {
      console.error('Error generating type path:', error);
      return '/';
    }
  },

  city: (type, city) => {
    try {
      console.log('Generating city path:', { type, city }); // Debug
      if (!validatePath.type(type) || !validatePath.city(city)) {
        console.warn('Invalid type or city:', { type, city });
        return '/';
      }
      return `/home/${type}/${city}`;
    } catch (error) {
      console.error('Error generating city path:', error);
      return '/';
    }
  },

  serviceCity: (type, service, city) => {
    try {
      if (!validatePath.type(type) || 
          !validatePath.service(type, service) || 
          !validatePath.city(city)) {
        return '/';
      }
      return `/home/${type}_${service}/${city}`;
    } catch (error) {
      console.error('Error generating service-city path:', error);
      return '/';
    }
  },

  district: (type, city, district) => {
    try {
      if (!validatePath.type(type) || 
          !validatePath.city(city) || 
          !validatePath.district(city, district)) {
        return '/';
      }
      return `/home/${type}/${city}/${district}`;
    } catch (error) {
      console.error('Error generating district path:', error);
      return '/';
    }
  },

  serviceDistrict: (type, service, city, district) => {
    try {
      if (!validatePath.type(type) || 
          !validatePath.service(type, service) || 
          !validatePath.city(city) || 
          !validatePath.district(city, district)) {
        return '/';
      }
      return `/home/${type}_${service}/${city}/${district}`;
    } catch (error) {
      console.error('Error generating service-district path:', error);
      return '/';
    }
  },

  businessDetail: (type, city, district, businessId) => {
    try {
      if (!validatePath.type(type) || 
          !validatePath.city(city) || 
          !validatePath.district(city, district) || 
          !businessId) {
        return '/';
      }
      return `/home/${type}/${city}/${district}/${businessId}`;
    } catch (error) {
      console.error('Error generating business detail path:', error);
      return '/';
    }
  }
};

// Finally define and export parseServiceCity
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
