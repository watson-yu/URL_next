import { apiClient } from '../utils/api-client';

interface ServiceType {
  displayName: string;
  treatments: {
    id: number;
    treatment: string;
    slug: string;
    description: string;
  }[];
}

interface ServicesData {
  types: {
    [key: string]: ServiceType;
  };
}

async function fetchServices(): Promise<ServicesData> {
  try {
    const categories = await apiClient.getCategories();
    const services: ServicesData = {
      types: {}
    };

    // Fetch treatments for each category
    await Promise.all(
      categories.map(async (category) => {
        const treatments = await apiClient.getTreatmentsByCategory(category.slug);
        
        services.types[category.slug] = {
          displayName: category.display_name,
          treatments: treatments.map(t => ({
            id: t.id,
            treatment: t.treatment,
            slug: t.slug,
            description: t.description
          }))
        };
      })
    );

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fallback to empty structure if API fails
    return { types: {} };
  }
}

// Export an async function to get services
export async function getServices(): Promise<ServicesData> {
  return await fetchServices();
}

// For backward compatibility, export empty services initially
export const services: ServicesData = {
  types: {}
};

// Helper function to find category by treatment
export async function getCategoryByTreatment(treatmentSlug: string): Promise<string | null> {
  const servicesData = await getServices();
  
  for (const [category, info] of Object.entries(servicesData.types)) {
    if (info.treatments.some(t => t.slug === treatmentSlug)) {
      return category;
    }
  }
  return null;
} 