'use client';

import { Card, Text, Badge, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { format } from '@/utils/format';

interface Business {
  id: number;
  name: string;
  type: string;
  services: string[];
  country: string;
  city: string;
  district: string;
  country_slug: string;
  city_slug: string;
  district_slug: string;
  created_at: string;
  updated_at: string;
}

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const router = useRouter();

  if (!business) {
    return null;
  }

  const handleClick = () => {
    const { type, city_slug, district_slug } = business;
    const businessId = business.id?.toString();

    if (!type || !city_slug || !district_slug || !businessId) {
      return;
    }

    router.push(`/v/${type}/${city_slug}/${district_slug}/${businessId}`);
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
      <Stack gap="xs">
        <Text fw={500} size="lg">
          {business.name}
        </Text>

        <Text size="sm" c="dimmed">
          {format.toDisplay(business.district)}, 
          {format.toDisplay(business.city)}, 
          {business.country}
        </Text>

        <Badge 
          variant="light"
          size="lg"
        >
          {business.type}
        </Badge>
      </Stack>
    </Card>
  );
} 