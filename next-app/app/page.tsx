import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { Button } from '@/components/Button';
import { Title, SimpleGrid, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { generatePath } from '@/utils/routes';
import { SearchBar } from '@/components/SearchBar';
import { locations } from '@/data/locations';
import { format } from '@/utils/format';

export default function HomePage() {
  return (
    <Container size="md" py="xl">
      <SearchBar />

      <Stack spacing="xl">
        {/* Business Types */}
        <div>
          <Title order={2} size="h3" mb="md">
            Business Types
          </Title>
          <Group>
            {Object.entries(services.types).map(([type, info]) => (
              <Button
                key={type}
                component={Link}
                href={generatePath.actual.type(type)}
                variant="light"
              >
                {info.displayName}
              </Button>
            ))}
          </Group>
        </div>

        {/* Feature Shops */}
        <div>
          <Title order={2} size="h3" mb="md">
            Feature Shops
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {/* We'll implement BusinessCard component next */}
          </SimpleGrid>
        </div>

        {/* Search by City */}
        <div>
          <Title order={2} size="h3" mb="md">
            Search by City
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
            {Object.values(locations.countries).map(country => 
              Object.keys(country.cities).map(city => (
                <Stack key={city} spacing="xs">
                  <Title order={3} size="h4">
                    {format.toDisplay(city)}
                  </Title>
                  {Object.entries(services.types).map(([type, info]) => (
                    <Button
                      key={type}
                      component={Link}
                      href={generatePath.actual.city(type, city)}
                      variant="light"
                      fullWidth
                    >
                      {info.displayName} in {format.toDisplay(city)}
                    </Button>
                  ))}
                </Stack>
              ))
            )}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
} 