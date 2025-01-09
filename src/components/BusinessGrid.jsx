import React from 'react';
import { SimpleGrid } from '@mantine/core';
import BusinessCard from './BusinessCard';

export default function BusinessGrid({ businesses }) {
  if (!businesses || businesses.length === 0) {
    return null;
  }

  return (
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'sm', cols: 1 }
      ]}
      mt="xl"
    >
      {businesses.map(business => (
        <BusinessCard 
          key={business.id} 
          business={business}
          location={business.location}
        />
      ))}
    </SimpleGrid>
  );
}
