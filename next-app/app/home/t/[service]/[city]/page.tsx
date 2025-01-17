import { services, getTypeByService } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function ServiceCityPage({ 
  params 
}: { 
  params: { service: string; city: string } 
}) {
  const type = getTypeByService(params.service);
  
  if (!type || !locationUtils.isCityValid(params.city)) {
    notFound();
  }

  return (
    <div>
      <h1>{format.toDisplay(params.service)} in {format.toDisplay(params.city)}</h1>
      {/* Copy relevant components from src/pages/ServiceCityPage.jsx */}
    </div>
  );
} 