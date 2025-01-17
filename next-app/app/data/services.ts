export const services = {
  types: {
    hair_salon: {
      displayName: "Hair Salon",
      services: [
        "womens_haircut",
        "hair_coloring",
        "hair_styling",
        "hair_treatment"
      ]
    },
    beauty_salon: {
      displayName: "Beauty Salon",
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
      services: [
        "mens_haircut",
        "shaving",
        "beard_trimming",
        "mens_styling"
      ]
    },
    nail_salon: {
      displayName: "Nail Salon",
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

export const getTypeByService = (service: string) => {
  for (const [type, info] of Object.entries(services.types)) {
    if (info.services.includes(service)) {
      return type;
    }
  }
  return null;
}; 