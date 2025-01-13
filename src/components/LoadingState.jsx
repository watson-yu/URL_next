import React from 'react';
import { Container, Loader, Center } from '@mantine/core';

export function LoadingState() {
  return (
    <Container size="md" py="xl">
      <Center>
        <Loader size="xl" />
      </Center>
    </Container>
  );
}
