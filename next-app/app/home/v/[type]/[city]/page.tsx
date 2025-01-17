import { services } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function CityPage({ 
  params 
}: { 
  params: { type: string; city: string } 
}) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo || !locationUtils.isCityValid(params.city)) {
    notFound();
  }

  return (
    <div>
      <h1>{typeInfo.displayName} in {format.toDisplay(params.city)}</h1>
      {/* Copy relevant components from src/pages/CityPage.jsx */}
    </div>
  );
} 