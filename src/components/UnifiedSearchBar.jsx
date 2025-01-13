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

  // 生成搜尋建議
  const generateSuggestions = () => {
    const suggestions = [];
    
    // 添加所有服務類型
    Object.entries(services.types).forEach(([type, info]) => {
      suggestions.push({
        value: info.displayName,
        type,
        city: null,
        district: null
      });

      // 添加城市組合
      locationUtils.getAllCities().forEach(city => {
        suggestions.push({
          value: `${info.displayName} in ${format.toDisplay(city)}`,
          type,
          city,
          district: null
        });

        // 添加服務組合
        info.services.forEach(service => {
          suggestions.push({
            value: `${format.toDisplay(service)} at ${info.displayName} in ${format.toDisplay(city)}`,
            type,
            service,
            city,
            district: null
          });
        });
      });
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const handleSearch = (selectedValue) => {
    const selected = suggestions.find(s => s.value === selectedValue);
    if (!selected) return;

    const { type, service, city, district } = selected;

    if (service && city) {
      navigate(generatePath.serviceCity(type, service, city));
    } else if (city) {
      navigate(generatePath.city(type, city));
    } else {
      navigate(generatePath.type(type));
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
