'use client';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min.js';
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/css/plugins/fullscreen.min.css";
import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function RichText() {
  let config = {
    iframe: true,
    fullPage: true,
    events: {
      'contentChanged': function(e: any, editor: any) {
        console.log('test');
      }
    },
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
  };
  return (
    <main >
      <style>
        {`
        .fr-wrapper {
          height: 100vh;
          overflow: hidden;
        }
      `}
      </style>
      <div className="flex flex-col h-screen">
        <FroalaEditorComponent tag='textarea' config={config} />
      </div>
    </main >
  );
}
