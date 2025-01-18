import { Container } from '@/components/Container';
import { getServices } from '@/data/services';
import { businesses } from '@/data/businesses';
import { Title, SimpleGrid, Group, Stack, ScrollArea } from '@mantine/core';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { BusinessCard } from '@/components/BusinessCard';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { getLocations } from '@/data/locations';
import { format } from '@/utils/format';

export default async function HomePage() {
  try {
    const [services, featureBusinesses, locations] = await Promise.all([
      getServices(),
      businesses.getFeatured(),
      getLocations()
    ]);

    // Group cities by country
    const cities = Object.values(locations.countries)
      .flatMap(country => 
        Object.keys(country.cities).map(city => ({
          city,
          displayName: format.toDisplay(city)
        }))
      );

    return (
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <SearchBar />

          {/* Business Types */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Business Types
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {Object.entries(services.types).map(([type, info]) => (
                  <Button
                    key={type}
                    component={Link}
                    href={`/v/${type}`}
                    variant="light"
                    style={{ minWidth: 'fit-content' }}
                  >
                    {info.displayName}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>

          {/* Feature Shops */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Feature Shops
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {featureBusinesses.map((business) => (
                  <div key={business.id} style={{ minWidth: 300 }}>
                    <BusinessCard business={business} />
                  </div>
                ))}
              </Group>
            </ScrollArea>
          </Stack>

          {/* Other Business Types */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Other Business Types
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {Object.entries(services.types).map(([type, info]) => (
                  <Button
                    key={type}
                    component={Link}
                    href={`/v/${type}`}
                    variant="light"
                    style={{ minWidth: 'fit-content' }}
                  >
                    {info.displayName}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>

          {/* Search by City */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Search by City
            </Title>
            <ScrollArea>
              <Group gap="xl" wrap="nowrap" pr="md">
                {cities.map(({ city, displayName }) => (
                  <Stack key={city} spacing="xs" style={{ minWidth: 200 }}>
                    <Title order={3} size="h4">
                      {displayName}
                    </Title>
                    {Object.entries(services.types).map(([type, info]) => (
                      <Button
                        key={type}
                        component={Link}
                        href={`/v/${type}/${city}`}
                        variant="light"
                        fullWidth
                      >
                        {info.displayName} in {displayName}
                      </Button>
                    ))}
                  </Stack>
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    return (
      <Container size="md" py="xl">
        <ErrorDisplay message="Failed to load data" />
      </Container>
    );
  }
} 