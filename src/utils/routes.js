// ... other imports ...

// 解析 serviceCity 參數 (例如: "facial-kaohsiung")
export const parseServiceCity = (serviceCity) => {
  if (!serviceCity || !serviceCity.includes('-')) {
    return { service: null, city: serviceCity };
  }

  const [service, city] = serviceCity.split('-');
  return { 
    service: format.toStorageFormat(service),
    city: format.toStorageFormat(city)
  };
};

export const generatePath = {
  // ... other paths ...

  // 服務城市路徑：/home/hair_salon/haircut-taipei
  serviceCity: (type, service, city) => 
    `/home/${type}/${service}-${city}`,

  // 服務區域路徑：/home/hair_salon/haircut-taipei/xinyi
  serviceDistrict: (type, service, city, district) => 
    `/home/${type}/${service}-${city}/${district}`,
};

// ... rest of the code ...
