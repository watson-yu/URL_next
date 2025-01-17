import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Text, Stack, Group, Badge, Card, Button } from '@mantine/core';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePath } from '@/utils/routes';
import { AlsoAvailable } from '@/components/AlsoAvailable';
import Link from 'next/link';

interface BusinessDetailPageProps {
  params: {
    type: string;
    city: string;
    district: string;
    businessId: string;
  };
}

export default function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const business = businesses.getById(Number(params.businessId));
  const typeInfo = services.types[params.type];
  
  if (!business || !typeInfo || 
      !locationUtils.isCityValid(params.city) || 
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.actual.type(params.type),
      actualPath: generatePath.actual.type(params.type)
    },
    {
      label: format.toDisplay(params.city),
      path: generatePath.actual.city(params.type, params.city),
      actualPath: generatePath.actual.city(params.type, params.city)
    },
    {
      label: format.toDisplay(params.district),
      path: generatePath.actual.district(params.type, params.city, params.district),
      actualPath: generatePath.actual.district(params.type, params.city, params.district)
    },
    {
      label: business.name,
      path: generatePath.actual.business(params.type, params.city, params.district, params.businessId),
      actualPath: generatePath.actual.business(params.type, params.city, params.district, params.businessId)
    }
  ];

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      <Stack gap="xl">
        {/* Business Info */}
        <Card withBorder>
          <Stack gap="md">
            <Title order={1} size="h2">
              {business.name}
            </Title>

            <Group>
              <Badge size="lg" variant="light">
                {typeInfo.displayName}
              </Badge>
            </Group>

            <Text size="lg" c="dimmed">
              {format.toDisplay(business.location.district)}, 
              {format.toDisplay(business.location.city)}, 
              {business.location.country}
            </Text>
          </Stack>
        </Card>

        {/* Available Services */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Available Services
          </Title>
          <Group>
            {business.services?.map((service) => (
              <Button
                key={service}
                component={Link}
                href={generatePath.actual.serviceCity(service, params.city)}
                variant="light"
              >
                {format.toDisplay(service)}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Also Available */}
        <AlsoAvailable 
          currentType={params.type}
          currentCity={params.city}
          currentDistrict={params.district}
        />
      </Stack>
    </Container>
  );
} 