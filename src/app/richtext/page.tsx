'use server';

import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { Suspense } from 'react';

declare global {
  interface Window {
    getState?: () => string;
  }
}

const FroalaEditorComponent = dynamic(
  async () => {
    const value = import('./FroalaEditorComponent')
    return value
  },
  {
    loading: () => <p>LOADING!!!</p>,
    ssr: false
  }
);

export default async function RichText() {
  const token = headers().get('token')
  const placeId: number = +headers().get('placeId')
  return (
    <Suspense>
      <main>
        <div className="flex flex-col h-screen bg-white">
          <FroalaEditorComponent token={token} placeId={placeId} ></FroalaEditorComponent>
        </div>
      </main>
    </Suspense >
  );
}
