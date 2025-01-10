import React from 'react';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils, parseTypeService } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function DistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , typeService, city, district] = location.pathname.split('/');
  const { type, service } = parseTypeService(typeService);
  
  const formattedCity = format.toDisplayFormat(city);
  const formattedDistrict = format.toDisplayFormat(district);
  const typeInfo = services.types[type];

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
            Back to {typeInfo?.displayName}
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
          <Button onClick={() => navigate(generatePath.city(typeService, city))}>
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

  // 過濾符合條件的商家
  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => {
      const typeMatch = business.type === type;
      if (service) {
        return typeMatch && business.services.includes(service);
      }
      return typeMatch;
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
      label: typeInfo?.displayName,
      path: generatePath.type(type)
    },
    {
      label: formattedCity,
      path: generatePath.city(typeService, city)
    },
    {
      label: formattedDistrict,
      path: generatePath.district(typeService, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {service ? 
          `${format.toDisplayFormat(service)} at ${typeInfo?.displayName} in ${formattedDistrict}, ${formattedCity}` :
          `${typeInfo?.displayName} in ${formattedDistrict}, ${formattedCity}`
        }
      </Title>
      <UnifiedSearchBar />
      
      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
