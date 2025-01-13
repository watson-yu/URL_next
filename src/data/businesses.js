import { locations } from './locations';
import { services } from './services';
import { format } from '../utils/format';

const generateBusinesses = () => {
  console.log('Generating businesses...'); // Debug
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
  
  console.log(`Generated ${allBusinesses.length} businesses`); // Debug
  return allBusinesses;
};

// 生成並緩存商家數據
const allBusinesses = generateBusinesses();

// 導出所有查詢函數
export const businesses = {
  getAll: () => {
    console.log('Getting all businesses:', allBusinesses.length); // Debug
    return allBusinesses;
  },

  getById: (id) => {
    console.log('Getting business by id:', id); // Debug
    return allBusinesses.find(business => business.id === parseInt(id));
  },

  getByType: (type) => {
    console.log('Getting businesses by type:', type); // Debug
    const businesses = allBusinesses.filter(business => business.type === type);
    console.log(`Found ${businesses.length} businesses for type ${type}`); // Debug
    return businesses;
  },

  getByTypeAndCity: (type, city) => {
    console.log('Getting businesses by type and city:', { type, city }); // Debug
    return allBusinesses.filter(business => 
      business.type === type && 
      business.location.city === city
    );
  },

  getByTypeAndCityAndDistrict: (type, city, district) => {
    console.log('Getting businesses by type, city and district:', { type, city, district }); // Debug
    return allBusinesses.filter(business => 
      business.type === type && 
      business.location.city === city &&
      business.location.district === district
    );
  },

  getByTypeAndService: (type, service) => {
    console.log('Getting businesses by type and service:', { type, service }); // Debug
    return allBusinesses.filter(business => 
      business.type === type && 
      business.services.includes(service)
    );
  },

  getByTypeAndServiceAndCity: (type, service, city) => {
    console.log('Getting businesses by type, service and city:', { type, service, city }); // Debug
    return allBusinesses.filter(business => 
      business.type === type && 
      business.services.includes(service) &&
      business.location.city === city
    );
  },

  getByTypeAndServiceAndCityAndDistrict: (type, service, city, district) => {
    console.log('Getting businesses by type, service, city and district:', { type, service, city, district }); // Debug
    return allBusinesses.filter(business => 
      business.type === type && 
      business.services.includes(service) &&
      business.location.city === city &&
      business.location.district === district
    );
  }
};

// 為了向後兼容，也導出單獨的函數
export const getAllBusinesses = businesses.getAll;
export const getBusinessById = businesses.getById;
export const getBusinessesByType = businesses.getByType;
export const getBusinessesByTypeAndCity = businesses.getByTypeAndCity;
export const getBusinessesByTypeAndCityAndDistrict = businesses.getByTypeAndCityAndDistrict;
export const getBusinessesByTypeAndService = businesses.getByTypeAndService;
export const getBusinessesByTypeAndServiceAndCity = businesses.getByTypeAndServiceAndCity;
export const getBusinessesByTypeAndServiceAndCityAndDistrict = businesses.getByTypeAndServiceAndCityAndDistrict;
