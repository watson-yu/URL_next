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
          result[country][city][district].push({
            id: id++,
            name: `${district} ${displayName}`,
            // 儲存格式
            type: format.toStorageFormat(typeKey),
            services: typeServices.map(format.toStorageFormat),
            // 顯示格式
            displayName,
            // 位置資訊
            location: {
              country,
              city: format.toStorageFormat(city),
              district: format.toStorageFormat(district)
            }
          });
        });
      });
    });
  });
  
  return result;
};

export const businesses = generateBusinesses();
