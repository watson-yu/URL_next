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
          {/* 基本路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home/:type" element={<TypePage />} />
          
          {/* 服務相關路由 - 需要在一般城市/區域路由之前 */}
          <Route path="/home/:type/:service-:city" element={<ServiceCityPage />} />
          <Route path="/home/:type/:service-:city/:district" element={<ServiceDistrictPage />} />
          
          {/* 一般城市/區域路由 */}
          <Route path="/home/:type/:city" element={<CityPage />} />
          <Route path="/home/:type/:city/:district" element={<DistrictPage />} />
          <Route path="/home/:type/:city/:district/:businessId" element={<BusinessDetail />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
