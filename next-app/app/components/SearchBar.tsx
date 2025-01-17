'use client';

import { Paper, Autocomplete, Group } from '@mantine/core';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { MAX_SUGGESTIONS } from '@/constants';

export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const generateSuggestions = () => {
    const suggestions = [];
    
    Object.entries(services.types).forEach(([type, info]) => {
      locationUtils.getAllCities().forEach(city => {
        suggestions.push({
          value: `${info.displayName} in ${format.toDisplay(city)}`,
          type,
          city,
          action: () => router.push(`/home/v/${type}/${city}`)
        });

        info.services.forEach(service => {
          suggestions.push({
            value: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
            type,
            service,
            city,
            action: () => router.push(`/home/t/${service}/${city}`)
          });
        });
      });
    });

    return suggestions.slice(0, MAX_SUGGESTIONS);
  };

  const suggestions = generateSuggestions();

  const handleSearch = (selectedValue: string) => {
    const suggestion = suggestions.find(s => s.value === selectedValue);
    if (suggestion) {
      suggestion.action();
    }
  };

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