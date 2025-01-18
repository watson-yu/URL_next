import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Group, Stack, Button } from '@mantine/core';
import { BusinessGrid } from '@/components/BusinessGrid';
import { SearchBar } from '@/components/SearchBar';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function CityPage({ 
  params 
}: { 
  params: { type: string; city: string } 
}) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo || !locationUtils.isCityValid(params.city)) {
    notFound();
  }

  const businessList = businesses.getByTypeAndCity(params.type, params.city);
  const districts = locationUtils.getDistrictsForCity(params.city);
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== params.type);

  const breadcrumbItems = [
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
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      <Stack spacing="xl">
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
              color="blue"
            >
              {typeInfo.displayName}
            </Button>
            {typeInfo.services.map((service) => (
              <Button
                key={service}
                component={Link}
                href={`/t/${service}/${params.city}`}
                variant="light"
              >
                {format.toDisplay(service)}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Best Hair Salons */}
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
          <Group>
            {otherTypes.map(([type, info]) => (
              <Button
                key={type}
                component={Link}
                href={`/v/${type}/${params.city}`}
                variant="light"
              >
                {info.displayName}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Hair Salon in Districts */}
        <Stack spacing="md">
          <Title order={2} size="h3">
            {typeInfo.displayName} in Districts
          </Title>
          <Group>
            {districts.map((district) => (
              <Button
                key={district}
                component={Link}
                href={`/v/${params.type}/${params.city}/${district}`}
                variant="light"
              >
                {typeInfo.displayName} in {format.toDisplay(district)}
              </Button>
            ))}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
} 