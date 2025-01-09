import React from 'react';
import { Card, Text, Badge, Group, Stack, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function BusinessCard({ business, location }) {
  const navigate = useNavigate();

  return (
    <Card 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate(`/business/${business.id}`)}
    >
      <Stack spacing="xs">
        <Text weight={500} size="lg">
          {business.name}
        </Text>

        <Text size="sm" color="dimmed">
          {location.district}, {location.city}, {location.country}
        </Text>

        <Badge 
          color={business.type === 'Beauty Salon' ? 'pink' : 'blue'} 
          variant="light"
          size="lg"
        >
          {business.type}
        </Badge>

        <Divider my="xs" />

        <Text size="sm" weight={500} color="dimmed">
          Services:
        </Text>
        <Group spacing={8}>
          {business.services.map(service => (
            <Badge 
              key={service} 
              variant="outline"
              color={service === 'Haircut' ? 'grape' : 
                     service === 'Hair Coloring' ? 'pink' : 
                     'blue'}
            >
              {service}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
