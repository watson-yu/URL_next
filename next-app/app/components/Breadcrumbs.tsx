'use client';

import { Breadcrumbs as MantineBreadcrumbs, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  path: string;
  actualPath: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const router = useRouter();
  
  if (!items || items.length === 0) return null;

  const handleClick = (e: React.MouseEvent, item: BreadcrumbItem, isLast: boolean) => {
    e.preventDefault();
    if (!isLast) {
      router.push(item.actualPath);
    }
  };

  return (
    <Box mb="xl">
      <MantineBreadcrumbs>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        {items.map((item, index) => (
          <Anchor
            key={index}
            component={Link}
            href={item.path}
            onClick={(e) => handleClick(e, item, index === items.length - 1)}
            c={index === items.length - 1 ? 'dimmed' : undefined}
            style={index === items.length - 1 ? { 
              cursor: 'default',
              '&:hover': { textDecoration: 'none' }
            } : undefined}
          >
            {item.label}
          </Anchor>
        ))}
      </MantineBreadcrumbs>
    </Box>
  );
} 