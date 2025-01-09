import React, { useState, useCallback } from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessList from '../components/BusinessList';
import SearchBar from '../components/SearchBar';
import { businesses } from '../data/businesses';
import { generatePath } from '../routes/paths';

export default function ServiceDistrictPage() {
  const { type, service, city, district } = useParams();
  const decodedType = decodeURIComponent(type).replace(/-/g, ' ');
  const decodedService = decodeURIComponent(service).replace(/-/g, ' ');
  const decodedCity = decodeURIComponent(city);
  const decodedDistrict = decodeURIComponent(district);
  const country = decodedCity === 'Taipei' || decodedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';

  const [filteredBusinesses, setFilteredBusinesses] = useState(
    businesses[country][decodedCity][decodedDistrict]
      .filter(business => 
        business.type.toLowerCase() === decodedType.toLowerCase() &&
        business.services.includes(decodedService)
      )
  );

  const handleFilter = useCallback(() => {
    const filtered = businesses[country][decodedCity][decodedDistrict]
      .filter(business => 
        business.type.toLowerCase() === decodedType.toLowerCase() &&
        business.services.includes(decodedService)
      );

    setFilteredBusinesses(filtered);
  }, [country, decodedCity, decodedDistrict, decodedType, decodedService]);

  const breadcrumbItems = [
    { label: decodedType, path: generatePath.type(decodedType) },
    { 
      label: `${decodedService} in ${decodedCity}`, 
      path: generatePath.serviceCity(decodedType, decodedService, decodedCity) 
    },
    { 
      label: decodedDistrict, 
      path: generatePath.serviceDistrict(decodedType, decodedService, decodedCity, decodedDistrict) 
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} mb="xl">{decodedService} at {decodedType} in {decodedDistrict}, {decodedCity}</Title>
      <SearchBar 
        initialType={decodedType}
        initialCity={decodedCity}
        initialDistrict={decodedDistrict}
        initialService={decodedService}
        onFilter={handleFilter}
      />
      <BusinessList businesses={filteredBusinesses} />
    </Container>
  );
}
