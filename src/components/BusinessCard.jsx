import React from 'react';
import { Card, Text, Badge, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { format } from '../utils/format';

export default function BusinessCard({ business, location }) {
  const navigate = useNavigate();
  
  const typeInfo = services.types[business.type];

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
          {format.toDisplayFormat(location.district)}, 
          {format.toDisplayFormat(location.city)}, 
          {location.country}
        </Text>

        <Badge 
          color={typeInfo?.color || 'gray'}
          variant="light"
          size="lg"
        >
          {business.displayName || typeInfo?.displayName || format.toDisplayFormat(business.type)}
        </Badge>
      </Stack>
    </Card>
  );
}
