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
    treatment: string;
    city: string;
  };
}

export default async function TreatmentCityPage({ params }: PageProps) {
  try {
    const [services, businessList, locations] = await Promise.all([
      getServices(),
      businesses.getByServiceAndCity(params.treatment, params.city),
      getLocations()
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

    // Get districts for this city
    const cityDistricts = Object.values(locations.countries)
      .flatMap(country => 
        Object.entries(country.cities)
          .filter(([citySlug]) => citySlug === params.city)
          .flatMap(([_, cityData]) => cityData.districts)
      );

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
            <ScrollArea scrollbarSize={4} type="scroll" offsetScrollbars scrollHideDelay={500}>
              <Group style={{ minWidth: 'max-content' }} spacing="sm">
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
            </ScrollArea>
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
            <ScrollArea scrollbarSize={4} type="scroll" offsetScrollbars scrollHideDelay={500}>
              <Group style={{ minWidth: 'max-content' }} spacing="sm">
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
            </ScrollArea>
          </Stack>

          {/* Treatment in Districts */}
          <Stack spacing="md">
            <Title order={2} size="h3">
              {treatmentInfo.treatment} in Districts
            </Title>
            <ScrollArea scrollbarSize={4} type="scroll" offsetScrollbars scrollHideDelay={500}>
              <Group style={{ minWidth: 'max-content' }} spacing="sm">
                {cityDistricts.map(district => (
                  <Button
                    key={district.district_slug}
                    component={Link}
                    href={`/t/${params.treatment}/${params.city}/${district.district_slug}`}
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
                    {treatmentInfo.treatment} in {format.toDisplay(district.district)}
                  </Button>
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in treatment city page:', error);
    notFound();
  }
}
