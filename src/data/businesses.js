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
          // 為每個區域的每種類型生成 2-4 個商家
          const numBusinesses = Math.floor(Math.random() * 3) + 2; // 2-4 個商家
          
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

// 獲取所有商家
export const getAllBusinesses = () => allBusinesses;

// 根據類型獲取商家
export const getBusinessesByType = (type) => {
  return allBusinesses.filter(business => business.type === type);
};

// 根據類型和城市獲取商家
export const getBusinessesByTypeAndCity = (type, city) => {
  return allBusinesses.filter(business => 
    business.type === type && 
    business.location.city === city
  );
};

// 根據類型、城市和區域獲取商家
export const getBusinessesByTypeAndCityAndDistrict = (type, city, district) => {
  return allBusinesses.filter(business => 
    business.type === type && 
    business.location.city === city &&
    business.location.district === district
  );
};

// 根據類型和服務獲取商家
export const getBusinessesByTypeAndService = (type, service) => {
  return allBusinesses.filter(business => 
    business.type === type && 
    business.services.includes(service)
  );
};

// 根據類型、服務和城市獲取商家
export const getBusinessesByTypeAndServiceAndCity = (type, service, city) => {
  return allBusinesses.filter(business => 
    business.type === type && 
    business.services.includes(service) &&
    business.location.city === city
  );
};

// 根據類型、服務、城市和區域獲取商家
export const getBusinessesByTypeAndServiceAndCityAndDistrict = (type, service, city, district) => {
  return allBusinesses.filter(business => 
    business.type === type && 
    business.services.includes(service) &&
    business.location.city === city &&
    business.location.district === district
  );
};

// 根據 ID 獲取商家
export const getBusinessById = (id) => {
  return allBusinesses.find(business => business.id === parseInt(id));
};

export const businesses = allBusinesses;
