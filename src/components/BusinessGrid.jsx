import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text } from '@mantine/core';
import BusinessCard from './BusinessCard';
import { PAGE_SIZE } from '../constants';

export default function BusinessGrid({ businesses }) {
  const [showAll, setShowAll] = useState(false);

  if (!Array.isArray(businesses) || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found in this area
      </Text>
    );
  }

  const displayedBusinesses = showAll ? businesses : businesses.slice(0, PAGE_SIZE);

  return (
    <Stack spacing="xl">
      <SimpleGrid 
        cols={2} 
        spacing="md" 
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
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
          sx={{ alignSelf: 'center' }}
        >
          Show More
        </Button>
      )}
    </Stack>
  );
}
