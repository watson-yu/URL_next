export const services = {
  types: {
    hair_salon: {
      displayName: "Hair Salon",
      color: "grape",
      services: ["haircut", "hair_coloring", "hair_styling", "hair_treatment"]
    },
    beauty_salon: {
      displayName: "Beauty Salon",
      color: "pink",
      services: ["facial", "manicure", "pedicure", "makeup", "skin_care"]
    },
    barbershop: {
      displayName: "Barbershop",
      color: "blue",
      services: ["haircut", "shaving", "beard_trimming", "hair_styling"]
    }
  }
};

// 新增：根據服務名稱獲取對應的商家類型
export const getTypeByService = (service) => {
  for (const [type, info] of Object.entries(services.types)) {
    if (info.services.includes(service)) {
      return type;
    }
  }
  return null;
};

// 新增：檢查服務是否存在
export const isValidService = (service) => {
  return Boolean(getTypeByService(service));
};
