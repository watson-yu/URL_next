import { locations } from './locations';
import { services } from './services';
import { format } from '../utils/format';

const generateBusinesses = () => {
  const result = {};
  let globalId = 1;  // 使用全域 ID 計數器確保每個商家有唯一 ID
  
  // 遍歷 locations 中的每個國家
  Object.entries(locations.countries).forEach(([country, countryData]) => {
    result[country] = {};
    
    // 遍歷每個城市
    Object.entries(countryData.cities).forEach(([city, districts]) => {
      result[country][city] = {};
      
      // 遍歷每個區域
      districts.forEach(district => {
        result[country][city][district] = [];
        
        // 為每個區域生成所有類型的商家
        Object.entries(services.types).forEach(([typeKey, typeInfo]) => {
          // 為每個類型生成 2-3 個商家
          const numBusinesses = Math.floor(Math.random() * 2) + 2; // 2-3 個商家
          
          for (let i = 0; i < numBusinesses; i++) {
            const businessName = `${district} ${typeInfo.displayName} ${i + 1}`;
            
            result[country][city][district].push({
              id: globalId++,
              name: businessName,
              // 儲存格式
              type: format.toStorageFormat(typeKey),
              // 所有可用的服務
              services: typeInfo.services.map(format.toStorageFormat),
              // 顯示名稱
              displayName: typeInfo.displayName,
              // 位置資訊
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
