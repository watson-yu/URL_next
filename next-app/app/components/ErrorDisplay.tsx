'use client';

import { Alert, Button, Stack, Text } from '@mantine/core';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ 
  message = 'Something went wrong', 
  onRetry 
}: ErrorDisplayProps) {
  return (
    <Alert
      title="Error"
      color="red"
      variant="filled"
    >
      <Stack gap="md">
        <Text size="sm" c="white">
          {message}
        </Text>
        {onRetry && (
          <Button 
            variant="white" 
            color="red" 
            size="xs" 
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </Stack>
    </Alert>
  );
} 