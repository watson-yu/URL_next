import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import HomePage from './pages/HomePage';
import TypePage from './pages/TypePage';
import CityPage from './pages/CityPage';
import DistrictPage from './pages/DistrictPage';
import ServiceCityPage from './pages/ServiceCityPage';
import ServiceDistrictPage from './pages/ServiceDistrictPage';
import BusinessDetail from './pages/BusinessDetail';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Service routes must come before regular routes */}
          <Route path="/home/:type/:serviceCity" element={<ServiceCityPage />} />
          <Route path="/home/:type/:serviceCity/:district" element={<ServiceDistrictPage />} />
          {/* Regular routes */}
          <Route path="/home/:type" element={<TypePage />} />
          <Route path="/home/:type/:city" element={<CityPage />} />
          <Route path="/home/:type/:city/:district" element={<DistrictPage />} />
          <Route path="/home/:type/:city/:district/:businessId" element={<BusinessDetail />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
