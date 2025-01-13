import React from 'react';
import { Group, Box } from '@mantine/core';
import { ServiceButton } from './ServiceButton';

export const ServiceButtonGroup = ({ 
  level, 
  type, 
  services, 
  city, 
  district, 
  currentService,
  color
}) => {
  return (
    <Box mb="xl">
      <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
        {services.map((service) => (
          <ServiceButton
            key={service}
            level={level}
            type={type}
            service={service}
            city={city}
            district={district}
            isActive={service === currentService}
            color={color}
          />
        ))}
      </Group>
    </Box>
  );
};
