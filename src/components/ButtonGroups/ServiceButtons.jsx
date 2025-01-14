import React from 'react';
import { Group, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { generatePath } from '../../utils/routes';
import { format } from '../../utils/format';

export function ServiceButtons({ 
  type, 
  currentService, 
  city, 
  district,
  level = 'type' 
}) {
  const navigate = useNavigate();
  const typeInfo = services.types[type];

  if (!typeInfo) return null;

  const handleClick = (service) => {
    if (district) {
      navigate(generatePath.actual.serviceDistrict(type, service, city, district));
    } else if (city) {
      navigate(generatePath.actual.serviceCity(type, service, city));
    }
  };

  return (
    <Group spacing="sm" noWrap sx={{ padding: '4px', overflowX: 'auto' }}>
      {typeInfo.services.map((service) => (
        <Button
          key={service}
          variant={service === currentService ? "filled" : "light"}
          color={typeInfo.color}
          onClick={() => handleClick(service)}
          sx={{ flexShrink: 0 }}
        >
          {format.toDisplay(service)}
        </Button>
      ))}
    </Group>
  );
}
