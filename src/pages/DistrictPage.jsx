import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function DistrictPage() {
  const navigate = useNavigate();
  const { type, city, district } = useParams();
  console.log('DistrictPage params:', { type, city, district }); // Debug

  const typeInfo = services.types[type];
  const businessList = businesses.getByTypeAndCityAndDistrict(type, city, district);
  console.log('Businesses found:', businessList?.length); // Debug

  // ... rest of the component
}
