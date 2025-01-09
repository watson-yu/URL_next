import React from 'react';
import { Container, Title, Button, Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath } from '../utils/routes';

export default function ServiceDistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 從URL路徑解析參數
  const [, , type, serviceCityPath, serviceDistrictPath] = location.pathname.split('/');
  const [service, city] = serviceCityPath.split('-');
  const [, district] = serviceDistrictPath.split('-');
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedCity = formatDisplayText(city);
  const formattedDistrict = formatDisplayText(district);
  const formattedType = formatDisplayText(type);
  const formattedService = formatDisplayText(service);
  const country = formattedCity === 'Taipei' || formattedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';

  // 過濾符合條件的商家
  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => 
      business.type.toLowerCase() === formattedType.toLowerCase() &&
      business.services.includes(formattedService)
    )
    .map(business => ({
      ...business,
      location: {
        country,
        city: formattedCity,
        district: formattedDistrict
      }
    }));

  const breadcrumbItems = [
    {
      label: formattedType,
      path: generatePath.type(type)
    },
    {
      label: formattedCity,
      path: generatePath.city(type, city)
    },
    {
      label: `${formattedService} in ${formattedCity}`,
      path: generatePath.serviceCity(type, service, city)
    },
    {
      label: formattedDistrict,
      path: generatePath.serviceDistrict(type, service, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formattedService} at {formattedType} in {formattedDistrict}, {formattedCity}
      </Title>
      <UnifiedSearchBar />
      
      {/* 返回按鈕 */}
      <Group position="center" spacing="sm" mb="xl">
        <Button
          variant="light"
          onClick={() => navigate(generatePath.serviceCity(type, service, city))}
        >
          {formattedService} in {formattedCity}
        </Button>
      </Group>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
