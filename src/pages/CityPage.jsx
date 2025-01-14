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
  const typeInfo = services.types[type];
  const districts = locationUtils.getDistrictsForCity(city);

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

  const businessList = businesses.getByTypeAndCity(type, city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      actualPath: generatePath.actual.type(type)
    },
    {
      label: format.toDisplay(city),
      path: generatePath.display.city(type, city),
      actualPath: generatePath.actual.city(type, city)
    }
  ];

  // 服務項目按鈕（包含當前商家類別）
  const renderServiceButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Available Services</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {/* 當前商家類別按鈕 */}
        <Button
          variant="filled"
          color={typeInfo.color}
          onClick={() => navigate(generatePath.actual.city(type, city))}
          sx={{ flexShrink: 0 }}
        >
          {typeInfo.displayName}
        </Button>
        {/* 服務項目按鈕 */}
        {typeInfo.services.map((service) => (
          <Button
            key={service}
            variant="light"
            color={typeInfo.color}
            onClick={() => navigate(generatePath.actual.serviceCity(type, service, city))}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(service)}
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
              onClick={() => navigate(generatePath.actual.city(t, city))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  // 行政區列表
  const renderDistrictButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">{typeInfo.displayName} in Districts</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {districts.map((district) => (
          <Button
            key={district}
            variant="light"
            onClick={() => navigate(generatePath.actual.district(type, city, district))}
            sx={{ flexShrink: 0 }}
          >
            {`${typeInfo.displayName} in ${format.toDisplay(district)}`}
          </Button>
        ))}
      </Group>
    </Box>
  );

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      {renderServiceButtons()}
      <Title order={2} size="h3" mb="md" sx={{ textAlign: 'left' }}>
        Best {typeInfo.displayName}s near me in {format.toDisplay(city)}
      </Title>
      <BusinessGrid businesses={businessList} />
      {renderOtherTypeButtons()}
      {renderDistrictButtons()}
    </Container>
  );
}
