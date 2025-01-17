'use client';

import { Title, Stack, Group, Button } from '@mantine/core';
import Link from 'next/link';
import { services } from '@/data/services';
import { generatePath } from '@/utils/routes';
import { format } from '@/utils/format';

interface AlsoAvailableProps {
  currentType: string;
  currentCity: string;
  currentDistrict: string;
}

export function AlsoAvailable({ 
  currentType,
  currentCity,
  currentDistrict 
}: AlsoAvailableProps) {
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== currentType);

  if (otherTypes.length === 0) return null;

  return (
    <Stack gap="md">
      <Title order={2} size="h3">
        Also Available in {format.toDisplay(currentDistrict)}
      </Title>
      <Group>
        {otherTypes.map(([type, info]) => (
          <Button
            key={type}
            component={Link}
            href={generatePath.actual.district(type, currentCity, currentDistrict)}
            variant="light"
          >
            {info.displayName} in {format.toDisplay(currentDistrict)}
          </Button>
        ))}
      </Group>
    </Stack>
  );
} 