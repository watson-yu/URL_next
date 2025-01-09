import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Title, Text, Group, Badge, Button } from '@mantine/core';
import { businesses } from '../data/businesses';
import { Link } from 'react-router-dom';

export default function BusinessDetail() {
  const { id } = useParams();
  
  const business = Object.values(businesses)
    .flatMap(countries => Object.values(countries))
    .flatMap(cities => Object.values(cities))
    .flat()
    .find(b => b.id === parseInt(id));

  if (!business) {
    return (
      <Container size="md" py="xl">
        <Text>Business not found</Text>
        <Button component={Link} to="/" mt="md">Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Button component={Link} to="/" mb="xl">Back to Home</Button>
      
      <Title order={1} mb="xl">{business.name}</Title>
      
      <Badge size="lg" mb="md" color={business.type === 'Beauty Salon' ? 'pink' : 'blue'}>
        {business.type}
      </Badge>

      <Title order={3} mt="xl" mb="md">Services</Title>
      <Group spacing={8}>
        {business.services.map(service => (
          <Badge key={service} variant="outline" size="lg">
            {service}
          </Badge>
        ))}
      </Group>
    </Container>
  );
}
