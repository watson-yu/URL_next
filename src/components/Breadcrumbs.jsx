import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <MantineBreadcrumbs>
      <Anchor component={Link} to="/">
        Home
      </Anchor>
      {items.map((item, index) => (
        <Anchor
          key={index}
          component={Link}
          to={item.path}
        >
          {item.label}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}
