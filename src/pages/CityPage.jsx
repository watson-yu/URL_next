import React, { useState } from 'react';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function CityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [, , type, city] = location.pathname.split('/');
  const [selectedService, setSelectedService] = useState(null);
  
  const formattedCity = format.toDisplayFormat(city);
  const typeInfo = services.types[type];

  if (!locationUtils.isCityValid(formattedCity)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          City Not Found
        </Title>
        <Text align="center" mb="xl">
          The city "{formattedCity}" does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {typeInfo?.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const country = locationUtils.getCountryForCity(formattedCity);

  // 過濾符合條件的商家
  const filteredBusinesses = [];
  Object.entries(businesses[country][formattedCity]).forEach(([district, businessList]) => {
    businessList
      .filter(business => {
        const typeMatch = business.type === type;
        if (selectedService) {
          return typeMatch && business.services.includes(selectedService);
        }
        return typeMatch;
      })
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

  // 根據選中的服務更新麵包屑
  const breadcrumbItems = [
    {
      label: typeInfo?.displayName,
      path: generatePath.type(type)
    }
  ];

  if (selectedService) {
    // 如果選中了服務，顯示 "服務 - 城市" 格式
    breadcrumbItems.push({
      label: `${format.toDisplayFormat(selectedService)} - ${formattedCity}`,
      path: generatePath.serviceCity(type, selectedService, city)
    });
  } else {
    // 如果沒有選中服務，只顯示城市
    breadcrumbItems.push({
      label: formattedCity,
      path: generatePath.city(type, city)
    });
  }

  // 處理服務選擇
  const handleServiceClick = (service) => {
    if (selectedService === service) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} align="center" mb="md">
        {typeInfo?.displayName} in {formattedCity}
        {selectedService && ` - ${format.toDisplayFormat(selectedService)}`}
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
          {/* 主要類型按鈕 */}
          <Button
            variant="filled"
            color={typeInfo?.color || 'blue'}
            onClick={() => navigate(generatePath.type(type))}
            sx={{ flexShrink: 0 }}
          >
            {typeInfo?.displayName}
          </Button>

          {/* 服務細項按鈕 */}
          {typeInfo?.services.map((service) => (
            <Button
              key={service}
              variant={selectedService === service ? "filled" : "light"}
              color={selectedService === service ? typeInfo?.color : undefined}
              onClick={() => handleServiceClick(service)}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplayFormat(service)}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
