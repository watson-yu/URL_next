import React from 'react';
import { Container, Title, Button, Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { ROUTES, generatePath } from '../utils/routes';

export default function TypePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 從URL路徑解析參數
  const [, , type] = location.pathname.split('/');
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 獲取所有城市
  const cities = ROUTES.CITIES;

  // 過濾符合當前type的所有商家
  const filteredBusinesses = [];
  Object.entries(businesses).forEach(([country, countryCities]) => {
    Object.entries(countryCities).forEach(([city, districts]) => {
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
      path: generatePath.type(type)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formatDisplayText(type)}
      </Title>
      <UnifiedSearchBar />
      
      {/* 城市按鈕列表 */}
      <Group position="center" spacing="sm" mb="xl">
        {cities.map((city) => (
          <Button
            key={city}
            variant="light"
            onClick={() => navigate(generatePath.city(type, city))}
          >
            {formatDisplayText(type)} in {formatDisplayText(city)}
          </Button>
        ))}
      </Group>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
