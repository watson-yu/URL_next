import React from 'react';
import { Container, Title, Button, Group, Divider } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { ROUTES, generatePath } from '../utils/routes';

export default function DistrictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 從URL路徑解析參數
  const [, , type, city, district] = location.pathname.split('/');
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedCity = formatDisplayText(city);
  const formattedDistrict = formatDisplayText(district);
  const formattedType = formatDisplayText(type);
  const country = formattedCity === 'Taipei' || formattedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';

  // 獲取該區域同類型商家的所有服務
  const typeServices = ROUTES.SERVICES[type] || [];

  // 過濾當前district的商家列表
  const filteredBusinesses = (businesses[country][formattedCity][formattedDistrict] || [])
    .filter(business => business.type.toLowerCase() === formattedType.toLowerCase())
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
      label: formattedDistrict,
      path: generatePath.district(type, city, district)
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {formattedType} in {formattedDistrict}, {formattedCity}
      </Title>
      <UnifiedSearchBar />
      
      {/* 按鈕組 */}
      <Group position="center" spacing="sm" mb="xl">
        {/* Type按鈕 */}
        <Button
          variant="light"
          onClick={() => navigate(generatePath.city(type, city))}
        >
          {formattedType} in {formattedCity}
        </Button>

        {/* 分隔線 */}
        <Divider orientation="vertical" />

        {/* 服務按鈕列表 */}
        {typeServices.map((service) => (
          <Button
            key={service}
            variant="light"
            onClick={() => navigate(generatePath.serviceDistrict(type, service, city, district))}
          >
            {formatDisplayText(service)} in {formattedDistrict}
          </Button>
        ))}
      </Group>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
