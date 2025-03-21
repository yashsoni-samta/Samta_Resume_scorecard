import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  Title,
  Tooltip,
} from '@mantine/core';
import { ReactNode, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormLayoutProps {
  children: ReactNode;
  pageTitle: string;
  actions?: ReactNode;
  handelNavigate?: (path: string) => void;
}

const FormLayout = forwardRef<HTMLDivElement, FormLayoutProps>(
  ({ children, pageTitle, actions, handelNavigate }: FormLayoutProps, ref) => {
    const navigate = useNavigate();
    return (
      <Container fluid>
        <Card p={'md'} radius={'md'} ref={ref} shadow='md' withBorder>
          <Group justify='space-between' align='center'>
            <Group justify='space-between' align='center'>
              <Tooltip label={'go_back'}>
                <Button
                  variant='filled'
                  onClick={() =>
                    handelNavigate ? handelNavigate('back') : navigate(-1)
                  }
                  size={'xs'}
                >
                  close
                </Button>
              </Tooltip>
              <Title order={4}>{pageTitle}</Title>
            </Group>
            {actions}
          </Group>
          <Divider mt={'md'} />
          {children}
        </Card>
      </Container>
    );
  }
);

// Set displayName to avoid the warning
FormLayout.displayName = 'FormLayout';

export default FormLayout;
