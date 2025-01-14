export const BUSINESS_COLOR = "blue";  // 統一的顏色定義

export const services = {
  types: {
    hair_salon: {
      displayName: "Hair Salon",
      color: BUSINESS_COLOR,
      services: [
        "womens_haircut",
        "hair_coloring",
        "hair_styling",
        "hair_treatment"
      ]
    },
    beauty_salon: {
      displayName: "Beauty Salon",
      color: BUSINESS_COLOR,
      services: [
        "facial_treatment",
        "beauty_manicure",
        "beauty_pedicure",
        "makeup",
        "skin_care"
      ]
    },
    barbershop: {
      displayName: "Barbershop",
      color: BUSINESS_COLOR,
      services: [
        "mens_haircut",
        "shaving",
        "beard_trimming",
        "mens_styling"
      ]
    },
    nail_salon: {
      displayName: "Nail Salon",
      color: BUSINESS_COLOR,
      services: [
        "nail_manicure",
        "nail_pedicure",
        "nail_art",
        "nail_care",
        "gel_nails"
      ]
    }
  }
};

export const getTypeByService = (service) => {
  for (const [type, info] of Object.entries(services.types)) {
    if (info.services.includes(service)) {
      return type;
    }
  }
  return null;
};

export const isValidService = (service) => {
  return Boolean(getTypeByService(service));
};
