import React, { useState } from 'react';
import { SimpleGrid, Button, Stack, Text, Group, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import { services } from '../data/services';
import { generatePath } from '../utils/routes';
import { format } from '../utils/format';

export default function BusinessGrid({ businesses }) {
  const ITEMS_PER_PAGE = 4;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 解析當前路徑
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  // 基礎渲染函數
  const renderBusinessGrid = () => (
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'sm', cols: 1 }
      ]}
    >
      {businesses.slice(0, displayCount).map((business, index) => (
        <BusinessCard 
          key={`${business.id}-${index}`}
          business={business}
          location={business.location}
        />
      ))}
    </SimpleGrid>
  );

  // 如果是首頁，不顯示type切換
  if (pathParts.length <= 1) {
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

  const currentType = pathParts[1];
  const secondPart = decodeURIComponent(pathParts[2] || '');
  
  // Debug: 輸出當前路徑資訊
  console.log('Current path parts:', {
    pathParts,
    currentType,
    secondPart,
    fullPath: location.pathname
  });

  // 解析城市名稱
  let currentCity = '';
  if (secondPart) {
    if (secondPart.includes('-')) {
      // 從 service-city 格式中提取城市名稱
      const parts = secondPart.split('-');
      currentCity = parts[parts.length - 1]; // 確保取最後一個部分
      console.log('Extracted city from service-city:', {
        secondPart,
        parts,
        currentCity
      });
    } else {
      // 純城市名稱
      currentCity = secondPart;
      console.log('Pure city:', currentCity);
    }
  }

  if (!businesses || businesses.length === 0) {
    return (
      <Text align="center" color="dimmed" mt="xl">
        No businesses found
      </Text>
    );
  }

  const handleTypeChange = (newType) => {
    if (currentCity) {
      // 無論是否有 service，都轉到純 city 頁面
      const formattedCity = format.toRouteFormat(currentCity);
      const newPath = generatePath.city(newType, formattedCity);
      console.log('Navigation details:', {
        currentCity,
        formattedCity,
        newType,
        newPath,
        originalPath: location.pathname
      });
      navigate(newPath);
    } else {
      const newPath = generatePath.type(newType);
      console.log('Navigating to type:', newPath);
      navigate(newPath);
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
                  key={`type-switch-${type}`}
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
