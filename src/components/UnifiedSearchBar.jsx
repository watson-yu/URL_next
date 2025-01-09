import React, { useState } from 'react';
import { Autocomplete, Paper, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { generatePath } from '../utils/routes';

export default function UnifiedSearchBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const suggestions = [
    'Beauty Salon',
    'Barbershop',
    'Beauty Salon in Taipei',
    'Barbershop in Taipei',
    'Haircut at Beauty Salon',
    'Beauty Salon in Xinyi'
  ];

  const handleSearch = () => {
    if (!value) return;

    const formatUrlSegment = (text) => text.toLowerCase().replace(/ /g, '-');

    if (value.includes('Beauty Salon')) {
      if (value.includes('Xinyi')) {
        navigate(generatePath.district('beauty-salon', 'taipei', 'xinyi'));
      } else if (value.includes('Taipei')) {
        navigate(generatePath.city('beauty-salon', 'taipei'));
      } else {
        navigate(generatePath.type('beauty-salon'));
      }
    } else if (value.includes('Barbershop')) {
      if (value.includes('Taipei')) {
        navigate(generatePath.city('barbershop', 'taipei'));
      } else {
        navigate(generatePath.type('barbershop'));
      }
    }
  };

  return (
    <Paper shadow="xs" p="md" mb="xl">
      <Group spacing={8} noWrap>
        <Autocomplete
          value={value}
          onChange={setValue}
          data={suggestions}
          placeholder="Try 'Beauty Salon in Taipei' or 'Barbershop'"
          sx={{ flex: 1 }}
          onOptionSubmit={(selectedValue) => {
            setValue(selectedValue);
            handleSearch();
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>
          Search
        </Button>
      </Group>
    </Paper>
  );
}
