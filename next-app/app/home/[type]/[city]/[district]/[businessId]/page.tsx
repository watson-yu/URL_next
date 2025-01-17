import { services } from '@/data/services';
import { locationUtils } from '@/utils/routes';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function BusinessDetailPage({ 
  params 
}: { 
  params: { 
    type: string; 
    city: string; 
    district: string;
    businessId: string;
  } 
}) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo || !locationUtils.isCityValid(params.city) || 
      !locationUtils.isDistrictValid(params.city, params.district)) {
    notFound();
  }

  return (
    <div>
      <h1>Business {params.businessId}</h1>
      {/* Copy relevant components from src/pages/BusinessDetail.jsx */}
    </div>
  );
} 