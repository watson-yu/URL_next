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

interface ServiceDistrictPageProps {
  params: {
    service: string;
    city: string;
    district: string;
  };
}

export default function ServiceDistrictPage({ params }: ServiceDistrictPageProps) {
  // Find which type this service belongs to
  let serviceType: string | undefined;
  let typeInfo: any;

  Object.entries(services.types).forEach(([type, info]) => {
    if (info.services.includes(params.service)) {
      serviceType = type;
      typeInfo = info;
    }
  });

  if (!serviceType || !typeInfo || 
      !locationUtils.isCityValid(params.city) ||
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  const businessList = businesses.getByServiceAndCityAndDistrict(
    params.service,
    params.city,
    params.district
  );

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: `/v/${serviceType}`,
      actualPath: `/v/${serviceType}`
    },
    {
      label: format.toDisplay(params.service),
      path: `/t/${params.service}/${params.city}`,
      actualPath: `/t/${params.service}/${params.city}`
    },
    {
      label: format.toDisplay(params.district),
      path: `/t/${params.service}/${params.city}/${params.district}`,
      actualPath: `/t/${params.service}/${params.city}/${params.district}`
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
              href={`/v/${serviceType}/${params.city}/${params.district}`}
              variant="light"
            >
              {typeInfo.displayName}
            </Button>
            {typeInfo.services.map((service) => (
              <Button
                key={service}
                component={Link}
                href={`/t/${service}/${params.city}/${params.district}`}
                variant={service === params.service ? "filled" : "light"}
                color={service === params.service ? "blue" : undefined}
              >
                {format.toDisplay(service)}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Best Service Providers */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Best {format.toDisplay(params.service)} near me in {format.toDisplay(params.district)}, {format.toDisplay(params.city)}
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
              .filter(([type]) => type !== serviceType)
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
      </Stack>
    </Container>
  );
} 