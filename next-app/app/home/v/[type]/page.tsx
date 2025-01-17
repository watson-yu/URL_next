import { services } from '@/data/services';
import { format } from '@/utils/format';
import { notFound } from 'next/navigation';

export default function TypePage({ params }: { params: { type: string } }) {
  const typeInfo = services.types[params.type];
  
  if (!typeInfo) {
    notFound();
  }

  return (
    <div>
      <h1>{typeInfo.displayName}</h1>
      {/* Copy relevant components from src/pages/TypePage.jsx */}
    </div>
  );
} 