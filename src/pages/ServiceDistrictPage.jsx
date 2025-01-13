import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { getBusinessesByTypeAndServiceAndCityAndDistrict } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceDistrictPage() {
  console.log('ServiceDistrictPage rendering'); // 調試用
  const navigate = useNavigate();
  const { type, service, city, district } = useParams();
  
  console.log('ServiceDistrictPage params:', { type, service, city, district }); // 調試用
  
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

  // 獲取同時滿足類型、服務、城市和區域條件的商家
  const businesses = getBusinessesByTypeAndServiceAndCityAndDistrict(type, service, city, district);
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
          <Button onClick={() => navigate(generatePath.serviceCity(type, service, city))}>
            Back to {format.toDisplay(service)} in {format.toDisplay(city)}
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
      label: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
      path: generatePath.serviceCity(type, service, city)
    },
    {
      label: format.toDisplay(district),
      path: generatePath.serviceDistrict(type, service, city, district)
    }
  ];

  const handleServiceClick = (serviceOption) => {
    navigate(generatePath.serviceDistrict(type, serviceOption, city, district));
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {format.toDisplay(service)} at {typeInfo.displayName} in {format.toDisplay(district)}, {format.toDisplay(city)}
      </Title>
      <UnifiedSearchBar />
      
      {/* 服務按鈕 */}
      <Box mb="xl">
        <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
          {typeInfo.services.map((serviceOption) => (
            <Button
              key={serviceOption}
              variant={service === serviceOption ? "filled" : "light"}
              color={typeInfo.color}
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
