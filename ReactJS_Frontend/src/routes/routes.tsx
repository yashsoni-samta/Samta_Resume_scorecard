import { Routes, Route } from 'react-router-dom';
import RoutePaths from './routePaths';
import { About, Details, Home } from '../modules/user';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path={RoutePaths.details} element={<Details />} />
        <Route path={RoutePaths.about} element={<About />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
