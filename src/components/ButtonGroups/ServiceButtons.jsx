import React from 'react';
import { Group, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { generatePath, validatePath } from '../../utils/routes';
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

  // 重新排序服務列表：當前服務排在第一位
  const orderedServices = typeInfo.services.sort((a, b) => {
    if (a === currentService) return -1;
    if (b === currentService) return 1;
    return format.toDisplay(a).localeCompare(format.toDisplay(b));
  });

  const handleClick = (service) => {
    // 驗證所有參數
    if (!validatePath.type(type) || !validatePath.service(type, service)) {
      navigate('/');
      return;
    }

    if (district) {
      if (validatePath.district(city, district)) {
        navigate(generatePath.serviceDistrict(type, service, city, district));
      } else {
        navigate(generatePath.serviceCity(type, service, city));
      }
    } else if (city) {
      if (validatePath.city(city)) {
        navigate(generatePath.serviceCity(type, service, city));
      } else {
        navigate(generatePath.type(type));
      }
    }
  };

  return (
    <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
      {orderedServices.map((service) => (
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
