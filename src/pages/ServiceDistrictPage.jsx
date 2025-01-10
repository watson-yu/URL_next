import React from 'react';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';

export default function ServiceDistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, serviceCityPath, serviceDistrictPath] = location.pathname.split('/');
  const [service, city] = serviceCityPath.split('-');
  const [, district] = serviceDistrictPath.split('-');
  
  const formattedCity = format.toDisplayFormat(city);
  const formattedDistrict = format.toDisplayFormat(district);
  const formattedType = format.toDisplayFormat(type);
  const formattedService = format.toDisplayFormat(service);

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

  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => 
      business.type === type && 
      business.services.includes(format.toStorageFormat(service))
    )
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

      <BusinessGrid 
        businesses={filteredBusinesses}
        currentType={type}
        city={city}
        district={district}
      />
    </Container>
  );
}
