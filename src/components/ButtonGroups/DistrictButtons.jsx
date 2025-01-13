import React from 'react';
import { Group, Button, Box, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { locationUtils, generatePath, validatePath } from '../../utils/routes';
import { format } from '../../utils/format';
import { services } from '../../data/services';

export function DistrictButtons({ 
  type,
  city,
  currentDistrict,
  service = null
}) {
  const navigate = useNavigate();
  const typeInfo = services.types[type];
  const districts = locationUtils.getDistrictsForCity(city);

  // 過濾掉當前區域
  const availableDistricts = districts.filter(district => 
    district !== currentDistrict
  );

  if (availableDistricts.length === 0) return null;

  const handleClick = (district) => {
    // 驗證所有參數
    if (!validatePath.type(type) || !validatePath.city(city) || 
        !validatePath.district(city, district)) {
      navigate('/');
      return;
    }

    if (service) {
      if (validatePath.service(type, service)) {
        navigate(generatePath.serviceDistrict(type, service, city, district));
      } else {
        navigate(generatePath.district(type, city, district));
      }
    } else {
      navigate(generatePath.district(type, city, district));
    }
  };

  const getButtonText = (district) => {
    if (service) {
      return `${format.toDisplay(service)} in ${format.toDisplay(district)}`;
    }
    return `${typeInfo.displayName} in ${format.toDisplay(district)}`;
  };

  return (
    <Box mb="xl">
      <Text size="sm" weight={500} color="dimmed" mb="xs">
        {service 
          ? `${format.toDisplay(service)} in Other Districts`
          : `${typeInfo.displayName} in Other Districts`
        }
      </Text>
      <Group spacing="sm" noWrap sx={{ padding: '4px' }}>
        {availableDistricts.map((district) => (
          <Button
            key={district}
            variant="light"
            onClick={() => handleClick(district)}
            sx={{ flexShrink: 0 }}
          >
            {getButtonText(district)}
          </Button>
        ))}
      </Group>
    </Box>
  );
}
