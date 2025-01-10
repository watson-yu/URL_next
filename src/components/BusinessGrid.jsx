import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text } from '@mantine/core';
import BusinessCard from './BusinessCard';

export default function BusinessGrid({ businesses }) {
  const ITEMS_PER_PAGE = 4; // 一次顯示4個商家（2排）
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  
  if (!businesses || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found
      </Text>
    );
  }

  const hasMore = displayCount < businesses.length;

  const handleShowMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <Stack spacing="xl">
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'sm', cols: 1 }
        ]}
      >
        {businesses.slice(0, displayCount).map(business => (
          <BusinessCard 
            key={business.id} 
            business={business}
            location={business.location}
          />
        ))}
      </SimpleGrid>

      {hasMore && (
        <Button 
          variant="light" 
          onClick={handleShowMore}
          sx={{ alignSelf: 'center' }}
        >
          Show More
        </Button>
      )}
    </Stack>
  );
}
