import React from 'react';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function DistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, city, district] = location.pathname.split('/');
  
  const formattedCity = format.toDisplayFormat(city);
  const formattedDistrict = format.toDisplayFormat(district);
  const formattedType = format.toDisplayFormat(type);

  // 驗證城市和區域是否存在
  if (!locationUtils.isCityValid(formattedCity)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          City Not Found
        </Title>
        <Text align="center" mb="xl">
          The city "{formattedCity}" does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {formattedType}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  if (!locationUtils.isDistrictValid(formattedCity, formattedDistrict)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          District Not Found
        </Title>
        <Text align="center" mb="xl">
          The district "{formattedDistrict}" does not exist in {formattedCity}.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.city(type, city))}>
            Back to {formattedCity}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const country = locationUtils.getCountryForCity(formattedCity);
  const typeServices = services.types[type]?.services || [];

  // 過濾當前district的商家列表
  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => business.type === type)
    .map(business => ({
      ...business,
      location: {
        country,
        city: formattedCity,
        district: formattedDistrict
      }
    }));

  const breadcrumbItems = [
    {
      label: formattedType,
      path: generatePath.type(type)
    },
    {
      label: formattedCity,
      path: generatePath.city(type, city)
    },
    {
      label: formattedDistrict,
      path: generatePath.district(type, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formattedType} in {formattedDistrict}, {formattedCity}
      </Title>
      <UnifiedSearchBar />
      
      <Box 
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          marginBottom: 'xl',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbarWidth': 'none'
        }}
      >
        <Group 
          spacing="sm" 
          noWrap
          sx={{
            padding: '4px',
          }}
        >
          <Button
            variant="light"
            onClick={() => navigate(generatePath.city(type, city))}
            sx={{ flexShrink: 0 }}
          >
            {formattedType} in {formattedCity}
          </Button>

          {typeServices.map((service) => (
            <Button
              key={service}
              variant="light"
              onClick={() => navigate(generatePath.serviceDistrict(
                type, 
                service, 
                city, 
                district
              ))}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplayFormat(service)} in {formattedDistrict}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
