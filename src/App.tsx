import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote,  } from "@blocknote/react";
import './App.css'
import { useState } from "react";


 
export default function App() {
  const [html, setHtml] = useState('');
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    // initialContent: blocks.length > 0 ? blocks : undefined
  });

  async function convertToHTML() {
    const HTMLFromBlocks = await editor.blocksToFullHTML(editor.document);

    console.log(HTMLFromBlocks);
  }

  async function convertToBlocks() {
    const blocks = await editor.tryParseHTMLToBlocks(html);
    editor.insertBlocks(blocks, editor.document[0].id);
    const HTMLFromBlocks = await editor.blocksToFullHTML(editor.document);
    console.log(HTMLFromBlocks);

  }
  
 
  // Renders the editor instance using a React component.
  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
      <div>
        <textarea name="html" id="html" cols={30} rows={10} value={html} onChange={(e) => setHtml(e.target.value)}></textarea>
        <button onClick={convertToHTML}>Convert to HTML</button>
        <button onClick={convertToBlocks}>Convert to Blocks</button>
      </div>
       <BlockNoteView editor={editor} />;
  </div>
  )
}
 