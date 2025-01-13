import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Group, Badge, Button, Stack, Paper } from '@mantine/core';
import { getBusinessById } from '../data/businesses';
import Breadcrumbs from '../components/Breadcrumbs';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function BusinessDetail() {
  const { typeService, city, district, businessId } = useParams();
  const navigate = useNavigate();
  
  const business = getBusinessById(businessId);
  
  if (!business) {
    return (
      <Container size="md" py="xl">
        <Text>Business not found</Text>
        <Button onClick={() => navigate('/')} mt="md">Back to Home</Button>
      </Container>
    );
  }

  const typeInfo = services.types[business.type];
  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.type(business.type)
    },
    {
      label: format.toDisplay(city),
      path: generatePath.city(business.type, city)
    },
    {
      label: format.toDisplay(district),
      path: generatePath.district(business.type, city, district)
    },
    {
      label: business.name,
      path: generatePath.businessDetail(business.type, city, district, business.id)
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
              onClick={() => navigate(generatePath.type(business.type))}
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
                onClick={() => navigate(generatePath.district(business.type, city, district))}
              >
                {format.toDisplay(business.location.district)}
              </Text>
              <Text>,</Text>
              <Text
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(generatePath.city(business.type, city))}
              >
                {format.toDisplay(business.location.city)}
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
                  onClick={() => navigate(generatePath.serviceDistrict(
                    business.type,
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
