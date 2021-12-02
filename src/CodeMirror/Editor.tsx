import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { Transaction } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
// import { EditorState } from "@codemirror/state"
// import { defaultKeymap } from "@codemirror/commands"
import { keymap, ViewUpdate } from "@codemirror/view";
import { useEffect, useRef } from "react";

interface EditorProps {
  value?: string;
  onUpdate?: (update: ViewUpdate) => void;
}

// const startState = EditorState.create({
//   doc: "Hello World",
//   extensions: [keymap.of(defaultKeymap)]
// })

const Editor: React.FC<EditorProps> = ({ value, onUpdate }) => {
  const root = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const extensions = [
      basicSetup,
      // https://codemirror.net/6/examples/tab/
      keymap.of([indentWithTab]),
      javascript({ typescript: true }),
      oneDark,
    ];

    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions,
      }),
      parent: root.current,
      dispatch: (tr: Transaction) => {
        view.update([tr]);
      },
    });

    view.dispatch({
      changes: { from: 0, insert: "#!/usr/bin/env node\n" },
    });

    return () => view.destroy();
  }, []);

  return <div ref={root} />;
};

export default Editor;
