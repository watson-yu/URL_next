import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { parseTypeService } from '../utils/routes';
import { format } from '../utils/format';
import { services } from '../data/services';

export default function Breadcrumbs({ items }) {
  const processedItems = items.map(item => {
    // Don't modify the label if it's already provided
    return item;
  });

  return (
    <MantineBreadcrumbs mb="xl">
      {items.length > 0 && (
        <Anchor component={Link} to="/">
          Home
        </Anchor>
      )}
      {processedItems.map((item, index) => (
        <Anchor
          key={index}
          component={Link}
          to={item.path}
          color={index === processedItems.length - 1 ? 'dimmed' : undefined}
          sx={index === processedItems.length - 1 ? { 
            cursor: 'default',
            '&:hover': { textDecoration: 'none' }
          } : undefined}
        >
          {item.label}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}
