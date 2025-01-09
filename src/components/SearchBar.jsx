import React, { useState, useEffect } from 'react';
import { Paper, Stack, Select, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { businesses } from '../data/businesses';
import { generatePath } from '../routes/paths';

export default function SearchBar({ initialType, initialCity, initialDistrict, initialService, onFilter }) {
  const navigate = useNavigate();
  const [type, setType] = useState(initialType || '');
  const [city, setCity] = useState(initialCity || '');
  const [district, setDistrict] = useState(initialDistrict || '');
  const [service, setService] = useState(initialService || '');

  useEffect(() => {
    setType(initialType || '');
    setCity(initialCity || '');
    setDistrict(initialDistrict || '');
    setService(initialService || '');
  }, [initialType, initialCity, initialDistrict, initialService]);

  const handleSearch = () => {
    if (onFilter) {
      onFilter({ type, city, district, service });
      return;
    }

    if (type && city && district && service) {
      navigate(generatePath.serviceDistrict(type, service, city, district));
    } else if (type && city && district) {
      navigate(generatePath.district(type, city, district));
    } else if (type && city && service) {
      navigate(generatePath.serviceCity(type, service, city));
    } else if (type && city) {
      navigate(generatePath.city(type, city));
    } else if (type) {
      navigate(generatePath.type(type));
    }
  };

  return (
    <Paper shadow="xs" p="md" mb="xl">
      <Stack spacing="md">
        <Select
          label="Location Type"
          placeholder="Select type"
          data={['Beauty Salon', 'Barbershop']}
          value={type}
          onChange={setType}
        />

        <Select
          label="Service"
          placeholder="Select service"
          data={['Haircut', 'Hair Coloring', 'Shaving']}
          value={service}
          onChange={setService}
        />

        <Select
          label="City"
          placeholder="Select city"
          data={['Taipei', 'Kaohsiung', 'Tokyo', 'Kyoto']}
          value={city}
          onChange={(value) => {
            setCity(value);
            setDistrict('');
          }}
          disabled={!type}
        />

        <Select
          label="District"
          placeholder="Select district"
          data={city ? Object.keys(businesses[city === 'Taipei' || city === 'Kaohsiung' ? 'Taiwan' : 'Japan'][city]) : []}
          value={district}
          onChange={setDistrict}
          disabled={!city}
        />

        <Button onClick={handleSearch} disabled={!type}>
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
