const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

// Validate environment variables
if (!API_BASE_URL || !API_TOKEN) {
  console.error('Missing required environment variables:', {
    API_BASE_URL: !!API_BASE_URL,
    API_TOKEN: !!API_TOKEN
  });
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface CityDistrict {
  id: number;
  country: string;
  city: string;
  district: string;
  country_slug: string;
  city_slug: string;
  district_slug: string;
}

interface Category {
  id: number;
  slug: string;
  display_name: string;
  treatments?: {
    id: number;
    treatment: string;
    slug: string;
    description: string;
  }[];
}

interface Treatment {
  id: number;
  treatment: string;
  slug: string;
  description: string;
  category_name: string;
  category_slug: string;
}

interface Business {
  id: number;
  name: string;
  type: string;
  services: {
    slug: string;
    price: number | null;
    duration_minutes: number | null;
  }[];
  country: string;
  city: string;
  district: string;
  country_slug: string;
  city_slug: string;
  district_slug: string;
  created_at: string;
  updated_at: string;
  is_featured: number;
  featured_order: number;
}

interface BusinessListResponse {
  total: number;
  businesses: Business[];
}

// Fallback data for development/testing
const fallbackData = {
  cityDistricts: [
    {
      country: "Taiwan",
      city: "Taipei",
      district: "Xinyi",
      country_slug: "taiwan",
      city_slug: "taipei",
      district_slug: "xinyi"
    }
  ],
  categories: [
    {
      id: 1,
      slug: "hair-salon",
      display_name: "Hair Salon"
    }
  ],
  businesses: {
    total: 1,
    businesses: [{
      id: 1,
      name: "Test Business",
      type: "hair-salon",
      services: [{ slug: "haircut", price: 100, duration_minutes: 30 }],
      country: "Taiwan",
      city: "Taipei",
      district: "Xinyi",
      country_slug: "taiwan",
      city_slug: "taipei",
      district_slug: "xinyi",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_featured: 1,
      featured_order: 1
    }]
  }
};

export const apiClient = {
  async getCityDistricts() {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using fallback city districts data');
      return fallbackData.cityDistricts;
    }

    try {
      const url = `${API_BASE_URL}/glow/city-districts`;
      console.log('Fetching city districts from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Return empty array for 404 errors
        if (response.status === 404) {
          return [];
        }

        // Use fallback only for other errors
        console.warn('Using fallback city districts data');
        return fallbackData.cityDistricts;
      }

      const data: ApiResponse<CityDistrict[]> = await response.json();
      
      if (!data.success) {
        // Return empty array for "not found" errors
        if (data.error?.toLowerCase().includes('not found')) {
          return [];
        }
        console.warn('Using fallback city districts data');
        return fallbackData.cityDistricts;
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching city districts:', error);
      console.warn('Using fallback city districts data');
      return fallbackData.cityDistricts;
    }
  },

  async getCategories() {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using fallback categories data');
      return fallbackData.categories;
    }

    try {
      const url = `${API_BASE_URL}/glow/categories`;
      console.log('Fetching categories from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Return empty array for 404 errors
        if (response.status === 404) {
          return [];
        }

        // Use fallback only for other errors
        console.warn('Using fallback categories data');
        return fallbackData.categories;
      }

      const data: ApiResponse<Category[]> = await response.json();
      
      if (!data.success) {
        // Return empty array for "not found" errors
        if (data.error?.toLowerCase().includes('not found')) {
          return [];
        }
        console.warn('Using fallback categories data');
        return fallbackData.categories;
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      console.warn('Using fallback categories data');
      return fallbackData.categories;
    }
  },

  async getTreatmentsByCategory(categorySlug: string) {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using empty treatments data');
      return [];
    }

    try {
      const url = `${API_BASE_URL}/glow/categories/${categorySlug}/treatments`;
      console.log('Fetching treatments from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        return [];
      }

      const data: ApiResponse<Treatment[]> = await response.json();
      
      if (!data.success) {
        return [];
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching treatments:', error);
      return [];
    }
  },

  async getBusinesses(params?: {
    type?: string;
    country?: string;
    city?: string;
    district?: string;
    service?: string;
    limit?: number;
    offset?: number;
  }) {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using fallback businesses data');
      return fallbackData.businesses;
    }

    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });
      }

      const url = `${API_BASE_URL}/glow/businesses?${queryParams.toString()}`;
      console.log('Fetching businesses from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Return empty list for 404 errors
        if (response.status === 404) {
          return { total: 0, businesses: [] };
        }

        // Use fallback only for other errors
        console.warn('Using fallback businesses data');
        return fallbackData.businesses;
      }

      const data: ApiResponse<BusinessListResponse> = await response.json();
      
      if (!data.success) {
        // Return empty list for "not found" errors
        if (data.error?.toLowerCase().includes('not found')) {
          return { total: 0, businesses: [] };
        }
        console.warn('Using fallback businesses data');
        return fallbackData.businesses;
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      console.warn('Using fallback businesses data');
      return fallbackData.businesses;
    }
  },

  async getBusiness(id: number) {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using fallback business data');
      return fallbackData.businesses.businesses[0];
    }

    try {
      const url = `${API_BASE_URL}/glow/businesses/${id}`;
      console.log('Fetching business from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        console.warn('Using fallback business data');
        return fallbackData.businesses.businesses[0];
      }

      const data: ApiResponse<Business> = await response.json();
      
      if (!data.success) {
        console.warn('Using fallback business data');
        return fallbackData.businesses.businesses[0];
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching business:', error);
      console.warn('Using fallback business data');
      return fallbackData.businesses.businesses[0];
    }
  },

  async getFeaturedBusinesses(limit?: number) {
    if (!API_BASE_URL || !API_TOKEN) {
      console.warn('Using fallback featured businesses data');
      return fallbackData.businesses.businesses;
    }

    try {
      const queryParams = new URLSearchParams();
      if (limit) {
        queryParams.append('limit', limit.toString());
      }

      const url = `${API_BASE_URL}/glow/businesses/featured?${queryParams.toString()}`;
      console.log('Fetching featured businesses from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Return empty array for 404 errors
        if (response.status === 404) {
          return [];
        }

        // Use fallback only for other errors
        console.warn('Using fallback featured businesses data');
        return fallbackData.businesses.businesses;
      }

      const data: ApiResponse<Business[]> = await response.json();
      
      if (!data.success) {
        // Return empty array for "not found" errors
        if (data.error?.toLowerCase().includes('not found')) {
          return [];
        }
        console.warn('Using fallback featured businesses data');
        return fallbackData.businesses.businesses;
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching featured businesses:', error);
      console.warn('Using fallback featured businesses data');
      return fallbackData.businesses.businesses;
    }
  }
}; 