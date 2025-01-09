import React from 'react';
import { Container, Title, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import BusinessGrid from '../components/BusinessGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import { businesses } from '../data/businesses';
import { ROUTES, generatePath } from '../utils/routes';

export default function HomePage() {
  const navigate = useNavigate();

  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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

      {/* Type按鈕列表 */}
      <Group position="center" spacing="sm" mb="xl">
        {ROUTES.TYPES.map((type) => (
          <Button
            key={type}
            variant="light"
            onClick={() => navigate(generatePath.type(type))}
          >
            {formatDisplayText(type)}
          </Button>
        ))}
      </Group>

      <BusinessGrid businesses={allBusinesses} />
    </Container>
  );
}
