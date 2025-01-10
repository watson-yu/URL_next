import React from 'react';
import { Container, Title, Button, Group, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function TypePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, , type] = location.pathname.split('/');
  
  const typeInfo = services.types[type];
  
  const cities = [...new Set(
    Object.values(businesses).flatMap(country => 
      Object.keys(country)
    )
  )];

  const filteredBusinesses = [];
  Object.entries(businesses).forEach(([country, countryCities]) => {
    Object.entries(countryCities).forEach(([city, districts]) => {
      Object.entries(districts).forEach(([district, businessList]) => {
        businessList
          .filter(business => business.type === type)
          .forEach(business => {
            filteredBusinesses.push({
              ...business,
              location: {
                country,
                city,
                district
              }
            });
          });
      });
    });
  });

  const breadcrumbItems = [
    {
      label: typeInfo?.displayName || format.toDisplayFormat(type),
      path: generatePath.type(type)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo?.displayName || format.toDisplayFormat(type)}
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
          {cities.map((city) => (
            <Button
              key={city}
              variant="light"
              onClick={() => navigate(generatePath.city(type, format.toStorageFormat(city)))}
              sx={{ flexShrink: 0 }}
            >
              {typeInfo?.displayName || format.toDisplayFormat(type)} in {format.toDisplayFormat(city)}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid 
        businesses={filteredBusinesses}
        currentType={type}
      />
    </Container>
  );
}
