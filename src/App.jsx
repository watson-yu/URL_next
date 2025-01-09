import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import HomePage from './pages/HomePage';
import TypePage from './pages/TypePage';
import CityPage from './pages/CityPage';
import DistrictPage from './pages/DistrictPage';
import ServiceCityPage from './pages/ServiceCityPage';
import ServiceDistrictPage from './pages/ServiceDistrictPage';
import BusinessDetail from './pages/BusinessDetail';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:type" element={<TypePage />} />
          <Route path="/:type/:city" element={<CityPage />} />
          <Route path="/:type/:city/:district" element={<DistrictPage />} />
          <Route path="/:type/:service-:city" element={<ServiceCityPage />} />
          <Route path="/:type/:service-:city/:district" element={<ServiceDistrictPage />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
