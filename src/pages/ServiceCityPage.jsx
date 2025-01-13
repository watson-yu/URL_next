import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils, parseServiceCity } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const { typeService, city } = useParams();
  console.log('ServiceCityPage params:', { typeService, city }); // Debug

  const { type, service } = parseServiceCity(typeService);
  console.log('Parsed params:', { type, service }); // Debug

  const typeInfo = services.types[type];
  const businessList = businesses.getByTypeAndServiceAndCity(type, service, city);
  console.log('Businesses found:', businessList?.length); // Debug

  // ... rest of the component
}
