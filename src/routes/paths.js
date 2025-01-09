export const generatePath = {
  type: (type) => `/home/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}`,
  
  city: (type, city) => 
    `/home/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(city.toLowerCase())}`,
  
  district: (type, city, district) => 
    `/home/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(district.toLowerCase())}`,
  
  serviceCity: (type, service, city) => 
    `/home/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}-${encodeURIComponent(city.toLowerCase())}`,
  
  serviceDistrict: (type, service, city, district) => 
    `/home/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}-${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}-${encodeURIComponent(district.toLowerCase())}`
};
