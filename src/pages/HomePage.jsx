import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Button, Group, Box, SimpleGrid, Stack } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
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

  // 依城市搜尋陣列
  const renderCityColumns = () => {
    if (!allCities.length) return null;

    // 將城市分為三列
    const columns = [[], [], []];
    allCities.forEach((city, index) => {
      columns[index % 3].push(city);
    });

    return (
      <Box mb="xl">
        <Title order={3} size="h4" mb="md">Search by City</Title>
        <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {columns.map((columnCities, columnIndex) => (
            <Box key={columnIndex}>
              {columnCities.map(city => (
                <Box key={city} mb="md">
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
                        fullWidth
                      >
                        {`${info.displayName} in ${format.toDisplay(city)}`}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={[]} />
      <Title order={1} align="center" mb="xl">
        Hair Services Directory
      </Title>

      <SearchBar />
      {renderTypeButtons()}
      {renderCityColumns()}
      <BusinessGrid businesses={allBusinesses} />
    </Container>
  );
}
