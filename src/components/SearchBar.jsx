import React, { useState, useEffect } from 'react';
import { Paper, Stack, Select, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { generatePath } from '../utils/routes';
import { services } from '../data/services';
import { format } from '../utils/format';
import { locationUtils } from '../utils/routes';

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

  // 從 services.js 獲取所有服務類型
  const typeOptions = Object.entries(services.types).map(([key, { displayName }]) => ({
    value: key,
    label: displayName
  }));

  // 獲取所有城市
  const cityOptions = locationUtils.getAllCities().map(city => ({
    value: city,
    label: format.toDisplay(city)
  }));

  // 獲取選定城市的區域
  const districtOptions = city ? 
    locationUtils.getDistrictsForCity(city).map(district => ({
      value: district,
      label: format.toDisplay(district)
    })) : [];

  // 獲取選定類型的服務
  const serviceOptions = type ? 
    services.types[type]?.services.map(service => ({
      value: service,
      label: format.toDisplay(service)
    })) : [];

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
          data={typeOptions}
          value={type}
          onChange={setType}
        />

        <Select
          label="Service"
          placeholder="Select service"
          data={serviceOptions}
          value={service}
          onChange={setService}
          disabled={!type}
        />

        <Select
          label="City"
          placeholder="Select city"
          data={cityOptions}
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
          data={districtOptions}
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
