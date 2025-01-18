import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { Button } from '@mantine/core';
import { Title, SimpleGrid, Group, Stack, ScrollArea } from '@mantine/core';
import Link from 'next/link';
import { generatePath } from '@/utils/routes';
import { SearchBar } from '@/components/SearchBar';
import { locations } from '@/data/locations';
import { format } from '@/utils/format';
import { businesses } from '@/data/businesses';
import { BusinessCard } from '@/components/BusinessCard';

export default function HomePage() {
  const featureBusinesses = businesses.getAll().slice(0, 4);

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
                href={`/v/${type}`}
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
            {featureBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </SimpleGrid>
        </div>

        {/* Search by City */}
        <div>
          <Title order={2} size="h3" mb="md">
            Search by City
          </Title>
          <ScrollArea>
            <Group gap="xl" wrap="nowrap" pr="md">
              {Object.values(locations.countries).map(country => 
                Object.keys(country.cities).map(city => (
                  <Stack key={city} spacing="xs" style={{ minWidth: 200 }}>
                    <Title order={3} size="h4">
                      {format.toDisplay(city)}
                    </Title>
                    {Object.entries(services.types).map(([type, info]) => (
                      <Button
                        key={type}
                        component={Link}
                        href={`/v/${type}/${city}`}
                        variant="light"
                        fullWidth
                      >
                        {info.displayName} in {format.toDisplay(city)}
                      </Button>
                    ))}
                  </Stack>
                ))
              )}
            </Group>
          </ScrollArea>
        </div>
      </Stack>
    </Container>
  );
} 