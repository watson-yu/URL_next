import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Group, Badge, Button, Stack, Paper } from '@mantine/core';
import { getBusinessById } from '../data/businesses';
import Breadcrumbs from '../components/Breadcrumbs';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function BusinessDetail() {
  const { type, city, district, businessId } = useParams();
  const navigate = useNavigate();
  
  const business = getBusinessById(parseInt(businessId));
  const typeInfo = services.types[type];
  
  if (!business || !typeInfo) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Business Not Found
        </Title>
        <Text align="center" mb="xl">
          The business you are looking for does not exist.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      actualPath: generatePath.actual.type(type)
    },
    {
      label: format.toDisplay(city),
      path: generatePath.display.city(type, city),
      actualPath: generatePath.actual.city(type, city)
    },
    {
      label: format.toDisplay(district),
      path: generatePath.display.district(type, city, district),
      actualPath: generatePath.actual.district(type, city, district)
    },
    {
      label: business.name,
      path: generatePath.display.businessDetail(type, city, district, businessId),
      actualPath: generatePath.display.businessDetail(type, city, district, businessId) // 商家詳情頁保持原有格式
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      
      <Paper shadow="xs" p="xl" mt="md">
        <Stack spacing="lg">
          <Title order={1}>{business.name}</Title>
          
          <Group>
            <Badge 
              size="lg" 
              color={typeInfo.color}
              onClick={() => navigate(generatePath.actual.type(type))}
              sx={{ cursor: 'pointer' }}
            >
              {typeInfo.displayName}
            </Badge>
          </Group>

          <div>
            <Text weight={500} size="lg" mb="xs">Location</Text>
            <Group spacing={8}>
              <Text
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(generatePath.actual.district(type, city, district))}
              >
                {format.toDisplay(district)}
              </Text>
              <Text>,</Text>
              <Text
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(generatePath.actual.city(type, city))}
              >
                {format.toDisplay(city)}
              </Text>
              <Text>,</Text>
              <Text>{business.location.country}</Text>
            </Group>
          </div>

          <div>
            <Text weight={500} size="lg" mb="xs">Services</Text>
            <Group spacing={8}>
              {business.services.map(service => (
                <Badge 
                  key={service} 
                  variant="outline"
                  onClick={() => navigate(generatePath.actual.serviceDistrict(
                    type,
                    service,
                    city,
                    district
                  ))}
                  sx={{ cursor: 'pointer' }}
                >
                  {format.toDisplay(service)}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}
