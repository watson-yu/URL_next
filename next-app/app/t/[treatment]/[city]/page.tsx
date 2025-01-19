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
    treatment: string;
    city: string;
  };
}

export default async function TreatmentCityPage({ params }: PageProps) {
  try {
    const [services, businessList] = await Promise.all([
      getServices(),
      businesses.getByServiceAndCity(params.treatment, params.city)
    ]);

    // Find which category this treatment belongs to
    let categorySlug: string | null = null;
    let treatmentInfo = null;

    for (const [type, info] of Object.entries(services.types)) {
      const treatment = info.treatments.find(t => t.slug === params.treatment);
      if (treatment) {
        categorySlug = type;
        treatmentInfo = treatment;
        break;
      }
    }

    if (!categorySlug || !treatmentInfo) {
      notFound();
    }

    const typeInfo = services.types[categorySlug];

    const breadcrumbs = [
      {
        label: 'Home',
        path: '/',
        actualPath: '/'
      },
      {
        label: typeInfo.displayName,
        path: `/v/${categorySlug}/${params.city}`,
        actualPath: `/v/${categorySlug}/${params.city}`
      },
      {
        label: `${treatmentInfo.treatment} in ${format.toDisplay(params.city)}`,
        path: `/t/${params.treatment}/${params.city}`,
        actualPath: `/t/${params.treatment}/${params.city}`
      }
    ];

    // Get all treatments for this category for the services navigation
    const treatments = typeInfo.treatments || [];

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
              {treatments.map(treatment => (
                <Button
                  key={treatment.slug}
                  component={Link}
                  href={`/t/${treatment.slug}/${params.city}`}
                  variant={treatment.slug === params.treatment ? 'filled' : 'light'}
                  styles={{
                    root: {
                      backgroundColor: treatment.slug === params.treatment ? '#3B5BA9' : '#EDF2FF',
                      color: treatment.slug === params.treatment ? 'white' : '#3B5BA9',
                      '&:hover': {
                        backgroundColor: treatment.slug === params.treatment ? '#2C4687' : '#D8E3FF'
                      }
                    }
                  }}
                >
                  {treatment.treatment}
                </Button>
              ))}
            </Group>
          </Stack>

          {/* Best Services near me */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              Best {treatmentInfo.treatment}s near me in {format.toDisplay(params.city)}
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
                .filter(([slug]) => slug !== categorySlug)
                .map(([slug, info]) => (
                  <Button
                    key={slug}
                    component={Link}
                    href={`/v/${slug}/${params.city}`}
                    variant="light"
                    styles={{
                      root: {
                        backgroundColor: '#EDF2FF',
                        color: '#3B5BA9',
                        '&:hover': {
                          backgroundColor: '#D8E3FF'
                        }
                      }
                    }}
                  >
                    {info.displayName}
                  </Button>
                ))}
            </Group>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in treatment city page:', error);
    notFound();
  }
}
