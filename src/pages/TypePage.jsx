import React from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';

export default function TypePage() {
  const { type } = useParams();
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 獲取所有符合類型的商家，並加入完整位置資訊
  const filteredBusinesses = [];
  Object.entries(businesses).forEach(([country, cities]) => {
    Object.entries(cities).forEach(([city, districts]) => {
      Object.entries(districts).forEach(([district, businessList]) => {
        businessList
          .filter(business => 
            business.type.toLowerCase() === formatDisplayText(type).toLowerCase()
          )
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
      label: formatDisplayText(type),
      path: `/${type}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <Title order={1} align="center" mb="md">
        {formatDisplayText(type)}
      </Title>
      <UnifiedSearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
