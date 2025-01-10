import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import HomePage from './pages/HomePage';
import TypePage from './pages/TypePage';
import CityPage from './pages/CityPage';
import DistrictPage from './pages/DistrictPage';
import BusinessDetail from './pages/BusinessDetail';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home/:typeService" element={<TypePage />} />
          <Route path="/home/:typeService/:city" element={<CityPage />} />
          <Route path="/home/:typeService/:city/:district" element={<DistrictPage />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
