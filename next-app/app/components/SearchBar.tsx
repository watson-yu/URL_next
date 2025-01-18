'use client';

import { Paper, Autocomplete, Group } from '@mantine/core';
import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServices } from '@/data/services';
import { format } from '@/utils/format';
import { MAX_SUGGESTIONS } from '@/constants';
import { getLocations } from '@/data/locations';
import { LoadingDisplay } from './LoadingDisplay';
import { ErrorDisplay } from './ErrorDisplay';

export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{
    value: string;
    type: string;
    city: string;
    service?: string;
    action: () => void;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSuggestions() {
      try {
        setIsLoading(true);
        const [locationsData, servicesData] = await Promise.all([
          getLocations(),
          getServices()
        ]);
        
        const uniqueSuggestions = new Set<string>();
        const allSuggestions: Array<{
          value: string;
          type: string;
          city: string;
          service?: string;
          action: () => void;
        }> = [];

        Object.entries(servicesData.types).forEach(([type, info]) => {
          Object.entries(locationsData.countries).forEach(([_, countryData]) => {
            Object.keys(countryData.cities).forEach(city => {
              const suggestionValue = `${info.displayName} in ${format.toDisplay(city)}`;
              
              // Only add if this suggestion hasn't been seen before
              if (!uniqueSuggestions.has(suggestionValue)) {
                uniqueSuggestions.add(suggestionValue);
                allSuggestions.push({
                  value: suggestionValue,
                  type,
                  city,
                  action: () => router.push(`/v/${type}/${city}`)
                });
              }
            });
          });

          // Add service-specific suggestions
          info.services?.forEach(service => {
            Object.entries(locationsData.countries).forEach(([_, countryData]) => {
              Object.keys(countryData.cities).forEach(city => {
                const suggestionValue = `${format.toDisplay(service)} in ${format.toDisplay(city)}`;
                
                // Only add if this suggestion hasn't been seen before
                if (!uniqueSuggestions.has(suggestionValue)) {
                  uniqueSuggestions.add(suggestionValue);
                  allSuggestions.push({
                    value: suggestionValue,
                    type,
                    city,
                    service,
                    action: () => router.push(`/t/${service}/${city}`)
                  });
                }
              });
            });
          });
        });

        setSuggestions(allSuggestions.slice(0, MAX_SUGGESTIONS));
        setError(null);
      } catch (error) {
        console.error('Error loading suggestions:', error);
        setError('Failed to load suggestions');
      } finally {
        setIsLoading(false);
      }
    }

    loadSuggestions();
  }, [router]);

  const handleSearch = (searchValue: string) => {
    const suggestion = suggestions.find(s => s.value === searchValue);
    if (suggestion) {
      suggestion.action();
    }
  };

  if (isLoading) {
    return <LoadingDisplay message="Loading search suggestions..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <Paper shadow="xs" p="md" mb="xl">
      <Group gap={8} grow>
        <Autocomplete
          value={value}
          onChange={setValue}
          data={suggestions.map(s => s.value)}
          placeholder="Try 'Hair Salon in Taipei' or 'Haircut in Taipei'"
          onOptionSubmit={handleSearch}
        />
        <Button onClick={() => handleSearch(value)} style={{ flexGrow: 0 }}>
          Search
        </Button>
      </Group>
    </Paper>
  );
} 