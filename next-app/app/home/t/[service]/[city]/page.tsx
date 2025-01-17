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
import { generatePath } from '@/utils/routes';
import Link from 'next/link';

interface ServicePageProps {
  params: {
    service: string;
    city: string;
  };
}

export default function ServiceCityPage({ params }: ServicePageProps) {
  // Find which type this service belongs to
  let serviceType: string | undefined;
  let typeInfo: any;

  Object.entries(services.types).forEach(([type, info]) => {
    if (info.services.includes(params.service)) {
      serviceType = type;
      typeInfo = info;
    }
  });

  if (!serviceType || !typeInfo || !locationUtils.isCityValid(params.city)) {
    notFound();
  }

  const businessList = businesses.getByServiceAndCity(params.service, params.city);
  const districts = locationUtils.getDistrictsForCity(params.city);

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.actual.type(serviceType),
      actualPath: generatePath.actual.type(serviceType)
    },
    {
      label: format.toDisplay(params.city),
      path: generatePath.actual.city(serviceType, params.city),
      actualPath: generatePath.actual.city(serviceType, params.city)
    },
    {
      label: format.toDisplay(params.service),
      path: generatePath.actual.serviceCity(params.service, params.city),
      actualPath: generatePath.actual.serviceCity(params.service, params.city)
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
              href={generatePath.actual.city(serviceType, params.city)}
              variant="light"
            >
              {typeInfo.displayName}
            </Button>
            {typeInfo.services.map((service) => (
              <Button
                key={service}
                component={Link}
                href={generatePath.actual.serviceCity(service, params.city)}
                variant={service === params.service ? "filled" : "light"}
                color={service === params.service ? "blue" : undefined}
              >
                {format.toDisplay(service)}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Best Service Providers */}
        <Stack spacing="md">
          <Title order={2} size="h3">
            Best {format.toDisplay(params.service)} near me in {format.toDisplay(params.city)}
          </Title>
          <BusinessGrid businesses={businessList} />
        </Stack>

        {/* Service in Districts */}
        <Stack spacing="md">
          <Title order={2} size="h3">
            {format.toDisplay(params.service)} in Districts
          </Title>
          <Group>
            {districts.map((district) => (
              <Button
                key={district}
                component={Link}
                href={generatePath.actual.serviceDistrict(params.service, params.city, district)}
                variant="light"
              >
                {format.toDisplay(params.service)} in {format.toDisplay(district)}
              </Button>
            ))}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
} 