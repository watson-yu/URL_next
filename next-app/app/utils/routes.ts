import { locations } from '../data/locations';

export const locationUtils = {
  getAllCities: () => {
    const cities: string[] = [];
    Object.values(locations.countries).forEach(country => {
      Object.keys(country.cities).forEach(city => {
        cities.push(city);
      });
    });
    return cities;
  },

  getDistrictsForCity: (city: string) => {
    for (const country of Object.values(locations.countries)) {
      if (city in country.cities) {
        return country.cities[city].districts;
      }
    }
    return [];
  },

  isCityValid: (city: string): boolean => {
    return locationUtils.getAllCities().includes(city);
  },

  isDistrictValid: (city: string, district: string): boolean => {
    const districts = locationUtils.getDistrictsForCity(city);
    return districts.includes(district);
  }
};

export const generatePath = {
  actual: {
    type: (type: string) => `/home/v/${type}`,
    city: (type: string, city: string) => `/home/v/${type}/${city}`,
    district: (type: string, city: string, district: string) => 
      `/home/v/${type}/${city}/${district}`,
    business: (type: string, city: string, district: string, businessId: string) =>
      `/home/${type}/${city}/${district}/${businessId}`,
    serviceCity: (service: string, city: string) => 
      `/home/t/${service}/${city}`,
    serviceDistrict: (service: string, city: string, district: string) => 
      `/home/t/${service}/${city}/${district}`,
  }
}; 