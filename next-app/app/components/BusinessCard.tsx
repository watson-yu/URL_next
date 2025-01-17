'use client';

import { Card, Text, Badge, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { format } from '@/utils/format';
import { generatePath } from '@/utils/routes';

interface BusinessLocation {
  city: string;
  district: string;
  country: string;
}

interface Business {
  id: number;
  name: string;
  type: string;
  location: BusinessLocation;
}

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const router = useRouter();
  const typeInfo = services.types[business.type];

  if (!typeInfo) {
    console.error('Invalid business type:', business.type);
    return null;
  }

  const handleClick = () => {
    try {
      if (!business || !business.location) {
        console.error('Invalid business data:', business);
        return;
      }

      const { type } = business;
      const { city, district } = business.location;
      const businessId = business.id?.toString();

      if (!type || !city || !district || !businessId) {
        console.error('Missing required business data');
        return;
      }

      router.push(`/home/${type}/${city}/${district}/${businessId}`);
    } catch (error) {
      console.error('Error navigating to business:', error);
    }
  };

  return (
    <Card 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Stack spacing="xs">
        <Text fw={500} size="lg">
          {business.name}
        </Text>

        <Text size="sm" c="dimmed">
          {format.toDisplay(business.location.district)}, 
          {format.toDisplay(business.location.city)}, 
          {business.location.country}
        </Text>

        <Badge 
          variant="light"
          size="lg"
        >
          {typeInfo.displayName}
        </Badge>
      </Stack>
    </Card>
  );
} 