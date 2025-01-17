'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  colors: {
    brand: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a7cc',
      '#7489b8',
      '#576da3',
      '#415189',
      '#2d3969',
      '#1c254b',
      '#0d1230'
    ],
  },
  primaryColor: 'brand',
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
} 