import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services, getTypeByService } from '../data/services';

export default function ServiceDistrictPage() {
  const navigate = useNavigate();
  const { service, city, district } = useParams();
  const type = getTypeByService(service);
  const typeInfo = type ? services.types[type] : null;
  const allDistricts = locationUtils.getDistrictsForCity(city);

  if (!typeInfo || !locationUtils.isCityValid(city) || !locationUtils.isDistrictValid(city, district)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Location Not Found
        </Title>
        <Text align="center" mb="xl">
          The specified location does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const businessList = businesses.getByTypeAndServiceAndCityAndDistrict(type, service, city, district);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      actualPath: generatePath.actual.type(type)
    },
    {
      label: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
      path: generatePath.display.serviceCity(type, service, city),
      actualPath: generatePath.actual.serviceCity(type, service, city)
    },
    {
      label: format.toDisplay(district),
      path: generatePath.display.serviceDistrict(type, service, city, district),
      actualPath: generatePath.actual.serviceDistrict(type, service, city, district)
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
            onClick={() => navigate(generatePath.actual.serviceDistrict(type, service, city, district))}
            sx={{ flexShrink: 0 }}
          >
            {format.toDisplay(service)}
          </Button>
          {/* 其他服務按鈕 */}
          {otherServices.map((otherService) => (
            <Button
              key={otherService}
              variant="light"
              onClick={() => navigate(generatePath.actual.serviceDistrict(type, otherService, city, district))}
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
              onClick={() => navigate(generatePath.actual.district(t, city, district))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  // 其他行政區列表
  const renderOtherDistrictButtons = () => {
    const otherDistricts = allDistricts.filter(d => d !== district);

    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">{format.toDisplay(service)} in Other Districts</Title>
        <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
          {otherDistricts.map((otherDistrict) => (
            <Button
              key={otherDistrict}
              variant="light"
              onClick={() => navigate(generatePath.actual.serviceDistrict(type, service, city, otherDistrict))}
              sx={{ flexShrink: 0 }}
            >
              {`${format.toDisplay(service)} in ${format.toDisplay(otherDistrict)}`}
            </Button>
          ))}
        </Group>
      </Box>
    );
  };

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      {renderServiceButtons()}
      <Title order={2} size="h3" mb="md" sx={{ textAlign: 'left' }}>
        Best {format.toDisplay(service)}s near me in {format.toDisplay(district)}, {format.toDisplay(city)}
      </Title>
      <BusinessGrid businesses={businessList} />
      {renderOtherTypeButtons()}
      {renderOtherDistrictButtons()}
    </Container>
  );
}
