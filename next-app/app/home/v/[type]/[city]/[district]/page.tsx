import { services } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function DistrictPage({ 
  params 
}: { 
  params: { type: string; city: string; district: string } 
}) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo || !locationUtils.isCityValid(params.city) || 
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  return (
    <div>
      <h1>
        {typeInfo.displayName} in {format.toDisplay(params.district)}, 
        {format.toDisplay(params.city)}
      </h1>
      {/* Copy relevant components from src/pages/DistrictPage.jsx */}
    </div>
  );
} 