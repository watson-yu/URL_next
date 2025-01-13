import React from 'react';
import { Text, Button, Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { generatePath } from '../utils/routes';

export default function AlsoAvailable({ currentType, city, district }) {
  const navigate = useNavigate();
  
  // 過濾掉當前類型
  const otherTypes = Object.entries(services.types)
    .filter(([type]) => type !== currentType);

  if (otherTypes.length === 0) return null;

  const handleClick = (type) => {
    if (district) {
      navigate(generatePath.district(type, city, district));
    } else if (city) {
      navigate(generatePath.city(type, city));
    } else {
      navigate(generatePath.type(type));
    }
  };

  return (
    <Stack spacing="xs" mb="xl">
      <Text size="sm" weight={500} color="dimmed">
        Also Available in {district ? `${district}, ${city}` : city}
      </Text>
      <Group spacing="sm">
        {otherTypes.map(([type, info]) => (
          <Button
            key={type}
            variant="light"
            onClick={() => handleClick(type)}
            size="sm"
          >
            {info.displayName}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
