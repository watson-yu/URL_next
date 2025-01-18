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
    type: (type: string) => `/${type}`,
    name: (type: string, name: string) => `/${type}/${name}`,
    city: (type: string, name: string, city: string) => 
      `/${type}/${name}/${city}`,
    district: (type: string, name: string, city: string, district: string) => 
      `/${type}/${name}/${city}/${district}`,
  }
}; 