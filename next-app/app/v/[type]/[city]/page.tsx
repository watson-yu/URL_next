import { Container } from '@/components/Container';
import { businesses } from '@/data/businesses';
import { getServices } from '@/data/services';
import { getLocations } from '@/data/locations';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Stack, Group, Button, ScrollArea } from '@mantine/core';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchBar } from '@/components/SearchBar';
import { BusinessGrid } from '@/components/BusinessGrid';
import Link from 'next/link';

interface PageProps {
  params: {
    type: string;
    city: string;
  };
}

export default async function CityPage({ params }: PageProps) {
  try {
    const [services, businessList, locations] = await Promise.all([
      getServices(),
      businesses.getByTypeAndCity(params.type, params.city),
      getLocations()
    ]);

    const typeInfo = services.types[params.type];
    if (!typeInfo) {
      notFound();
    }

    // Get available services for this type
    const treatments = typeInfo.treatments || [];

    // Get districts for this city
    const cityDistricts = Object.values(locations.countries)
      .flatMap(country => 
        Object.entries(country.cities)
          .filter(([citySlug]) => citySlug === params.city)
          .flatMap(([_, cityData]) => cityData.districts)
      );

    const breadcrumbs = [
      {
        label: typeInfo.displayName,
        path: `/v/${params.type}`,
        actualPath: `/v/${params.type}`
      },
      {
        label: format.toDisplay(params.city),
        path: `/v/${params.type}/${params.city}`,
        actualPath: `/v/${params.type}/${params.city}`
      }
    ];

    return (
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <SearchBar />
          <Breadcrumbs items={breadcrumbs} />

          {/* Available Services */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Available Services
            </Title>
            <Group>
              <Button
                component={Link}
                href={`/v/${params.type}/${params.city}`}
                variant="filled"
              >
                {typeInfo.displayName}
              </Button>
              {treatments.map(treatment => (
                <Button
                  key={treatment.slug}
                  component={Link}
                  href={`/t/${treatment.slug}/${params.city}`}
                  variant="light"
                >
                  {treatment.treatment}
                </Button>
              ))}
            </Group>
          </Stack>

          {/* Best Hair Salons near me */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Best {typeInfo.displayName}s near me in {format.toDisplay(params.city)}
            </Title>
            <BusinessGrid businesses={businessList} />
          </Stack>

          {/* Other Business Types */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Other Business Types
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {Object.entries(services.types)
                  .filter(([t]) => t !== params.type)
                  .map(([type, info]) => (
                    <Button
                      key={type}
                      component={Link}
                      href={`/v/${type}/${params.city}`}
                      variant="light"
                      style={{ minWidth: 'fit-content' }}
                    >
                      {info.displayName}
                    </Button>
                  ))}
              </Group>
            </ScrollArea>
          </Stack>

          {/* Hair Salon in Districts */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              {typeInfo.displayName} in Districts
            </Title>
            <ScrollArea>
              <Group gap="md" wrap="nowrap" pr="md">
                {cityDistricts.map(district => (
                  <Button
                    key={district}
                    component={Link}
                    href={`/v/${params.type}/${params.city}/${district}`}
                    variant="light"
                    style={{ minWidth: 'fit-content' }}
                  >
                    {typeInfo.displayName} in {format.toDisplay(district)}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in CityPage:', error);
    return (
      <Container size="md" py="xl">
        <div>Something went wrong. Please try again later.</div>
      </Container>
    );
  }
}