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

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, serviceCityPath] = location.pathname.split('/');
  const [service, city] = serviceCityPath.split('-');
  
  const formattedCity = format.toDisplayFormat(city);
  const typeInfo = services.types[type];
  const currentService = format.toStorageFormat(service);

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

  const country = locationUtils.getCountryForCity(formattedCity);

  const filteredBusinesses = [];
  Object.entries(businesses[country][formattedCity]).forEach(([district, businessList]) => {
    businessList
      .filter(business => 
        business.type === type && 
        business.services.includes(currentService)
      )
      .forEach(business => {
        filteredBusinesses.push({
          ...business,
          location: {
            country,
            city: formattedCity,
            district
          }
        });
      });
  });

  const breadcrumbItems = [
    {
      label: typeInfo?.displayName,
      path: generatePath.type(type)
    },
    {
      label: `${format.toDisplayFormat(service)} - ${formattedCity}`,
      path: generatePath.serviceCity(type, service, city)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {format.toDisplayFormat(service)} at {typeInfo?.displayName} in {formattedCity}
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
          {typeInfo?.services.map((serviceOption) => (
            <Button
              key={serviceOption}
              variant={currentService === serviceOption ? "filled" : "light"}
              onClick={() => navigate(generatePath.serviceCity(
                type,
                format.toStorageFormat(serviceOption),
                city
              ))}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplayFormat(serviceOption)}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid 
        businesses={filteredBusinesses}
        currentType={type}
        city={city}
      />
    </Container>
  );
}
