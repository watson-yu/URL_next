import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Box } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { getBusinessesByType } from '../data/businesses';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function TypePage() {
  console.log('TypePage rendering'); // 調試用
  const navigate = useNavigate();
  const { type } = useParams();
  
  console.log('TypePage params:', { type }); // 調試用
  
  const typeInfo = services.types[type];
  console.log('TypeInfo:', typeInfo); // 調試用

  const businesses = getBusinessesByType(type);
  console.log('Businesses:', businesses); // 調試用
  
  // 獲取所有可用的城市
  const cities = [...new Set(businesses.map(b => b.location.city))].sort();
  console.log('Available cities:', cities); // 調試用

  const breadcrumbItems = [
    {
      label: typeInfo?.displayName,
      path: generatePath.type(type)
    }
  ];

  const handleCityClick = (city) => {
    console.log('City click:', { type, city }); // 調試用
    navigate(generatePath.city(type, city));
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo?.displayName}
      </Title>
      <UnifiedSearchBar />
      
      {/* 城市按鈕 */}
      <Box 
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          marginBottom: 'xl',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbarWidth': 'none'
        }}
      >
        <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
          {cities.map((city) => (
            <Button
              key={city}
              variant="light"
              onClick={() => handleCityClick(city)}
              sx={{ flexShrink: 0 }}
            >
              {`${typeInfo?.displayName} in ${format.toDisplay(city)}`}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={businesses} />
    </Container>
  );
}
