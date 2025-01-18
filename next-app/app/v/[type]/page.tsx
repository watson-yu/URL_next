import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Group, Stack, Button } from '@mantine/core';
import { BusinessGrid } from '@/components/BusinessGrid';
import { SearchBar } from '@/components/SearchBar';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function TypePage({ params }: { params: { type: string } }) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo) {
    notFound();
  }

  const businessList = businesses.getByType(params.type);
  const allCities = Object.values(locations.countries)
    .flatMap(country => Object.keys(country.cities));

  // Get other business types
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== params.type);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: `/v/${params.type}`,
      actualPath: `/v/${params.type}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Type by City */}
      <Stack spacing="xl">
        <Title order={2} size="h3" mb="md">
          {typeInfo.displayName} by City
        </Title>
        <Group>
          {allCities.map((city) => (
            <Button
              key={city}
              component={Link}
              href={`/v/${params.type}/${city}`}
              variant="light"
            >
              {typeInfo.displayName} in {format.toDisplay(city)}
            </Button>
          ))}
        </Group>
      </Stack>

      {/* Best Global Businesses */}
      <Stack spacing="xl" mt="xl">
        <Title order={2} size="h3" mb="md">
          Best Global {typeInfo.displayName}s
        </Title>
        <BusinessGrid businesses={businessList} />
      </Stack>

      {/* Other Business Types */}
      <Stack spacing="xl" mt="xl">
        <Title order={2} size="h3" mb="md">
          Other Business Types
        </Title>
        <Group>
          {otherTypes.map(([type, info]) => (
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
      </Stack>

      {/* Search by City */}
      <Stack spacing="xl" mt="xl">
        <Title order={2} size="h3" mb="md">
          Search by City
        </Title>
        <Group>
          {allCities.map((city) => (
            <Button
              key={city}
              component={Link}
              href={`/v/${params.type}/${city}`}
              variant="light"
            >
              {format.toDisplay(city)}
            </Button>
          ))}
        </Group>
      </Stack>
    </Container>
  );
} 