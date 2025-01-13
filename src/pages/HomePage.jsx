import React from 'react';
import { Container, Title, Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import BusinessGrid from '../components/BusinessGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllBusinesses } from '../data/businesses';
import { generatePath } from '../utils/routes';
import { services } from '../data/services';

export default function HomePage() {
  const navigate = useNavigate();
  const types = Object.entries(services.types);
  const allBusinesses = getAllBusinesses();

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={[]} />
      <Title order={1} align="center" mb="xl">
        Hair Services Directory
      </Title>
      <UnifiedSearchBar />

      <Box 
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          marginBottom: 'xl',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbarWidth': 'none'
        }}
      >
        <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
          {types.map(([type, info]) => (
            <Button
              key={type}
              variant="light"
              onClick={() => navigate(generatePath.type(type))}
              sx={{ flexShrink: 0 }}
            >
              {info.displayName}
            </Button>
          ))}
        </Group>
      </Box>

      <BusinessGrid businesses={allBusinesses} />
    </Container>
  );
}
