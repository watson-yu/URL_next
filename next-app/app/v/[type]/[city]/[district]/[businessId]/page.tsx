import { Container } from '@/components/Container';
import { businesses } from '@/data/businesses';
import { getServices } from '@/data/services';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title, Badge, Stack, Group } from '@mantine/core';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: {
    type: string;
    city: string;
    district: string;
    businessId: string;
  };
}

export default async function BusinessPage({ params }: PageProps) {
  try {
    const [business, services] = await Promise.all([
      businesses.getById(parseInt(params.businessId)),
      getServices()
    ]);

    if (!business) {
      notFound();
    }

    const typeInfo = services.types[params.type];
    if (!typeInfo) {
      notFound();
    }

    const treatments = typeInfo.treatments || [];
    const serviceDetails = treatments.filter(t => 
      business.services.includes(t.slug)
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
      },
      {
        label: format.toDisplay(params.district),
        path: `/v/${params.type}/${params.city}/${params.district}`,
        actualPath: `/v/${params.type}/${params.city}/${params.district}`
      },
      {
        label: business.name,
        path: `/v/${params.type}/${params.city}/${params.district}/${params.businessId}`,
        actualPath: `/v/${params.type}/${params.city}/${params.district}/${params.businessId}`
      }
    ];

    return (
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <Breadcrumbs items={breadcrumbs} />

          <Title order={1} size="h2">
            {business.name}
          </Title>

          <Badge variant="light" size="lg">
            {typeInfo.displayName.toUpperCase()}
          </Badge>

          <Stack spacing="md">
            <Title order={2} size="h3">
              Location
            </Title>
            <div>
              {[
                format.toDisplay(business.district),
                format.toDisplay(business.city),
                business.country
              ].filter(Boolean).join(', ')}
            </div>
          </Stack>

          <Stack spacing="md">
            <Title order={2} size="h3">
              Services
            </Title>
            <Group>
              {serviceDetails.map(service => (
                <Badge 
                  key={service.slug} 
                  variant="outline"
                  style={{ textTransform: 'uppercase' }}
                >
                  {service.treatment}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error in BusinessPage:', error);
    return (
      <Container size="md" py="xl">
        <div>Something went wrong. Please try again later.</div>
      </Container>
    );
  }
} 