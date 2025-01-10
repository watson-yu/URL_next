import React from 'react';
import { Container, Title, Button, Group, Divider, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils, formatDisplayText } from '../utils/routes';
import { services } from '../data/services';

export default function CityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, city] = location.pathname.split('/');
  
  const formattedCity = formatDisplayText(city);
  const formattedType = formatDisplayText(type);

  // 驗證城市是否存在
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

  const country = locationUtils.getCountryForCity(formattedCity);
  const typeServices = services.types[type.toLowerCase()]?.services || [];

  // 過濾當前type的商家列表
  const filteredBusinesses = [];
  Object.entries(businesses[country][formattedCity] || {}).forEach(([district, businessList]) => {
    businessList
      .filter(business => 
        business.type.toLowerCase() === formattedType.toLowerCase()
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
      label: formattedType,
      path: generatePath.type(type)
    },
    {
      label: formattedCity,
      path: generatePath.city(type, city)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formattedType} in {formattedCity}
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
            onClick={() => navigate(generatePath.type(type))}
            sx={{ flexShrink: 0 }}
          >
            {formattedType} in {formattedCity}
          </Button>

          <Divider orientation="vertical" />

          {typeServices.map((service) => (
            <Button
              key={service}
              variant="light"
              onClick={() => navigate(generatePath.serviceCity(
                type, 
                service.toLowerCase().replace(/ /g, '-'), 
                city
              ))}
              sx={{ flexShrink: 0 }}
            >
              {service} in {formattedCity}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
