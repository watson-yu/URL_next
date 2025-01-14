import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, Button, Group, Text, Box } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import BusinessGrid from '../components/BusinessGrid';
import { businesses } from '../data/businesses';
import { generatePath, locationUtils } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function ServiceDistrictPage() {
  // ... 其他代碼保持不變 ...

  const breadcrumbItems = [
    {
      label: typeInfo.displayName,
      path: generatePath.display.type(type),
      // 修改這裡：點擊類型時導航到對應的區域頁面
      actualPath: generatePath.actual.district(type, city, district)
    },
    {
      label: `${format.toDisplay(service)} in ${format.toDisplay(city)}`,
      path: generatePath.display.serviceCity(type, service, city),
      actualPath: generatePath.actual.serviceCity(type, service, city)
    },
    {
      label: format.toDisplay(district),
      path: generatePath.display.serviceDistrict(type, service, city, district),
      actualPath: generatePath.actual.serviceDistrict(type, service, city, district)
    }
  ];

  // ... 其他代碼保持不變 ...
}
