import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Button, Group, Box, Stack } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function HomePage() {
  const navigate = useNavigate();
  const allBusinesses = businesses.getAll();
  const allCities = locationUtils.getAllCities();

  // 商家類別按鈕
  const renderTypeButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Business Types</Title>
      <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
        {Object.entries(services.types).map(([type, info]) => (
          <Button
            key={type}
            variant="light"
            onClick={() => navigate(generatePath.actual.type(type))}
            sx={{ flexShrink: 0 }}
          >
            {info.displayName}
          </Button>
        ))}
      </Group>
    </Box>
  );

  // 依城市搜尋（單行水平捲動）
  const renderCityButtons = () => (
    <Box mb="xl">
      <Title order={3} size="h4" mb="md">Search by City</Title>
      <Group spacing="sm" noWrap sx={{ 
        padding: '4px', 
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px'
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '3px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555'
        }
      }}>
        {allCities.map(city => (
          <Box key={city} sx={{ flexShrink: 0 }}>
            <Title order={4} size="h5" mb="sm">
              {format.toDisplay(city)}
            </Title>
            <Stack spacing="xs">
              {Object.entries(services.types).map(([type, info]) => (
                <Button
                  key={`${city}-${type}`}
                  variant="light"
                  size="sm"
                  onClick={() => navigate(generatePath.actual.city(type, city))}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {`${info.displayName} in ${format.toDisplay(city)}`}
                </Button>
              ))}
            </Stack>
          </Box>
        ))}
      </Group>
    </Box>
  );

  return (
    <Container size="md" py="xl">
      <SearchBar />
      {renderTypeButtons()}
      <Title order={2} size="h3" mb="md" sx={{ textAlign: 'left' }}>
        Feature Shops
      </Title>
      <BusinessGrid businesses={allBusinesses} />
      {renderCityButtons()}
    </Container>
  );
}
