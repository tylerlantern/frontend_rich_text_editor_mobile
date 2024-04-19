'use client';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function RichText() {
  const iframeStyle = `
    .fr-wrapper : {
       height: 100vh
    }
  `
  let config = {
    iframe: true,
    events: {
      'contentChanged': function(e: any, editor: any) {
        console.log('test');
      }
    },
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      },
      'moreRich': {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']

      },
      'moreMisc': {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'align': 'right',
      }
    },
  };
  return (
    <main >
      <style>
        {`
        .fr-wrapper {
          height: 100vh;
        }
      `}

      </style>
      <div className="flex flex-col h-screen">
        <FroalaEditorComponent tag='textarea' config={config} />
      </div>
    </main >
  );
}
