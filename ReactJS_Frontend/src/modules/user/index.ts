import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));

export { Home, Details, About };
