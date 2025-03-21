import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import theme from './theme/theme.ts';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features

import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)

dayjs.extend(customParseFormat);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Router>
    </MantineProvider>
  </StrictMode>
);
