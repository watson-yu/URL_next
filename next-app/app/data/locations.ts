import { apiClient } from '../utils/api-client';

interface LocationsData {
  countries: {
    [country: string]: {
      cities: {
        [city: string]: {
          districts: string[];
        };
      };
    };
  };
}

async function fetchLocations(): Promise<LocationsData> {
  try {
    const cityDistricts = await apiClient.getCityDistricts();
    
    // Transform API data into the expected format
    const locations: LocationsData = {
      countries: {}
    };

    cityDistricts.forEach(item => {
      // Initialize country if it doesn't exist
      if (!locations.countries[item.country]) {
        locations.countries[item.country] = {
          cities: {}
        };
      }

      // Initialize city if it doesn't exist
      if (!locations.countries[item.country].cities[item.city_slug]) {
        locations.countries[item.country].cities[item.city_slug] = {
          districts: []
        };
      }

      // Add district if it's not already included
      if (!locations.countries[item.country].cities[item.city_slug].districts.includes(item.district_slug)) {
        locations.countries[item.country].cities[item.city_slug].districts.push(item.district_slug);
      }
    });

    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    // Fallback to empty structure if API fails
    return { countries: {} };
  }
}

// Export an async function to get locations
export async function getLocations(): Promise<LocationsData> {
  return await fetchLocations();
}

// For backward compatibility, export empty locations initially
export const locations: LocationsData = {
  countries: {}
}; 