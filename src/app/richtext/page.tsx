'use server';

import dynamic from 'next/dynamic';
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

  // const searchParams = useSearchParams()
  // const iframe: boolean = searchParams.get('iframe') === 'true'

  return (
    <Suspense>
      <main>
        <div className="flex flex-col h-screen bg-white">
          <FroalaEditorComponent></FroalaEditorComponent>
        </div>
      </main>
    </Suspense>
  );
}
