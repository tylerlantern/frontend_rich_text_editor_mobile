'use client';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import "froala-editor/css/plugins/fullscreen.min.css";

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { initConfig } from './RichTextConfig';

const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      /* @ts-ignore */
      import("froala-editor/js/froala_editor.min.js"),
      /* @ts-ignore */
      import("froala-editor/js/plugins.pkgd.min.js"),
      /* @ts-ignore */
      import("froala-editor/js/froala_editor.pkgd.min.js"),
      /* @ts-ignore */
      import("froala-editor/js/plugins/image.min.js"),
      /* @ts-ignore */
      import('froala-editor/js/plugins/draggable.min.js'),
      /* @ts-ignore */
      import("froala-editor/js/third_party/embedly.min.js")

    ]);
    return values[0];
  },
  {
    loading: () => <p>LOADING!!!</p>,
    ssr: false
  }
);

declare global {
  interface Window {
    getState?: () => string;
  }
}

export default function RichText() {

  const [model, setModel] = useState<string>("")
  const [token, setToken] = useState<string>("")

  const onModelChange = (value: string) => {
    setModel(value)
  }

  const searchParams = useSearchParams()
  const iframe: boolean = searchParams.get('iframe') === 'true'

  function getRawHTML(): string {
    return model
  }

  function setRawHTML(value: string) {
    setModel(value)
  }

  function setupCredentials(value: string) {
    setToken(value)
  }

  useEffect(
    () => {
      (window as any).getRawHTML = getRawHTML;
      (window as any).setRawHTML = setRawHTML;
      (window as any).setupCredentials = setupCredentials;
    }, [model]
  );
  const config = initConfig(iframe)
  return (
    <Suspense>
      <main>
        <div className="flex flex-col h-screen bg-white">

          {token.length > 0 && (
            "HEY THE TOKEN IS SET"
          )}

          <FroalaEditor
            tag='textarea'
            config={config}
            model={model}
            onModelChange={onModelChange}
          />
        </div>
      </main>
    </Suspense>

  );
}
