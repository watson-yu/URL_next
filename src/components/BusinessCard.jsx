import React from 'react';
import { Card, Text, Badge, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { format } from '../utils/format';
import { generatePath, validatePath } from '../utils/routes';

export default function BusinessCard({ business }) {
  const navigate = useNavigate();
  const typeInfo = services.types[business.type];

  const handleClick = () => {
    try {
      // 驗證所有必要的數據
      if (!business || !business.location) {
        console.error('Invalid business data:', business);
        return;
      }

      const { type } = business;
      const { city, district } = business.location;
      const businessId = business.id?.toString();

      // 驗證所有參數
      if (!validatePath.type(type) || 
          !validatePath.city(city) || 
          !validatePath.district(city, district) || 
          !businessId) {
        console.error('Invalid business parameters:', { type, city, district, businessId });
        return;
      }

      const path = generatePath.businessDetail(type, city, district, businessId);
      navigate(path);
    } catch (error) {
      console.error('Error navigating to business detail:', error);
    }
  };

  if (!typeInfo) {
    console.error('Invalid business type:', business.type);
    return null;
  }

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
          color={typeInfo.color || 'gray'}
          variant="light"
          size="lg"
        >
          {typeInfo.displayName}
        </Badge>
      </Stack>
    </Card>
  );
}
