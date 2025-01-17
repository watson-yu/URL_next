import { services, getTypeByService } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function ServiceDistrictPage({ 
  params 
}: { 
  params: { service: string; city: string; district: string } 
}) {
  const type = getTypeByService(params.service);
  
  if (!type || !locationUtils.isCityValid(params.city) || 
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  return (
    <div>
      <h1>
        {format.toDisplay(params.service)} in {format.toDisplay(params.district)}, 
        {format.toDisplay(params.city)}
      </h1>
      {/* Copy relevant components from src/pages/ServiceDistrictPage.jsx */}
    </div>
  );
} 