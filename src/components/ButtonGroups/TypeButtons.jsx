import React from 'react';
import { Group, Button, Box, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { generatePath } from '../../utils/routes';

export function TypeButtons({ currentType, city, district }) {
  const navigate = useNavigate();
  
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== currentType);

  if (otherTypes.length === 0) return null;

  const handleClick = (type) => {
    if (district) {
      navigate(generatePath.actual.district(type, city, district));
    } else if (city) {
      navigate(generatePath.actual.city(type, city));
    } else {
      navigate(generatePath.actual.type(type));
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
