import { locations } from './locations';
import { services } from './services';
import { format } from '../utils/format';

const generateBusinesses = () => {
  const result = {};
  
  Object.entries(locations.countries).forEach(([country, { cities }]) => {
    result[country] = {};
    
    Object.entries(cities).forEach(([city, districts]) => {
      result[country][city] = {};
      
      districts.forEach(district => {
        result[country][city][district] = [];
        let id = 1;
        
        Object.entries(services.types).forEach(([typeKey, { displayName, services: typeServices }]) => {
          // Generate 2 businesses for each type in each district
          for (let i = 0; i < 2; i++) {
            result[country][city][district].push({
              id: id++,
              name: `${district} ${displayName} ${i + 1}`,
              type: format.toStorageFormat(typeKey),
              services: typeServices.map(format.toStorageFormat),
              displayName,
              location: {
                country,
                city: format.toStorageFormat(city),
                district: format.toStorageFormat(district)
              }
            });
          }
        });
      });
    });
  });
  
  return result;
};

export const businesses = generateBusinesses();
