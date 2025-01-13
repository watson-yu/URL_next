import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { getBusinessesByTypeAndServiceAndCity } from '../data/businesses';
import { generatePath, locationUtils, parseServiceCity } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const { type, serviceCity } = useParams();
  const { service, city } = parseServiceCity(serviceCity);
  
  console.log('ServiceCityPage params:', { type, serviceCity, parsed: { service, city } }); // 調試用
  
  const typeInfo = services.types[type];

  if (!typeInfo) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Service Type Not Found
        </Title>
        <Text align="center" mb="xl">
          The service type does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  // 檢查服務是否存在於該類型中
  if (!typeInfo.services.includes(service)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Service Not Found
        </Title>
        <Text align="center" mb="xl">
          The service "{format.toDisplay(service)}" is not available for {typeInfo.displayName}.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {typeInfo.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  // 獲取同時滿足類型、服務和城市條件的商家
  const businesses = getBusinessesByTypeAndServiceAndCity(type, service, city);
  console.log('Filtered businesses:', businesses); // 調試用

  if (!locationUtils.isCityValid(city)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          City Not Found
        </Title>
        <Text align="center" mb="xl">
          The city "{format.toDisplay(city)}" does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {typeInfo.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const districts = locationUtils.getDistrictsForCity(city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.type(type)
    },
    {
      label: format.toDisplay(city),
      path: generatePath.city(type, city)
    },
    {
      label: format.toDisplay(service),
      path: generatePath.serviceCity(type, service, city)
    }
  ];

  // ... rest of the component remains the same ...
}
