import { Container } from '@/components/Container';
import { businesses } from '@/data/businesses';
import { getServices } from '@/data/services';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Stack, Group, Button } from '@mantine/core';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchBar } from '@/components/SearchBar';
import { BusinessGrid } from '@/components/BusinessGrid';
import Link from 'next/link';

interface PageProps {
  params: {
    type: string;
    city: string;
    district: string;
  };
}

export default async function DistrictPage({ params }: PageProps) {
  try {
    const [services, businessList] = await Promise.all([
      getServices(),
      businesses.getByTypeAndCityAndDistrict(params.type, params.city, params.district)
    ]);

    const typeInfo = services.types[params.type];
    if (!typeInfo) {
      notFound();
    }

    // Get available services for this type
    const treatments = typeInfo.treatments || [];

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
      },
      {
        label: format.toDisplay(params.district),
        path: `/v/${params.type}/${params.city}/${params.district}`,
        actualPath: `/v/${params.type}/${params.city}/${params.district}`
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
                href={`/v/${params.type}/${params.city}/${params.district}`}
                variant="filled"
              >
                {typeInfo.displayName}
              </Button>
              {treatments.map(treatment => (
                <Button
                  key={treatment.slug}
                  component={Link}
                  href={`/t/${treatment.slug}/${params.city}/${params.district}`}
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
              Best {typeInfo.displayName}s near me in {format.toDisplay(params.district)}, {format.toDisplay(params.city)}
            </Title>
            <BusinessGrid businesses={businessList} />
          </Stack>

          {/* Other Business Types */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Other Business Types
            </Title>
            <Group>
              {Object.entries(services.types)
                .filter(([t]) => t !== params.type)
                .map(([type, info]) => (
                  <Button
                    key={type}
                    component={Link}
                    href={`/v/${type}/${params.city}/${params.district}`}
                    variant="light"
                  >
                    {info.displayName}
                  </Button>
                ))}
            </Group>
          </Stack>

          {/* Hair Salon in Other Districts */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              {typeInfo.displayName} in Other Districts
            </Title>
            <Group>
              {/* Add district navigation here */}
            </Group>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in DistrictPage:', error);
    return (
      <Container size="md" py="xl">
        <div>Something went wrong. Please try again later.</div>
      </Container>
    );
  }
} 