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

export default function ServiceDistrictPage() {
  const navigate = useNavigate();
  const { type, service, city, district } = useParams();
  const typeInfo = services.types[type];
  const otherDistricts = locationUtils.getDistrictsForCity(city)?.filter(d => d !== district) || [];

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

  if (!locationUtils.isCityValid(city) || !locationUtils.isDistrictValid(city, district)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Location Not Found
        </Title>
        <Text align="center" mb="xl">
          The specified location does not exist in our directory.
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
          <Button onClick={() => navigate(generatePath.actual.district(type, city, district))}>
            Back to {typeInfo.displayName} in {format.toDisplay(district)}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const businessList = businesses.getByTypeAndServiceAndCityAndDistrict(type, service, city, district);

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
    },
    {
      label: format.toDisplay(district),
      path: generatePath.display.serviceDistrict(type, service, city, district),
      actualPath: generatePath.actual.serviceDistrict(type, service, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {format.toDisplay(service)} in {format.toDisplay(district)}, {format.toDisplay(city)}
      </Title>

      <SearchBar />

      {/* Other Districts */}
      {otherDistricts.length > 0 && (
        <Box mb="xl">
          <Title order={3} size="h4" mb="md">Other Districts</Title>
          <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
            {otherDistricts.map((otherDistrict) => (
              <Button
                key={otherDistrict}
                variant="light"
                onClick={() => navigate(generatePath.actual.serviceDistrict(type, service, city, otherDistrict))}
                sx={{ flexShrink: 0 }}
              >
                {format.toDisplay(otherDistrict)}
              </Button>
            ))}
          </Group>
        </Box>
      )}

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
                onClick={() => navigate(generatePath.actual.serviceDistrict(type, otherService, city, district))}
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
