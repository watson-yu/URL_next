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

export default function CityPage() {
  const navigate = useNavigate();
  const { type, city } = useParams();
  
  console.log('CityPage params:', { type, city }); // Debug
  
  const typeInfo = services.types[type];
  const businessList = businesses.getByTypeAndCity(type, city);
  
  console.log('Type info:', typeInfo); // Debug
  console.log('Businesses found:', businessList?.length); // Debug

  // 如果類型不存在，顯示錯誤頁面
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

  // 如果城市不存在，顯示錯誤頁面
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
  console.log('Available districts:', districts); // Debug

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

  // 服務按鈕
  const renderServiceButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Available Services</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {typeInfo.services.map((service) => (
          <Button
            key={service}
            variant="light"
            color={typeInfo.color}
            onClick={() => {
              console.log('Navigating to service:', { type, service, city }); // Debug
              navigate(generatePath.serviceCity(type, service, city));
            }}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(service)}
          </Button>
        ))}
      </Group>
    </Box>
  );

  // 區域按鈕
  const renderDistrictButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Districts in {format.toDisplay(city)}</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {districts.map((district) => (
          <Button
            key={district}
            variant="light"
            onClick={() => {
              console.log('Navigating to district:', { type, city, district }); // Debug
              navigate(generatePath.district(type, city, district));
            }}
            sx={{ flexShrink: 0 }}
          >
            {`${typeInfo.displayName} in ${format.toDisplay(district)}`}
          </Button>
        ))}
      </Group>
    </Box>
  );

  // 其他商家類別按鈕
  const renderOtherTypeButtons = () => {
    const otherTypes = Object.entries(services.types)
      .filter(([t]) => t !== type);

    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Other Business Types</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {otherTypes.map(([t, info]) => (
            <Button
              key={t}
              variant="light"
              onClick={() => navigate(generatePath.city(t, city))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo.displayName} in {format.toDisplay(city)}
      </Title>

      <SearchBar />
      {renderServiceButtons()}
      {renderDistrictButtons()}
      {renderOtherTypeButtons()}
      <BusinessGrid businesses={businessList} />
    </Container>
  );
}
