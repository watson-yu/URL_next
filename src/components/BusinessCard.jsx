import React from 'react';
import { Card, Text, Badge, Group, Stack, Divider } from '@mantine/core';

export default function BusinessCard({ business, location }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="xs">
        {/* 店名 */}
        <Text weight={500} size="lg">
          {business.name}
        </Text>

        {/* 位置資訊 */}
        <Text size="sm" color="dimmed">
          {location.district}, {location.city}, {location.country}
        </Text>

        {/* 類型 */}
        <Badge 
          color={business.type === 'Beauty Salon' ? 'pink' : 'blue'} 
          variant="light"
          size="lg"
        >
          {business.type}
        </Badge>

        <Divider my="xs" />

        {/* 服務項目 */}
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
