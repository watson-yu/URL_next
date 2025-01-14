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
  const typeInfo = services.types[type];
  const allCities = locationUtils.getAllCities();

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

  const businessList = businesses.getByType(type);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      actualPath: generatePath.actual.type(type)
    }
  ];

  // 此商家類別的城市按鈕
  const renderCityButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">{typeInfo.displayName} by City</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {allCities.map((city) => (
          <Button
            key={city}
            variant="light"
            onClick={() => navigate(generatePath.actual.city(type, city))}
            sx={{ flexShrink: 0 }}
          >
            {`${typeInfo.displayName} in ${format.toDisplay(city)}`}
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
              onClick={() => navigate(generatePath.actual.type(t))}
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
  const renderSearchByCity = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Search by City</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {allCities.map((city) => (
          <Button
            key={city}
            variant="light"
            onClick={() => navigate(generatePath.actual.city(type, city))}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(city)}
          </Button>
        ))}
      </Group>
    </Box>
  );

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      {renderCityButtons()}
      <BusinessGrid businesses={businessList} />
      {renderOtherTypeButtons()}
      {renderSearchByCity()}
    </Container>
  );
}
