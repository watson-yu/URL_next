import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  const navigate = useNavigate();
  
  if (!items || items.length === 0) return null;

  const handleClick = (e, item, isLast) => {
    e.preventDefault();
    if (!isLast) {
      navigate(item.actualPath);
    }
  };

  return (
    <MantineBreadcrumbs mb="xl">
      <Anchor component={Link} to="/">
        Home
      </Anchor>
      {items.map((item, index) => (
        <Anchor
          key={index}
          component={Link}
          to={item.path}
          onClick={(e) => handleClick(e, item, index === items.length - 1)}
          color={index === items.length - 1 ? 'dimmed' : undefined}
          sx={index === items.length - 1 ? { 
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
