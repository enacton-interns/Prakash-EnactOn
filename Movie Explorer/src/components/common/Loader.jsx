import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ message = 'Loading movies...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-cinema-muted">
      <Loader2 className="w-8 h-8 animate-spin text-gold-500 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
