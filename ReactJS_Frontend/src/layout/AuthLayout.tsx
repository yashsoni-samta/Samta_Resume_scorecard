import { Container, Flex, Paper } from '@mantine/core';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}

function AuthLayout({ children, header }: AuthLayoutProps) {
  return (
    <Container fluid h={'100vh'}>
      <Flex
        justify={'center'}
        align={'center'}
        h={'inherit'}
        direction={'column'}
      >
        {header}
        <Paper
          shadow='lg'
          radius='lg'
          withBorder
          p='0'
          styles={{
            root: {
              overflow: 'hidden',
            },
          }}
        >
          {children}
        </Paper>
      </Flex>
    </Container>
  );
}

export default AuthLayout;
