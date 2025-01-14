import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import HomePage from './pages/HomePage';
import TypePage from './pages/TypePage';
import CityPage from './pages/CityPage';
import DistrictPage from './pages/DistrictPage';
import ServiceCityPage from './pages/ServiceCityPage';
import ServiceDistrictPage from './pages/ServiceDistrictPage';
import BusinessDetail from './pages/BusinessDetail';
import { URL_PATTERNS } from './constants';
import { getTypeByService } from './data/services';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* New V Routes (Type-based) */}
          <Route path="/home/v/:type" element={<TypePage />} />
          <Route path="/home/v/:type/:city" element={<CityPage />} />
          <Route path="/home/v/:type/:city/:district" element={<DistrictPage />} />

          {/* New T Routes (Service-based) - Updated to remove type from URL */}
          <Route path="/home/t/:service/:city" element={<ServiceCityPage />} />
          <Route path="/home/t/:service/:city/:district" element={<ServiceDistrictPage />} />

          {/* Legacy Routes - Redirect to new routes */}
          <Route 
            path="/home/:type" 
            element={<Navigate replace to={location => {
              const { type } = location.params;
              return `/home/v/${type}`;
            }} />} 
          />
          <Route 
            path="/home/:type/:city" 
            element={<Navigate replace to={location => {
              const { type, city } = location.params;
              if (city.includes('-')) {
                const [service, actualCity] = city.split('-');
                return `/home/t/${service}/${actualCity}`;
              }
              return `/home/v/${type}/${city}`;
            }} />} 
          />
          <Route 
            path="/home/:type/:city/:district" 
            element={<Navigate replace to={location => {
              const { type, city, district } = location.params;
              if (city.includes('-')) {
                const [service, actualCity] = city.split('-');
                return `/home/t/${service}/${actualCity}/${district}`;
              }
              return `/home/v/${type}/${city}/${district}`;
            }} />} 
          />

          {/* Legacy Service Routes - Redirect to new routes */}
          <Route 
            path="/home/t/:type/:service/:city" 
            element={<Navigate replace to={location => {
              const { service, city } = location.params;
              return `/home/t/${service}/${city}`;
            }} />} 
          />
          <Route 
            path="/home/t/:type/:service/:city/:district" 
            element={<Navigate replace to={location => {
              const { service, city, district } = location.params;
              return `/home/t/${service}/${city}/${district}`;
            }} />} 
          />

          {/* Business Detail - Keep original format */}
          <Route path="/home/:type/:city/:district/:businessId" element={<BusinessDetail />} />

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
