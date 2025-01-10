import React from 'react';
import { Container, Title, Button, Group, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, formatDisplayText } from '../utils/routes';
import { services } from '../data/services';

export default function TypePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, , type] = location.pathname.split('/');
  
  // 用於調試
  console.log('Current type:', type);
  console.log('Available types:', Object.keys(services.types));

  // 獲取所有城市
  const cities = [...new Set(
    Object.values(businesses).flatMap(country => 
      Object.keys(country)
    )
  )];

  // 過濾符合當前type的所有商家
  const filteredBusinesses = [];
  Object.entries(businesses).forEach(([country, countryCities]) => {
    Object.entries(countryCities).forEach(([city, districts]) => {
      Object.entries(districts).forEach(([district, businessList]) => {
        businessList
          .filter(business => {
            // 用於調試
            console.log('Checking business:', {
              businessType: business.type,
              type,
              match: business.type === type
            });
            return business.type === type;
          })
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

  // 用於調試
  console.log('Filtered businesses:', filteredBusinesses);

  const breadcrumbItems = [
    {
      label: formatDisplayText(type),
      path: generatePath.type(type)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {services.types[type]?.displayName || formatDisplayText(type)}
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
              onClick={() => navigate(generatePath.city(type, city.toLowerCase()))}
              sx={{ flexShrink: 0 }}
            >
              {formatDisplayText(type)} in {city}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
