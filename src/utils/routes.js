import { locations } from '../data/locations';
import { services } from '../data/services';
import { format } from './format';

// Parse typeService parameter
const parseTypeService = (typeService) => {
  if (!typeService) {
    return { type: null, service: null };
  }
  
  // Handle spaces in the URL by replacing hyphens back to spaces before splitting
  const decodedType = decodeURIComponent(typeService).replace(/-/g, ' ');
  const parts = decodedType.split(' ');
  
  // If it's a compound type like "hair salon", join all parts except the last one
  const type = format.toStorageFormat(parts.join(' '));
  const service = null; // Since we're not using service in the URL anymore

  return { type, service };
};

// Location utility functions
const getAllCities = () => {
  return Object.values(locations.countries)
    .flatMap(country => Object.keys(country.cities));
};

const getDistrictsForCity = (city) => {
  for (const country of Object.values(locations.countries)) {
    if (city in country.cities) {
      return country.cities[city];
    }
  }
  return [];
};

const getCountryForCity = (city) => {
  for (const [country, data] of Object.entries(locations.countries)) {
    if (city in data.cities) {
      return country;
    }
  }
  return null;
};

const isCityValid = (city) => {
  return getAllCities().includes(city);
};

const isDistrictValid = (city, district) => {
  const districts = getDistrictsForCity(city);
  return districts.includes(district);
};

// Path generation functions
export const generatePath = {
  type: (type) => `/home/${encodeURIComponent(format.toRouteFormat(type))}`,
  
  city: (type, city) => 
    `/home/${encodeURIComponent(format.toRouteFormat(type))}/${encodeURIComponent(format.toRouteFormat(city))}`,
  
  district: (type, city, district) => 
    `/home/${encodeURIComponent(format.toRouteFormat(type))}/${encodeURIComponent(format.toRouteFormat(city))}/${encodeURIComponent(format.toRouteFormat(district))}`,
  
  business: (id) => `/business/${id}`
};

export const locationUtils = {
  getAllCities,
  getDistrictsForCity,
  getCountryForCity,
  isCityValid,
  isDistrictValid
};

export { parseTypeService };
