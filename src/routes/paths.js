export const generatePath = {
  type: (type) => `/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}`,
  city: (type, city) => `/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(city.toLowerCase())}`,
  serviceCity: (type, service, city) => 
    `/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}-${encodeURIComponent(city.toLowerCase())}`,
  district: (type, city, district) => 
    `/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(district.toLowerCase())}`,
  serviceDistrict: (type, service, city, district) => 
    `/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}-${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(district.toLowerCase())}`
};
