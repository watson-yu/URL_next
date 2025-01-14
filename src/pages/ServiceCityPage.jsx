import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const { type, service, city } = useParams();
  const typeInfo = services.types[type];
  const districts = locationUtils.getDistrictsForCity(city);

  // 錯誤處理
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
          <Button onClick={() => navigate(generatePath.actual.type(type))}>
            Back to {typeInfo.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

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
          <Button onClick={() => navigate(generatePath.actual.city(type, city))}>
            Back to {typeInfo.displayName} in {format.toDisplay(city)}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const businessList = businesses.getByTypeAndServiceAndCity(type, service, city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      actualPath: generatePath.actual.type(type)
    },
    {
      label: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
      path: generatePath.display.serviceCity(type, service, city),
      actualPath: generatePath.actual.serviceCity(type, service, city)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {format.toDisplay(service)} in {format.toDisplay(city)}
      </Title>

      <SearchBar />

      {/* District Buttons */}
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Available Districts</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {districts.map((district) => (
            <Button
              key={district}
              variant="light"
              onClick={() => navigate(generatePath.actual.serviceDistrict(type, service, city, district))}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplay(district)}
            </Button>
          ))}
        </Group>
      </Box>

      {/* Other Services */}
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Other Services</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {typeInfo.services
            .filter(s => s !== service)
            .map((otherService) => (
              <Button
                key={otherService}
                variant="light"
                color={typeInfo.color}
                onClick={() => navigate(generatePath.actual.serviceCity(type, otherService, city))}
                sx={{ flexShrink: 0 }}
              >
                {format.toDisplay(otherService)}
              </Button>
            ))}
        </Group>
      </Box>

      <BusinessGrid businesses={businessList} />
    </Container>
  );
}
