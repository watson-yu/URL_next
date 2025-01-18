import { getLocations } from '../data/locations';

export const locationUtils = {
  async getAllCities() {
    const locations = await getLocations();
    const cities: string[] = [];
    Object.values(locations.countries).forEach(country => {
      Object.keys(country.cities).forEach(city => {
        cities.push(city);
      });
    });
    return cities;
  },

  async getDistrictsForCity(city: string) {
    const locations = await getLocations();
    for (const country of Object.values(locations.countries)) {
      if (city in country.cities) {
        return country.cities[city].districts;
      }
    }
    return [];
  },

  async isCityValid(city: string): Promise<boolean> {
    const cities = await this.getAllCities();
    return cities.includes(city);
  },

  async isDistrictValid(city: string, district: string): Promise<boolean> {
    const districts = await this.getDistrictsForCity(city);
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