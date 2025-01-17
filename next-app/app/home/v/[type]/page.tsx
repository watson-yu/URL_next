import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Group, Stack, Button } from '@mantine/core';
import { BusinessGrid } from '@/components/BusinessGrid';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePath } from '@/utils/routes';
import { locations } from '@/data/locations';
import Link from 'next/link';

export default function TypePage({ params }: { params: { type: string } }) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo) {
    notFound();
  }

  const businessList = businesses.getByType(params.type);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.actual.type(params.type),
      actualPath: generatePath.actual.type(params.type)
    }
  ];

  // Get other business types for the "Other Business Types" section
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== params.type);

  // Get all cities for the "by City" section
  const allCities = Object.values(locations.countries)
    .flatMap(country => Object.keys(country.cities));

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hair Salon by City */}
      <Stack spacing="xl">
        <Title order={2} size="h3" mb="md">
          {typeInfo.displayName} by City
        </Title>
        <Group>
          {allCities.map((city) => (
            <Button
              key={city}
              component={Link}
              href={generatePath.actual.city(params.type, city)}
              variant="light"
            >
              {typeInfo.displayName} in {format.toDisplay(city)}
            </Button>
          ))}
        </Group>
      </Stack>

      {/* Best Global Hair Salons */}
      <Stack spacing="xl" mt="xl">
        <Title order={2} size="h3" mb="md">
          Best Global {typeInfo.displayName}s
        </Title>
        <BusinessGrid businesses={businessList} />
      </Stack>

      {/* Other Business Types */}
      {otherTypes.length > 0 && (
        <Stack spacing="xl" mt="xl">
          <Title order={2} size="h3" mb="md">
            Other Business Types
          </Title>
          <Group>
            {otherTypes.map(([type, info]) => (
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
        </Stack>
      )}
    </Container>
  );
} 