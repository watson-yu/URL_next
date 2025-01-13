import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { getBusinessesByTypeAndCity } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function CityPage() {
  console.log('CityPage rendering'); // 調試用
  const navigate = useNavigate();
  const { type, city } = useParams();
  
  console.log('CityPage params:', { type, city }); // 調試用
  
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

  const businesses = getBusinessesByTypeAndCity(type, city);
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

  const districts = locationUtils.getDistrictsForCity(city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.type(type)
    },
    {
      label: format.toDisplay(city),
      path: generatePath.city(type, city)
    }
  ];

  const handleServiceClick = (serviceOption) => {
    console.log('Service click:', { type, service: serviceOption, city }); // 調試用
    navigate(generatePath.serviceCity(type, serviceOption, city));
  };

  const handleDistrictClick = (district) => {
    console.log('District click:', { type, city, district }); // 調試用
    navigate(generatePath.district(type, city, district));
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo.displayName} in {format.toDisplay(city)}
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
      
      {/* 區域按鈕 */}
      <Box mb="xl">
        <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
          {districts.map((district) => (
            <Button
              key={district}
              variant="light"
              onClick={() => handleDistrictClick(district)}
              sx={{ flexShrink: 0 }}
            >
              {`${typeInfo.displayName} in ${format.toDisplay(district)}`}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={businesses} />
    </Container>
  );
}
