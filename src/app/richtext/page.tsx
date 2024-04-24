'use client';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import "froala-editor/css/plugins/fullscreen.min.css";

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      /* @ts-ignore */
      import("froala-editor/js/plugins.pkgd.min.js"),
      /* @ts-ignore */
      import("froala-editor/js/froala_editor.pkgd.min.js"),
      /* @ts-ignore */
      import("froala-editor/js/plugins/image.min.js"),
      /* @ts-ignore */
      import('froala-editor/js/plugins/draggable.min.js')
    ]);
    return values[0];
  },
  {
    loading: () => <p>LOADING!!!</p>,
    ssr: false
  }
);

interface State {
  model: string;
}

declare global {
  interface Window {
    getState?: () => string;
  }
}

export default function RichText() {

  const [model, setModel] = useState<string>("")

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

  useEffect(
    () => {
      (window as any).getRawHTML = getRawHTML;
      (window as any).setRawHTML = setRawHTML;
    }, [model]
  );

  let config = {
    iframe: iframe,
    attribution: false,
    placeholder: "Start typing...",
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting"
        ]
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote"
        ]
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR"
        ]
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "help"
        ],
        align: "right",
        buttonsVisible: 2,
      },
      pluginsEnabled: [
        "table",
        "spell",
        "quote",
        "save",
        "quickInsert",
        "paragraphFormat",
        "paragraphStyle",
        "help",
        "draggable",
        "align",
        "link",
        "lists",
        "file",
        "image",
        "emoticons",
        "url",
        "video",
        "embedly",
        "colors",
        "entities",
        "inlineClass",
        "inlineStyle",
        // 'codeBeautif '
        // 'spellChecker',
        "imageTUI"
      ]
    },
    pluginsEnabled: [
      "table",
      "spell",
      "quote",
      "save",
      "quickInsert",
      "paragraphFormat",
      "paragraphStyle",
      "help",
      "draggable",
      "align",
      "link",
      "lists",
      "file",
      "image",
      "emoticons",
      "url",
      "video",
      "embedly",
      "colors",
      "entities",
      "inlineClass",
      "inlineStyle",
      "imageTUI"
    ]
  }
  return (
    <Suspense>
      <main>
        <div className="flex flex-col h-screen bg-white">
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
