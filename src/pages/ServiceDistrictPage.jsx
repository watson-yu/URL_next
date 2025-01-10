import React from 'react';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils, formatDisplayText } from '../utils/routes';

export default function ServiceDistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, serviceCityPath, serviceDistrictPath] = location.pathname.split('/');
  const [service, city] = serviceCityPath.split('-');
  const [, district] = serviceDistrictPath.split('-');
  
  const formattedCity = formatDisplayText(city);
  const formattedDistrict = formatDisplayText(district);
  const formattedType = formatDisplayText(type);
  const formattedService = formatDisplayText(service);

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
          <Button onClick={() => navigate(generatePath.serviceCity(type, service, city))}>
            Back to {formattedService} in {formattedCity}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const country = locationUtils.getCountryForCity(formattedCity);

  // 過濾符合條件的商家，注意大小寫問題
  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => {
      const businessType = business.type.toLowerCase().replace(/ /g, '-');
      const hasService = business.services.some(s => 
        s.toLowerCase() === formattedService.toLowerCase()
      );
      return businessType === type.toLowerCase() && hasService;
    })
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
      label: `${formattedService} in ${formattedCity}`,
      path: generatePath.serviceCity(type, service, city)
    },
    {
      label: formattedDistrict,
      path: generatePath.serviceDistrict(type, service, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formattedService} at {formattedType} in {formattedDistrict}, {formattedCity}
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
            onClick={() => navigate(generatePath.serviceCity(type, service, city))}
            sx={{ flexShrink: 0 }}
          >
            {formattedService} in {formattedCity}
          </Button>
        </Group>
      </Box>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
