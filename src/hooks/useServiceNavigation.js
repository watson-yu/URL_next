import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const navigationStrategies = {
  type: (type, service) => `/home/${type}/${service}`,
  city: (type, service, city) => `/home/${type}/${service}-${city}`,
  district: (type, service, city, district) => `/home/${type}/${service}-${city}/${district}`
};

export const useServiceNavigation = (level) => {
  const navigate = useNavigate();
  
  const handleNavigation = useCallback((params) => {
    const strategy = navigationStrategies[level];
    if (!strategy) {
      console.error(`No navigation strategy found for level: ${level}`);
      return;
    }
    const path = strategy(...Object.values(params));
    navigate(path);
  }, [level, navigate]);

  return handleNavigation;
};
