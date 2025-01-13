import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { getBusinessesByTypeAndCityAndDistrict } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function DistrictPage() {
  console.log('DistrictPage rendering'); // 調試用
  const navigate = useNavigate();
  const { type, city, district } = useParams();
  
  console.log('DistrictPage params:', { type, city, district }); // 調試用
  
  const typeInfo = services.types[type];
  console.log('TypeInfo:', typeInfo); // 調試用

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

  const businesses = getBusinessesByTypeAndCityAndDistrict(type, city, district);
  console.log('Businesses:', businesses); // 調試用

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

  if (!locationUtils.isDistrictValid(city, district)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          District Not Found
        </Title>
        <Text align="center" mb="xl">
          The district "{format.toDisplay(district)}" does not exist in {format.toDisplay(city)}.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.city(type, city))}>
            Back to {format.toDisplay(city)}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

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
      label: format.toDisplay(district),
      path: generatePath.district(type, city, district)
    }
  ];

  const handleServiceClick = (serviceOption) => {
    console.log('Service click:', { type, service: serviceOption, city, district }); // 調試用
    navigate(generatePath.serviceDistrict(type, serviceOption, city, district));
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo.displayName} in {format.toDisplay(district)}, {format.toDisplay(city)}
      </Title>
      <UnifiedSearchBar />
      
      {/* 服務按鈕 */}
      <Box mb="xl">
        <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
          {typeInfo.services.map((serviceOption) => (
            <Button
              key={serviceOption}
              variant="light"
              onClick={() => handleServiceClick(serviceOption)}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplay(serviceOption)}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={businesses} />
    </Container>
  );
}
