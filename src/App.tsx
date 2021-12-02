import { ViewUpdate } from "@codemirror/view";
import React from "react";
import "./App.css";
import Editor from "./CodeMirror/Editor";

const initialValue = `if (true) {
  console.log("okay")
} else {
  console.log("oh no")
}`;

function App() {
  const onUpdate = (viewUpdate: ViewUpdate) => {
    console.log(viewUpdate.state.doc.length);
  };

  return <Editor value={initialValue} onUpdate={onUpdate} />;
}

export default App;
