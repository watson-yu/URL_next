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

export default function DistrictPage() {
  const navigate = useNavigate();
  const { type, city, district } = useParams();
  console.log('DistrictPage params:', { type, city, district }); // Debug

  const typeInfo = services.types[type];
  const businessList = businesses.getByTypeAndCityAndDistrict(type, city, district);
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

  // 如果城市或區域不存在，顯示錯誤頁面
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
            onClick={() => navigate(generatePath.serviceDistrict(type, service, city, district))}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(service)}
          </Button>
        ))}
      </Group>
    </Box>
  );

  // 其他區域按鈕
  const renderOtherDistrictButtons = () => {
    const otherDistricts = locationUtils.getDistrictsForCity(city)
      .filter(d => d !== district);

    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Other Districts in {format.toDisplay(city)}</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {otherDistricts.map((d) => (
            <Button
              key={d}
              variant="light"
              onClick={() => navigate(generatePath.district(type, city, d))}
              sx={{ flexShrink: 0 }}
            >
              {`${typeInfo.displayName} in ${format.toDisplay(d)}`}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

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
              onClick={() => navigate(generatePath.district(t, city, district))}
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
        {typeInfo.displayName} in {format.toDisplay(district)}, {format.toDisplay(city)}
      </Title>

      <SearchBar />
      {renderServiceButtons()}
      {renderOtherDistrictButtons()}
      {renderOtherTypeButtons()}
      <BusinessGrid businesses={businessList} />
    </Container>
  );
}
