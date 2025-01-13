import React from 'react';
import { Group, Button, Box, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { generatePath, validatePath } from '../../utils/routes';

export function TypeButtons({ currentType, city, district }) {
  const navigate = useNavigate();
  
  // 過濾掉當前類型
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== currentType);

  if (otherTypes.length === 0) return null;

  const handleClick = (type) => {
    // 驗證所有參數
    if (!validatePath.type(type)) {
      navigate('/');
      return;
    }

    if (district) {
      if (validatePath.district(city, district)) {
        navigate(generatePath.district(type, city, district));
      } else if (validatePath.city(city)) {
        navigate(generatePath.city(type, city));
      } else {
        navigate(generatePath.type(type));
      }
    } else if (city) {
      if (validatePath.city(city)) {
        navigate(generatePath.city(type, city));
      } else {
        navigate(generatePath.type(type));
      }
    } else {
      navigate(generatePath.type(type));
    }
  };

  return (
    <Box mb="xl">
      <Text size="sm" weight={500} color="dimmed" mb="xs">
        Also Available
      </Text>
      <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
        {otherTypes.map(([type, info]) => (
          <Button
            key={type}
            variant="light"
            onClick={() => handleClick(type)}
            size="sm"
            sx={{ flexShrink: 0 }}
          >
            {info.displayName}
          </Button>
        ))}
      </Group>
    </Box>
  );
}
