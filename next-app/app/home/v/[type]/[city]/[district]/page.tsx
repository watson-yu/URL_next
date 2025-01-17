import { Container } from '@/components/Container';
import { services } from '@/data/services';
import { businesses } from '@/data/businesses';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';
import { Title } from '@mantine/core';
import { BusinessGrid } from '@/components/BusinessGrid';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePath } from '@/utils/routes';

export default function DistrictPage({ 
  params 
}: { 
  params: { type: string; city: string; district: string } 
}) {
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
    }
  ];

  return (
    <Container size="md" py="xl">
      <SearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      
      <Title order={2} size="h3" mb="md">
        Best {typeInfo.displayName}s near me in {format.toDisplay(params.district)}, {format.toDisplay(params.city)}
      </Title>

      <BusinessGrid businesses={businessList} />
    </Container>
  );
} 