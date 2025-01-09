import React from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import UnifiedSearchBar from '../components/UnifiedSearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';

export default function DistrictPage() {
  const { type, city, district } = useParams();
  
  const formatDisplayText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedCity = formatDisplayText(city);
  const formattedDistrict = formatDisplayText(district);
  const country = formattedCity === 'Taipei' || formattedCity === 'Kaohsiung' ? 'Taiwan' : 'Japan';
  
  const filteredBusinesses = businesses[country][formattedCity][formattedDistrict]
    .filter(business => 
      business.type.toLowerCase() === formatDisplayText(type).toLowerCase()
    )
    .map(business => ({
      ...business,
      location: {
        country,
        city: formattedCity,
        district: formattedDistrict
      }
    }));

  const breadcrumbItems = [
    {
      label: formatDisplayText(type),
      path: `/${type}`
    },
    {
      label: formattedCity,
      path: `/${type}/${city}`
    },
    {
      label: formattedDistrict,
      path: `/${type}/${city}/${district}`
    }
  ];

  return (
    <Container size="md" py="xl">
      <Title order={1} align="center" mb="md">
        {formatDisplayText(type)} in {formattedDistrict}, {formattedCity}
      </Title>
      <UnifiedSearchBar />
      <Breadcrumbs items={breadcrumbItems} />
      <BusinessGrid businesses={filteredBusinesses} />
    </Container>
  );
}
