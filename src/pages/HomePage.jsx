import React from 'react';
import { Container, Title } from '@mantine/core';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';

export default function HomePage() {
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
      <Title order={1} align="center" mb="xl">
        Hair Services Directory
      </Title>
      <UnifiedSearchBar />
      <BusinessGrid businesses={allBusinesses} />
    </Container>
  );
}
