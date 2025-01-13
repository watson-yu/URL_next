import React, { useState } from 'react';
import { Autocomplete, Paper, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';
import { locationUtils } from '../utils/routes';

export default function UnifiedSearchBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const generateSuggestions = () => {
    const suggestions = [];
    
    Object.entries(services.types).forEach(([type, info]) => {
      // 添加服務類型
      suggestions.push({
        value: info.displayName,
        type,
        action: () => navigate(generatePath.type(type))
      });

      // 添加城市組合
      locationUtils.getAllCities().forEach(city => {
        suggestions.push({
          value: `${info.displayName} in ${format.toDisplay(city)}`,
          type,
          city,
          action: () => navigate(generatePath.city(type, city))
        });

        // 添加服務組合
        info.services.forEach(service => {
          suggestions.push({
            value: `${format.toDisplay(service)} at ${info.displayName} in ${format.toDisplay(city)}`,
            type,
            service,
            city,
            action: () => navigate(generatePath.serviceCity(type, service, city))
          });
        });
      });
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const handleSearch = (selectedValue) => {
    const suggestion = suggestions.find(s => s.value === selectedValue);
    if (suggestion) {
      suggestion.action();
    }
  };

  return (
    <Paper shadow="xs" p="md" mb="xl">
      <Group spacing={8} noWrap>
        <Autocomplete
          value={value}
          onChange={setValue}
          data={suggestions.map(s => s.value)}
          placeholder="Try 'Hair Salon in Taipei' or 'Haircut at Beauty Salon'"
          sx={{ flex: 1 }}
          onOptionSubmit={(selectedValue) => {
            setValue(selectedValue);
            handleSearch(selectedValue);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value);
            }
          }}
        />
        <Button onClick={() => handleSearch(value)}>
          Search
        </Button>
      </Group>
    </Paper>
  );
}
