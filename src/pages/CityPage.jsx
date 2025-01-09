import React from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';

export default function CityPage() {
  const { type, city } = useParams();
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedCity = formatDisplayText(city);
  const country = formattedCity === 'Taipei' || formattedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';
  
  // 獲取指定城市和類型的商家，包含完整位置資訊
  const filteredBusinesses = [];
  Object.entries(businesses[country][formattedCity]).forEach(([district, businessList]) => {
    businessList
      .filter(business => 
        business.type.toLowerCase() === formatDisplayText(type).toLowerCase()
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
      label: formatDisplayText(type),
      path: `/${type}`
    },
    {
      label: formattedCity,
      path: `/${type}/${city}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <Title order={1} align="center" mb="md">
        {formatDisplayText(type)} in {formattedCity}
      </Title>
      <UnifiedSearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
