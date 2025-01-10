import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Group, Badge, Button, Stack, Paper } from '@mantine/core';
import { businesses } from '../data/businesses';
import Breadcrumbs from '../components/Breadcrumbs';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 尋找商家
  let foundBusiness = null;
  let location = null;

  Object.entries(businesses).forEach(([country, cities]) => {
    Object.entries(cities).forEach(([city, districts]) => {
      Object.entries(districts).forEach(([district, businessList]) => {
        const found = businessList.find(b => b.id === parseInt(id));
        if (found) {
          foundBusiness = found;
          location = { country, city, district };
        }
      });
    });
  });

  if (!foundBusiness || !location) {
    return (
      <Container size="md" py="xl">
        <Text>Business not found</Text>
        <Button onClick={() => navigate('/')} mt="md">Back to Home</Button>
      </Container>
    );
  }

  const typeInfo = services.types[foundBusiness.type];
  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.type(foundBusiness.type)
    },
    {
      label: format.toDisplayFormat(location.city),
      path: generatePath.city(foundBusiness.type, location.city)
    },
    {
      label: foundBusiness.name,
      path: `/business/${foundBusiness.id}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      
      <Paper shadow="xs" p="xl" mt="md">
        <Stack spacing="lg">
          <Title order={1}>{foundBusiness.name}</Title>
          
          <Group>
            <Badge 
              size="lg" 
              color={typeInfo.color}
            >
              {typeInfo.displayName}
            </Badge>
          </Group>

          <div>
            <Text weight={500} size="lg" mb="xs">Location</Text>
            <Text>
              {format.toDisplayFormat(location.district)}, {format.toDisplayFormat(location.city)}, {location.country}
            </Text>
          </div>

          <div>
            <Text weight={500} size="lg" mb="xs">Services</Text>
            <Group spacing={8}>
              {foundBusiness.services.map(service => (
                <Badge 
                  key={service} 
                  variant="outline"
                >
                  {format.toDisplayFormat(service)}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}
