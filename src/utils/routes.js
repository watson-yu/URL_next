import { locations } from '../data/locations';
import { services } from '../data/services';
import { format } from './format';

// 解析 typeService 參數
const parseTypeService = (typeService) => {
  if (!typeService) {
    return { type: null, service: null };
  }
  const parts = typeService.split('-');
  return {
    type: format.toStorageFormat(parts[0]),
    service: parts.length > 1 ? format.toStorageFormat(parts[1]) : null
  };
};

// ... (其他輔助函數保持不變)

// 路徑生成函數
export const generatePath = {
  type: (type) => `/home/${format.toRouteFormat(type)}`,
  
  typeWithService: (type, service) => 
    `/home/${format.toRouteFormat(type)}-${format.toRouteFormat(service)}`,
  
  city: (typeService, city) => 
    `/home/${typeService}/${format.toRouteFormat(city)}`,
  
  district: (typeService, city, district) => 
    `/home/${typeService}/${format.toRouteFormat(city)}/${format.toRouteFormat(district)}`,
  
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
