'use client';

import { SimpleGrid, Button, Stack, Text } from '@mantine/core';
import { BusinessCard } from './BusinessCard';
import { useState } from 'react';
import { PAGE_SIZE } from '@/constants';

interface Business {
  id: number;
  name: string;
  type: string;
  location: {
    city: string;
    district: string;
    country: string;
  };
}

interface BusinessGridProps {
  businesses: Business[];
}

export function BusinessGrid({ businesses }: BusinessGridProps) {
  const [showAll, setShowAll] = useState(false);

  if (!businesses?.length) {
    return (
      <Text ta="center" c="dimmed" mt="xl">
        No businesses found in this area
      </Text>
    );
  }

  const displayedBusinesses = showAll ? businesses : businesses.slice(0, PAGE_SIZE);

  return (
    <Stack gap="xl">
      <SimpleGrid 
        cols={{ base: 1, sm: 2 }}
        gap="md"
      >
        {displayedBusinesses.map((business) => (
          <BusinessCard 
            key={business.id} 
            business={business}
          />
        ))}
      </SimpleGrid>

      {businesses.length > PAGE_SIZE && !showAll && (
        <Button 
          variant="light" 
          onClick={() => setShowAll(true)}
          style={{ alignSelf: 'center' }}
        >
          Show More
        </Button>
      )}
    </Stack>
  );
} 