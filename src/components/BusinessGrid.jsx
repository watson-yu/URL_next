import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text } from '@mantine/core';
import BusinessCard from './BusinessCard';

export default function BusinessGrid({ businesses }) {
  const ITEMS_PER_PAGE = 4;
  const [showAll, setShowAll] = useState(false);

  if (!Array.isArray(businesses) || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found
      </Text>
    );
  }

  const displayedBusinesses = showAll ? businesses : businesses.slice(0, ITEMS_PER_PAGE);

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

      {businesses.length > ITEMS_PER_PAGE && !showAll && (
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
