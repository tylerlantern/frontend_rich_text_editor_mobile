import RichText from './_components/RichText';
// import { useState } from 'react';
// import Head from 'next/head';

// interface State {
//   model: string
// }

export default function RichTextPage() {
  return (
    <RichText />
  )
}

// export default function RichText() {
//
//   const [state, setState] = useState<State>({
//     model: ""
//   });
//
//   const handleModelChange = (value: string) => {
//     setState({ model: value });
//   };
//
//   (window as any).getRawHtml = (): string => {
//     return state.model;
//   };
//
//   let config = {
//     fullPage: true,
//     events: {
//       'contentChanged': function(e: any, editor: any) {
//         console.log('test');
//       }
//     },
//     toolbarButtons: {
//       moreText: {
//         buttons: [
//           "bold",
//           "italic",
//           "underline",
//           "strikeThrough",
//           "subscript",
//           "superscript",
//           "fontFamily",
//           "fontSize",
//           "textColor",
//           "backgroundColor",
//           "inlineClass",
//           "inlineStyle",
//           "clearFormatting"
//         ]
//       },
//       moreParagraph: {
//         buttons: [
//           "alignLeft",
//           "alignCenter",
//           "formatOLSimple",
//           "alignRight",
//           "alignJustify",
//           "formatOL",
//           "formatUL",
//           "paragraphFormat",
//           "paragraphStyle",
//           "lineHeight",
//           "outdent",
//           "indent",
//           "quote"
//         ]
//       },
//       moreRich: {
//         buttons: [
//           "insertLink",
//           "insertImage",
//           "insertVideo",
//           "insertTable",
//           "emoticons",
//           "fontAwesome",
//           "specialCharacters",
//           "embedly",
//           "insertFile",
//           "insertHR"
//         ]
//       },
//       moreMisc: {
//         buttons: [
//           "undo",
//           "redo",
//           "fullscreen",
//           "print",
//           "getPDF",
//           "spellChecker",
//           "selectAll",
//           "html",
//           "help"
//         ],
//         align: "right",
//         buttonsVisible: 2,
//       },
//       pluginsEnabled: [
//         "table",
//         "spell",
//         "quote",
//         "save",
//         "quickInsert",
//         "paragraphFormat",
//         "paragraphStyle",
//         "help",
//         "draggable",
//         "align",
//         "link",
//         "lists",
//         "file",
//         "image",
//         "emoticons",
//         "url",
//         "video",
//         "embedly",
//         "colors",
//         "entities",
//         "inlineClass",
//         "inlineStyle",
//         // 'codeBeautif '
//         // 'spellChecker',
//         "imageTUI"
//       ]
//     },
//   };
//   return (
//     <main >
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
//       </Head>
//       {/* <style> */}
//       {/*   {` */}
//       {/*   .fr-wrapper { */}
//       {/*     height: 100vh; */}
//       {/*     overflow: hidden; */}
//       {/*   } */}
//       {/* `} */}
//       {/* </style> */}
//       <div className="flex flex-col h-screen bg-white">
//         <FroalaEditorComponent
//           tag='textarea'
//           config={config}
//           model={state.model}
//           onModelChange={handleModelChange}
//         />
//         <button className='text-black' >Click me</button>
//       </div>
//     </main >
//   );
// }
