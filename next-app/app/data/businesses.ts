import { apiClient } from '../utils/api-client';

export const businesses = {
  async getAll() {
    const data = await apiClient.getBusinesses();
    return data.businesses;
  },
  
  async getById(id: number) {
    return await apiClient.getBusiness(id);
  },

  async getByType(type: string) {
    const data = await apiClient.getBusinesses({ type });
    return data.businesses;
  },

  async getByTypeAndCity(type: string, city: string) {
    const data = await apiClient.getBusinesses({ type, city });
    return data.businesses;
  },

  async getByTypeAndCityAndDistrict(type: string, city: string, district: string) {
    const data = await apiClient.getBusinesses({ type, city, district });
    return data.businesses;
  },

  async getByService(service: string) {
    const data = await apiClient.getBusinesses({ service });
    return data.businesses;
  },

  async getByServiceAndCity(service: string, city: string) {
    const data = await apiClient.getBusinesses({ service, city });
    return data.businesses;
  },

  async getByServiceAndCityAndDistrict(service: string, city: string, district: string) {
    const data = await apiClient.getBusinesses({ service, city, district });
    return data.businesses;
  },

  async getFeatured(limit = 4) {
    return await apiClient.getFeaturedBusinesses(limit);
  }
}; 