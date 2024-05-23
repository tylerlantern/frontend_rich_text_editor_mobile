'use client';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import "froala-editor/css/plugins/fullscreen.min.css";
import { dependencyKeys } from '@/client_modules/DependencyKeys';
import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
const FroalaReactComponent = dynamic(
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

  function auth(value: string) {
    setToken(value)
  }

  const noTranslateAttrs = { class: 'notranslate', translate: 'no' };
  const editorRef = useRef(null);

  useEffect(
    () => {
      (window as any).getRawHTML = getRawHTML;
      (window as any).setRawHTML = setRawHTML;
      (window as any).auth = auth;
      import('froala-editor').then(FroalaEditor => {
        FroalaEditor.default.DefineIconTemplate('element', '[ELEMENT]');
        FroalaEditor.default.DefineIcon('doNotTranslate', {
          ELEMENT: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#404040" d="M4.123 5.189 3 6.312l2.905 2.905v6.009a1.325 1.325 0 0 0 1.321 1.321h5.283l.66 1.981h2.047l2.047 2.047 1.123-1.123-14.065-14-.198-.263Zm2.443 5.415a2.036 2.036 0 0 1 .066-.66l1.254 1.254a2.2 2.2 0 0 0 1.519 1.519l1.189 1.189a2.247 2.247 0 0 1-.66.066 3.381 3.381 0 0 1-3.368-3.368ZM11.122 11.132l.528.528c.075-.167.12-.346.132-.528h-.66Z"/><path fill="#404040" d="M19.112 5.981h-6.607L11.848 4H7.226a1.325 1.325 0 0 0-1.321 1.321v.594l1.981 2.047A3.2 3.2 0 0 1 9.805 7.3a3.26 3.26 0 0 1 2.245.858l-.858.858a1.76 1.76 0 0 0-1.325-.526 2.226 2.226 0 0 0-1.123.33l1.189 1.189h2.972c.058.215.08.438.066.66a3.378 3.378 0 0 1-.528 1.849l3.236 3.236-.66-1.915 2.047 2.047.594-.594-2.114-2.179a7.773 7.773 0 0 0 1.585-2.773h1.254v-.859h-2.971v-.859h-.859v.858h-.924l-.858-2.509h5.942a.662.662 0 0 1 .66.66v9.245a.662.662 0 0 1-.66.66h-1.188l.99.99h.594a1.325 1.325 0 0 0 1.321-1.321V7.3a1.325 1.325 0 0 0-1.32-1.319Zm-2.774 4.358a7.448 7.448 0 0 1-1.32 2.311 7.015 7.015 0 0 1-.594-.726l-.529-1.585h2.443Z"/></svg>`,
          template: 'element',
        });
        FroalaEditor.default.RegisterCommand('doNotTranslate', {
          title: 'Do Not Translate',
          focus: true,
          undo: true,
          refreshAfterCallback: true,
          callback: function() {
            const editor = this;
            editor.format.toggle('span', noTranslateAttrs);
          },
          refresh: function($button: any) {
            const editor = this;
            if (editor.format.is('span', noTranslateAttrs))
              $button.addClass('fr-active');
            else $button.removeClass('fr-active');
          },
        });

        FroalaEditor.default.OPTS_MAPPING

        console.log('editorRef', editorRef)

      });
    }
  )
  const iframeStyle = `
  body {
    font-family: sans-serif;
    word-break: break-word;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    word-break: break-word;
  }

  p img {
    height: auto !important;
  }

  hr {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    border: 0.5px solid #d9d9d9;
    border-radius: 5px;
  }

  a {
    color: #0d5ea2;
    word-break: break-word;
  }

  table td {
    border: 1px solid rgb(221, 221, 221);
  }

  table.borderless td {
    border: none;
  }

  table th.borderless {
    border: none;
  }

  table td.borderless {
    border: none;
  }

  .fr-class-code {
    line-height: 1.8em;
  }

  .notranslate, [translate=no] {
    border-radius: 2px;
    padding: 2px 0;
    background-color: #d3eef0;
  }
`;
  let config = {
    iframe: iframe,
    iframeStyle: iframeStyle,
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
          'doNotTranslate',
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
    ],
    events: {
      'image.beforeUpload': function() {
        console.log('beforeupload')
      },
      'image.inserted': function(image: any) {
        // (window as any).webkit.messageHandlers.callback.postMessage("inserted image");
        console.log('insert', image)
      }
    }
  }
  return (
    <Suspense>
      <main>
        <div className="flex flex-col h-screen bg-white">
          <FroalaReactComponent
            /* @ts-ignore */
            ref={editorRef}
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
