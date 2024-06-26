'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Froala from 'froala-editor';
import FroalaEditor from 'react-froala-wysiwyg';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import "froala-editor/css/plugins/fullscreen.min.css";

import "froala-editor/js/froala_editor.min.js"
import "froala-editor/js/plugins.pkgd.min.js"
import "froala-editor/js/froala_editor.pkgd.min.js"
import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/draggable.min.js"
import "froala-editor/js/third_party/embedly.min.js"
import { useSearchParams } from 'next/navigation';
import { apiClient, imageKitClient } from '@/client_modules/DependencyKeys';
import { UnauthorizedError } from '@/client_modules/APIClient';

type Props = {
  token: string | null,
  placeId: number | null
}

enum DisplayStatus {
  IDLE,
  SHOWING,
  REFRESH
}

const FroalaEditorComponent: React.FC<Props> = ({ token, placeId }) => {
  const searchParams = useSearchParams()
  const iframe: boolean = searchParams.get('iframe') === 'true'
  const isMobile: boolean = searchParams.get('isMobile') === 'true'
  const [model, setModel] = useState<string>("")
  const [status, setStatus] = useState<DisplayStatus>(DisplayStatus.IDLE)

  const onModelChange = (value: string) => {
    setModel(value)
  }

  function postMessage(value: string) {
    if (isMobile) {
      (window as any).webkit.messageHandlers.callback.postMessage(value);
      return
    }
    console.log(value)
  }

  const getRawHTML = useCallback((): string => {
    return model;
  }, [model]);

  function initialize(
    placeId: number,
    token: string,
    rawHTML: string
  ) {
    setModel(rawHTML)
    loadS3UploadSettings(
      placeId,
      token
    )
  }

  const noTranslateAttrs = { class: 'notranslate', translate: 'no' };
  const editorRef = useRef(null)
  const hasLoadOnce = useRef(false)

  const loadS3UploadSettings = async (placeId: number, token: string) => {
    try {
      const settingInfos = await apiClient.getEditorInfo({ placeId, token, log: (msg) => { } })
      /* @ts-ignore */
      const editor = editorRef.current.editor
      editor.opts.imageUploadToS3 = settingInfos
      setStatus(DisplayStatus.SHOWING)
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        postMessage(`unauthorized`)
        setStatus(DisplayStatus.REFRESH)
        return
      }
      postMessage(`unable to setup uploading to s3::${e}`)
      setStatus(DisplayStatus.REFRESH)
    }
  }

  const didTapRefreshButton = () => {
    postMessage('event.onRefresh')
  }

  useEffect(() => {
    (window as any).getRawHTML = getRawHTML;
  }, [getRawHTML]);

  useEffect(() => {
    if (hasLoadOnce.current) {
      return
    }
    hasLoadOnce.current = true;
    (window as any).initialize = initialize;
    Froala.DefineIconTemplate('element', '[ELEMENT]');
    Froala.DefineIconTemplate('element', '[ELEMENT]');
    Froala.DefineIcon('doNotTranslate', {
      ELEMENT: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#404040" d="M4.123 5.189 3 6.312l2.905 2.905v6.009a1.325 1.325 0 0 0 1.321 1.321h5.283l.66 1.981h2.047l2.047 2.047 1.123-1.123-14.065-14-.198-.263Zm2.443 5.415a2.036 2.036 0 0 1 .066-.66l1.254 1.254a2.2 2.2 0 0 0 1.519 1.519l1.189 1.189a2.247 2.247 0 0 1-.66.066 3.381 3.381 0 0 1-3.368-3.368ZM11.122 11.132l.528.528c.075-.167.12-.346.132-.528h-.66Z"/><path fill="#404040" d="M19.112 5.981h-6.607L11.848 4H7.226a1.325 1.325 0 0 0-1.321 1.321v.594l1.981 2.047A3.2 3.2 0 0 1 9.805 7.3a3.26 3.26 0 0 1 2.245.858l-.858.858a1.76 1.76 0 0 0-1.325-.526 2.226 2.226 0 0 0-1.123.33l1.189 1.189h2.972c.058.215.08.438.066.66a3.378 3.378 0 0 1-.528 1.849l3.236 3.236-.66-1.915 2.047 2.047.594-.594-2.114-2.179a7.773 7.773 0 0 0 1.585-2.773h1.254v-.859h-2.971v-.859h-.859v.858h-.924l-.858-2.509h5.942a.662.662 0 0 1 .66.66v9.245a.662.662 0 0 1-.66.66h-1.188l.99.99h.594a1.325 1.325 0 0 0 1.321-1.321V7.3a1.325 1.325 0 0 0-1.32-1.319Zm-2.774 4.358a7.448 7.448 0 0 1-1.32 2.311 7.015 7.015 0 0 1-.594-.726l-.529-1.585h2.443Z"/></svg>`,
      template: 'element',
    });
    Froala.RegisterCommand('doNotTranslate', {
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
    if (token && placeId && status == DisplayStatus.IDLE && editorRef.current)
      loadS3UploadSettings(placeId, token)
  }, []);


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
        'codeBeautif',
        'spellChecker',
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
        //TODO
      },
      'image.inserted': function(image: any) {
        const url = new URL(image[0].src);
        const imageSplit = url.pathname
          .substring(1)
          .replace(/\+/g, ' ');
        const imageDecode = encodeURI(decodeURIComponent(imageSplit));
        image.attr(
          'src',
          imageKitClient.generatePath(imageDecode),
        );
      }
    }
  }

  return (
    <>
      {
        status == DisplayStatus.IDLE &&
        <div>IDLE</div>
      }
      {
        status == DisplayStatus.REFRESH &&
        <RefreshComponent didTapRefreshButton={didTapRefreshButton}></RefreshComponent>
      }
      <div style={{ visibility: status === DisplayStatus.SHOWING ? 'visible' : 'hidden' }}>
        <FroalaEditor
          /* @ts-ignore */
          ref={editorRef}
          tag='textarea'
          config={config}
          model={model}
          onModelChange={onModelChange}
        />
      </div>
    </>
  )
}


type RefreshComponentProps = {
  didTapRefreshButton: () => void
}

const RefreshComponent: React.FC<RefreshComponentProps> = ({ didTapRefreshButton }) => {
  return (
    <div className="flex justify-center w-full py-8">
      <button
        className="rounded-none px-3 py-3 bg-slate-400"
        onClick={didTapRefreshButton}
      >
        Refresh
      </button>
    </div>
  )
}

export default FroalaEditorComponent

