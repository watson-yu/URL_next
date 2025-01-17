import { locations } from './locations';
import { services } from './services';
import { format } from '../utils/format';

const generateBusinesses = () => {
  const allBusinesses = [];
  let globalId = 1;
  
  Object.entries(locations.countries).forEach(([country, countryData]) => {
    Object.entries(countryData.cities).forEach(([city, cityData]) => {
      cityData.districts.forEach(district => {
        Object.entries(services.types).forEach(([typeKey, typeInfo]) => {
          // Generate 2-4 businesses for each district and type
          const numBusinesses = Math.floor(Math.random() * 3) + 2;
          
          for (let i = 0; i < numBusinesses; i++) {
            const businessNumber = i + 1;
            const businessName = `${typeInfo.displayName} ${format.toDisplay(district)} ${businessNumber}`;
            
            allBusinesses.push({
              id: globalId++,
              name: businessName,
              type: typeKey,
              services: typeInfo.services,
              displayName: typeInfo.displayName,
              location: {
                country,
                city,
                district
              }
            });
          }
        });
      });
    });
  });

  return allBusinesses;
};

const allBusinesses = generateBusinesses();

export const businesses = {
  getAll: () => allBusinesses,
  
  getById: (id: number) => {
    return allBusinesses.find(business => business.id === id);
  },

  getByType: (type: string) => {
    return allBusinesses.filter(business => business.type === type);
  },

  getByTypeAndCity: (type: string, city: string) => {
    return allBusinesses.filter(business => 
      business.type === type && 
      business.location.city === city
    );
  },

  getByTypeAndCityAndDistrict: (type: string, city: string, district: string) => {
    return allBusinesses.filter(business => 
      business.type === type && 
      business.location.city === city &&
      business.location.district === district
    );
  }
}; 