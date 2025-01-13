import React from 'react';
import { Button } from '@mantine/core';
import { useServiceNavigation } from '../hooks/useServiceNavigation';
import { format } from '../utils/format';

export const ServiceButton = ({ 
  level, 
  type, 
  service, 
  city, 
  district, 
  isActive = false,
  color
}) => {
  const handleNavigation = useServiceNavigation(level);
  
  return (
    <Button 
      onClick={() => handleNavigation({ type, service, city, district })}
      variant={isActive ? "filled" : "light"}
      color={color}
      sx={{ flexShrink: 0 }}
    >
      {format.toDisplay(service)}
    </Button>
  );
};
