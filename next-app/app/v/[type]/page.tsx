import { Container } from '@/components/Container';
import { getServices } from '@/data/services';
import { businesses } from '@/data/businesses';
import { getLocations } from '@/data/locations';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Stack, Group, ScrollArea, Button, SimpleGrid } from '@mantine/core';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchBar } from '@/components/SearchBar';
import { BusinessCard } from '@/components/BusinessCard';
import Link from 'next/link';

interface PageProps {
  params: {
    type: string;
  };
}

export default async function TypePage({ params: { type } }: PageProps) {
  try {
    const [services, businessList, locations] = await Promise.all([
      getServices(),
      businesses.getByType(type),
      getLocations()
    ]);

    // Show only first 4 businesses initially
    const displayBusinesses = businessList.slice(0, 4);
    const hasMoreBusinesses = businessList.length > 4;

    const typeInfo = services.types[type];
    if (!typeInfo) {
      notFound();
    }

    const breadcrumbs = [
      {
        label: typeInfo.displayName,
        path: `/v/${type}`,
        actualPath: `/v/${type}`
      }
    ];

    // Get all cities
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
          <Breadcrumbs items={breadcrumbs} />

          {/* Hair Salons by City */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              {typeInfo.displayName}s by City
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {cities.map(({ city, displayName }) => (
                  <Button
                    key={city}
                    component={Link}
                    href={`/v/${type}/${city}`}
                    variant="light"
                    style={{ minWidth: 'fit-content' }}
                  >
                    {typeInfo.displayName}s in {displayName}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>

          {/* Best Global Hair Salons */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Best Global {typeInfo.displayName}s
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {displayBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </SimpleGrid>
            {hasMoreBusinesses && (
              <Button
                variant="light"
                component={Link}
                href={`/v/${type}/all`}
                style={{ alignSelf: 'center' }}
              >
                Show More
              </Button>
            )}
          </Stack>

          {/* Other Business Types */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Other Business Types
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {Object.entries(services.types)
                  .filter(([t]) => t !== type)
                  .map(([typeSlug, info]) => (
                    <Button
                      key={typeSlug}
                      component={Link}
                      href={`/v/${typeSlug}`}
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
              <Group gap="md" wrap="nowrap" pr="md">
                {cities.map(({ city, displayName }) => (
                  <Button
                    key={city}
                    component={Link}
                    href={`/v/${type}/${city}`}
                    variant="light"
                    style={{ minWidth: 'fit-content' }}
                  >
                    {displayName}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in TypePage:', error);
    return (
      <Container size="md" py="xl">
        <div>Something went wrong. Please try again later.</div>
      </Container>
    );
  }
} 