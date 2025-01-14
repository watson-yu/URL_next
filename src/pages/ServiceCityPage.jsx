import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const { type, service, city } = useParams();
  const typeInfo = services.types[type];
  const districts = locationUtils.getDistrictsForCity(city);

  // 錯誤處理
  if (!typeInfo || !locationUtils.isCityValid(city)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Location Not Found
        </Title>
        <Text align="center" mb="xl">
          The specified location does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.actual.type(type))}>
            Back to {typeInfo?.displayName || 'Home'}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const businessList = businesses.getByTypeAndServiceAndCity(type, service, city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      // 修改這裡：點擊類型時導航到對應的城市頁面
      actualPath: generatePath.actual.city(type, city)
    },
    {
      label: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
      path: generatePath.display.serviceCity(type, service, city),
      actualPath: generatePath.actual.serviceCity(type, service, city)
    }
  ];

  // 服務項目按鈕（當前服務排第一，其他依序排列）
  const renderServiceButtons = () => {
    const otherServices = typeInfo.services.filter(s => s !== service);
    
    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Available Services</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {/* 當前服務按鈕 */}
          <Button
            variant="filled"
            color={typeInfo.color}
            onClick={() => navigate(generatePath.actual.serviceCity(type, service, city))}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(service)}
          </Button>
          {/* 其他服務按鈕 */}
          {otherServices.map((otherService) => (
            <Button
              key={otherService}
              variant="light"
              color={typeInfo.color}
              onClick={() => navigate(generatePath.actual.serviceCity(type, otherService, city))}
              sx={{ flexShrink: 0 }}
            >
              {format.toDisplay(otherService)}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  // 其他商家類別按鈕
  const renderOtherTypeButtons = () => {
    const otherTypes = Object.entries(services.types)
      .filter(([t]) => t !== type);

    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Other Business Types</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {otherTypes.map(([t, info]) => (
            <Button
              key={t}
              variant="light"
              onClick={() => navigate(generatePath.actual.city(t, city))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  // 行政區列表
  const renderDistrictButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">{format.toDisplay(service)} in Districts</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {districts.map((district) => (
          <Button
            key={district}
            variant="light"
            onClick={() => navigate(generatePath.actual.serviceDistrict(type, service, city, district))}
            sx={{ flexShrink: 0 }}
          >
            {`${format.toDisplay(service)} in ${format.toDisplay(district)}`}
          </Button>
        ))}
      </Group>
    </Box>
  );

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      {renderServiceButtons()}
      <BusinessGrid businesses={businessList} />
      {renderOtherTypeButtons()}
      {renderDistrictButtons()}
    </Container>
  );
}
