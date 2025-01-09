import React, { useState, useCallback } from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessList from '../components/BusinessList';
import SearchBar from '../components/SearchBar';
import { businesses } from '../data/businesses';
import { generatePath } from '../routes/paths';

export default function ServiceCityPage() {
  const { type, service, city } = useParams();
  const decodedType = decodeURIComponent(type).replace(/-/g, ' ');
  const decodedService = decodeURIComponent(service).replace(/-/g, ' ');
  const decodedCity = decodeURIComponent(city);
  const country = decodedCity === 'Taipei' || decodedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';

  const [filteredBusinesses, setFilteredBusinesses] = useState(
    Object.values(businesses[country][decodedCity])
      .flat()
      .filter(business => 
        business.type.toLowerCase() === decodedType.toLowerCase() &&
        business.services.includes(decodedService)
      )
  );

  const handleFilter = useCallback(({ district }) => {
    let filtered = Object.values(businesses[country][decodedCity])
      .flat()
      .filter(business => 
        business.type.toLowerCase() === decodedType.toLowerCase() &&
        business.services.includes(decodedService)
      );

    if (district) {
      filtered = filtered.filter(business =>
        businesses[country][decodedCity][district].some(b => b.id === business.id)
      );
    }

    setFilteredBusinesses(filtered);
  }, [country, decodedCity, decodedType, decodedService]);

  const breadcrumbItems = [
    { label: decodedType, path: generatePath.type(decodedType) },
    { 
      label: `${decodedService} in ${decodedCity}`, 
      path: generatePath.serviceCity(decodedType, decodedService, decodedCity) 
    }
  ];

  return (
    <Container size="md" py="xl">
      <Breadcrumbs items={breadcrumbItems} />
      <Title order={1} mb="xl">{decodedService} at {decodedType} in {decodedCity}</Title>
      <SearchBar 
        initialType={decodedType}
        initialCity={decodedCity}
        initialService={decodedService}
        onFilter={handleFilter}
      />
      <BusinessList businesses={filteredBusinesses} />
    </Container>
  );
}
