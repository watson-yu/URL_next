import React from 'react';
import { Card, Text, Badge, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { format } from '../utils/format';
import { generatePath } from '../utils/routes';

export default function BusinessCard({ business }) {
  const navigate = useNavigate();
  const typeInfo = services.types[business.type];

  const handleClick = () => {
    navigate(generatePath.businessDetail(
      business.type,
      business.location.city,
      business.location.district,
      business.id
    ));
  };

  return (
    <Card 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Stack spacing="xs">
        <Text weight={500} size="lg">
          {business.name}
        </Text>

        <Text size="sm" color="dimmed">
          {format.toDisplay(business.location.district)}, 
          {format.toDisplay(business.location.city)}, 
          {business.location.country}
        </Text>

        <Badge 
          color={typeInfo?.color || 'gray'}
          variant="light"
          size="lg"
        >
          {typeInfo?.displayName || format.toDisplay(business.type)}
        </Badge>
      </Stack>
    </Card>
  );
}
