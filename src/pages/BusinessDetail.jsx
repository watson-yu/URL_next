import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Group, Badge, Button, Stack, Paper } from '@mantine/core';
import { businesses } from '../data/businesses';
import Breadcrumbs from '../components/Breadcrumbs';

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find business and its location
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

  const breadcrumbItems = [
    {
      label: foundBusiness.type,
      path: `/${foundBusiness.type.toLowerCase().replace(/ /g, '-')}`
    },
    {
      label: location.city,
      path: `/${foundBusiness.type.toLowerCase().replace(/ /g, '-')}/${location.city.toLowerCase()}`
    },
    {
      label: location.district,
      path: `/${foundBusiness.type.toLowerCase().replace(/ /g, '-')}/${location.city.toLowerCase()}/${location.district.toLowerCase()}`
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
              color={foundBusiness.type === 'Beauty Salon' ? 'pink' : 'blue'}
            >
              {foundBusiness.type}
            </Badge>
          </Group>

          <div>
            <Text weight={500} size="lg" mb="xs">Location</Text>
            <Text>
              {location.district}, {location.city}, {location.country}
            </Text>
          </div>

          <div>
            <Text weight={500} size="lg" mb="xs">Services</Text>
            <Group spacing={8}>
              {foundBusiness.services.map(service => (
                <Badge 
                  key={service} 
                  variant="outline"
                  size="lg"
                  color={service === 'Haircut' ? 'grape' : 
                         service === 'Hair Coloring' ? 'pink' : 
                         'blue'}
                >
                  {service}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}
