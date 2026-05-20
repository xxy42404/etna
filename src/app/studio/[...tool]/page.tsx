'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function StudioPage() {
  const [Studio, setStudio] = useState<ComponentType | null>(null);

  useEffect(() => {
    import('./StudioComponent').then((mod) => setStudio(() => mod.default));
  }, []);

  if (!Studio) {
    return (
      <div className="flex items-center justify-center h-screen text-neutral-500">
        Loading Studio...
      </div>
    );
  }

  return <Studio />;
}
