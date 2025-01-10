import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text, Group, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import { services } from '../data/services';
import { generatePath, parseTypeService } from '../utils/routes';
import { format } from '../utils/format';

export default function BusinessGrid({ businesses }) {
  const ITEMS_PER_PAGE = 4;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathParts = location.pathname.split('/').filter(Boolean);
  const typeService = pathParts[1];
  const { type, service } = parseTypeService(typeService);
  const city = pathParts[2];
  const district = pathParts[3];

  const renderBusinessGrid = () => {
    return (
      <SimpleGrid 
        cols={2} 
        spacing="md" 
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        {businesses.slice(0, displayCount).map((business) => (
          <BusinessCard 
            key={business.id} 
            business={business} 
            location={business.location}
          />
        ))}
      </SimpleGrid>
    );
  };

  if (!type || pathParts.length <= 1) {
    return (
      <Stack spacing="xl">
        {renderBusinessGrid()}
        {displayCount < businesses.length && (
          <Button 
            variant="light" 
            onClick={() => setDisplayCount(prev => prev + ITEMS_PER_PAGE)}
            sx={{ alignSelf: 'center' }}
          >
            Show More
          </Button>
        )}
      </Stack>
    );
  }

  const typeInfo = services.types[type];

  if (!businesses || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found
      </Text>
    );
  }

  const handleServiceClick = (newService) => {
    const storageService = format.toStorageFormat(newService);
    const newTypeService = service === storageService ? 
      format.toRouteFormat(type) : 
      `${format.toRouteFormat(type)}-${format.toRouteFormat(newService)}`;

    if (district) {
      navigate(generatePath.district(newTypeService, city, district));
    } else if (city) {
      navigate(generatePath.city(newTypeService, city));
    } else {
      navigate(service === storageService ? 
        generatePath.type(type) : 
        generatePath.typeWithService(type, newService)
      );
    }
  };

  return (
    <Stack spacing="xl">
      {renderBusinessGrid()}

      <Stack spacing="md" align="center">
        {displayCount < businesses.length && (
          <Button 
            variant="light" 
            onClick={() => setDisplayCount(prev => prev + ITEMS_PER_PAGE)}
          >
            Show More
          </Button>
        )}

        <Box 
          sx={{
            overflowX: 'auto',
            width: '100%',
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none',
            'scrollbarWidth': 'none'
          }}
        >
          <Group spacing="sm" position="center" noWrap>
            {typeInfo?.services.map((serviceOption) => (
              <Button
                key={serviceOption}
                variant={service === format.toStorageFormat(serviceOption) ? "filled" : "light"}
                color={typeInfo?.color}
                onClick={() => handleServiceClick(serviceOption)}
                sx={{ flexShrink: 0 }}
              >
                {format.toDisplayFormat(serviceOption)}
              </Button>
            ))}
          </Group>
        </Box>
      </Stack>
    </Stack>
  );
}
