'use client';

import { Center, Loader, Stack, Text } from '@mantine/core';

interface LoadingDisplayProps {
  message?: string;
}

export function LoadingDisplay({ message = 'Loading...' }: LoadingDisplayProps) {
  return (
    <Center>
      <Stack align="center" gap="sm">
        <Loader size="lg" />
        <Text size="sm" c="dimmed">
          {message}
        </Text>
      </Stack>
    </Center>
  );
} 