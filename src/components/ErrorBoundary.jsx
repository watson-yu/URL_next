import React from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function ErrorDisplay({ title, message, onBack }) {
  return (
    <Container size="md" py="xl">
      <Title order={1} align="center" mb="xl">
        {title}
      </Title>
      <Text align="center" mb="xl">
        {message}
      </Text>
      <Group position="center">
        <Button onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </Group>
    </Container>
  );
}
