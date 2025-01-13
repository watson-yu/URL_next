import React from 'react';
import { SimpleGrid } from '@mantine/core';
import BusinessCard from './BusinessCard';

export default function BusinessList({ businesses, type }) {
  return (
    <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {businesses.map(business => (
        <BusinessCard 
          key={business.id} 
          business={business}
          location={business.location}
          type={type}
        />
      ))}
    </SimpleGrid>
  );
}
