// 路由配置和生成工具
export const ROUTES = {
  TYPES: ['beauty-salon', 'barbershop'],
  CITIES: ['taipei', 'kaohsiung', 'tokyo', 'kyoto'],
  DISTRICTS: {
    taipei: ['xinyi', 'zhongshan'],
    kaohsiung: ['lingya', 'gushan'],
    tokyo: ['setagaya', 'nerima'],
    kyoto: ['fushimi', 'nakagyo']
  },
  SERVICES: {
    'beauty-salon': ['haircut', 'hair-coloring'],
    'barbershop': ['haircut', 'shaving']
  }
};

// 路徑生成函數
export const generatePath = {
  type: (type) => `/home/${type}`,
  
  city: (type, city) => `/home/${type}/${city}`,
  
  district: (type, city, district) => 
    `/home/${type}/${city}/${district}`,
  
  serviceCity: (type, service, city) => 
    `/home/${type}/${service}-${city}`,
  
  serviceDistrict: (type, service, city, district) => 
    `/home/${type}/${service}-${city}/${service}-${district}`,
  
  business: (id) => `/business/${id}`
};

// URL 格式化工具
export const formatUrlSegment = (text) => 
  text.toLowerCase().replace(/ /g, '-');

// 顯示文字格式化工具
export const formatDisplayText = (text) => 
  text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
