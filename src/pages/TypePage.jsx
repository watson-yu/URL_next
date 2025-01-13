import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Box, Text, Stack } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function TypePage() {
  const navigate = useNavigate();
  const { type } = useParams();
  console.log('TypePage params:', { type }); // Debug

  const typeInfo = services.types[type];
  const allCities = locationUtils.getAllCities();

  // 如果類型不存在，顯示錯誤頁面
  if (!typeInfo) {
    console.log('Type not found:', type); // Debug
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

  const businessList = businesses.getByType(type);
  console.log('Businesses found:', businessList.length); // Debug

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.type(type)
    }
  ];

  // 此商家類別的城市按鈕
  const renderCityButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Available Cities</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {allCities.map((city) => {
          const handleClick = () => {
            console.log('Navigating to city:', { type, city }); // Debug
            navigate(generatePath.city(type, city));
          };

          return (
            <Button
              key={city}
              variant="light"
              onClick={handleClick}
              sx={{ flexShrink: 0 }}
            >
              {`${typeInfo.displayName} in ${format.toDisplay(city)}`}
            </Button>
          );
        })}
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
              onClick={() => navigate(generatePath.type(t))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  // 依城市搜尋按鈕
  const renderCitySearchButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Search by City</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {allCities.map((city) => (
          <Button
            key={city}
            variant="light"
            onClick={() => navigate(generatePath.city(type, city))}
            sx={{ flexShrink: 0 }}
          >
            {`${typeInfo.displayName} in ${format.toDisplay(city)}`}
          </Button>
        ))}
      </Group>
    </Box>
  );

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo.displayName}
      </Title>

      <SearchBar />
      {renderCityButtons()}
      {renderOtherTypeButtons()}
      {renderCitySearchButtons()}
      <BusinessGrid businesses={businessList} />
    </Container>
  );
}
