import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Group, Stack, Button } from '@mantine/core';
import { BusinessGrid } from '@/components/BusinessGrid';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Link from 'next/link';

interface DistrictPageProps {
  params: {
    type: string;
    city: string;
    district: string;
  };
}

export default function DistrictPage({ params }: DistrictPageProps) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo || !locationUtils.isCityValid(params.city) || 
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  const businessList = businesses.getByTypeAndCityAndDistrict(
    params.type,
    params.city,
    params.district
  );

  // Get other districts for the city
  const otherDistricts = locationUtils.getDistrictsForCity(params.city)
    .filter(d => d !== params.district);

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
    },
    {
      label: format.toDisplay(params.district),
      path: `/v/${params.type}/${params.city}/${params.district}`,
      actualPath: `/v/${params.type}/${params.city}/${params.district}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      <Stack gap="xl">
        {/* Available Services */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Available Services
          </Title>
          <Group>
            <Button
              component={Link}
              href={`/v/${params.type}/${params.city}/${params.district}`}
              variant="filled"
              color="blue"
            >
              {typeInfo.displayName}
            </Button>
            {typeInfo.services.map((service) => (
              <Button
                key={service}
                component={Link}
                href={`/t/${service}/${params.city}/${params.district}`}
                variant="light"
              >
                {format.toDisplay(service)}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Best Businesses */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Best {typeInfo.displayName}s near me in {format.toDisplay(params.district)}, {format.toDisplay(params.city)}
          </Title>
          <BusinessGrid businesses={businessList} />
        </Stack>

        {/* Other Business Types */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Other Business Types
          </Title>
          <Group>
            {Object.entries(services.types)
              .filter(([type]) => type !== params.type)
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
        <Stack gap="md">
          <Title order={2} size="h3">
            {typeInfo.displayName} in Other Districts
          </Title>
          <Group>
            {otherDistricts.map((district) => (
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