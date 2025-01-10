import React from 'react';
import { Container, Title, Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import BusinessGrid from '../components/BusinessGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import { businesses } from '../data/businesses';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function HomePage() {
  const navigate = useNavigate();

  // 從 services.js 動態獲取所有服務類型
  const types = Object.keys(services.types);

  // 獲取所有商家並添加位置信息
  const allBusinesses = [];
  Object.entries(businesses).forEach(([country, cities]) => {
    Object.entries(cities).forEach(([city, districts]) => {
      Object.entries(districts).forEach(([district, businessList]) => {
        businessList.forEach(business => {
          allBusinesses.push({
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

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={[]} />
      <Title order={1} align="center" mb="xl">
        Hair Services Directory
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
          {types.map((type) => (
            <Button
              key={type}
              variant="light"
              onClick={() => navigate(generatePath.type(type))}
              sx={{ flexShrink: 0 }}
            >
              {services.types[type].displayName}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={allBusinesses} />
    </Container>
  );
}
