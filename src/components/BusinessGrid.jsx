import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text, Group, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import { services } from '../data/services';
import { generatePath } from '../utils/routes';

export default function BusinessGrid({ businesses }) {
  const ITEMS_PER_PAGE = 4;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 解析當前路徑
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  // 如果是首頁，不顯示type切換
  if (pathParts.length <= 1) {
    return (
      <Stack spacing="xl">
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'sm', cols: 1 }
          ]}
        >
          {businesses.slice(0, displayCount).map(business => (
            <BusinessCard 
              key={business.id} 
              business={business}
              location={business.location}
            />
          ))}
        </SimpleGrid>

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

  const currentType = pathParts[1];
  const secondPart = pathParts[2];
  
  // 判斷是否包含service
  const hasService = secondPart?.includes('-');
  const currentCity = hasService ? secondPart?.split('-').pop() : secondPart;

  if (!businesses || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found
      </Text>
    );
  }

  const handleTypeChange = (newType) => {
    if (hasService && currentCity) {
      // 如果當前頁面有service，切換時轉到純city頁面
      navigate(generatePath.city(newType, currentCity));
    } else if (currentCity) {
      // 保持在相同city
      navigate(generatePath.city(newType, currentCity));
    } else {
      // 純type頁面直接切換
      navigate(generatePath.type(newType));
    }
  };

  return (
    <Stack spacing="xl">
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'sm', cols: 1 }
        ]}
      >
        {businesses.slice(0, displayCount).map(business => (
          <BusinessCard 
            key={business.id} 
            business={business}
            location={business.location}
          />
        ))}
      </SimpleGrid>

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
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbarWidth': 'none'
          }}
        >
          <Group spacing="sm" position="center" noWrap>
            {Object.entries(services.types)
              .filter(([type]) => type !== currentType)
              .map(([type, { displayName, color }]) => (
                <Button
                  key={type}
                  variant="light"
                  color={color}
                  onClick={() => handleTypeChange(type)}
                  sx={{ flexShrink: 0 }}
                >
                  Switch to {displayName}
                </Button>
              ))}
          </Group>
        </Box>
      </Stack>
    </Stack>
  );
}
