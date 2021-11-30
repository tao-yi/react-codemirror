import { useRef, useEffect } from 'react'
// import { EditorState } from "@codemirror/state"
// import { defaultKeymap } from "@codemirror/commands"
import { keymap } from "@codemirror/view"
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import { Transaction } from '@codemirror/state'
import { indentWithTab } from "@codemirror/commands"
import { oneDarkTheme } from '@codemirror/theme-one-dark'


const doc = `if (true) {
  console.log("okay")
} else {
  console.log("oh no")
}`


let baseTheme = EditorView.baseTheme({
  ".cm-o-replacement": {
    display: "inline-block",
    width: ".5em",
    height: ".5em",
    borderRadius: ".25em"
  },
  "&light .cm-o-replacement": {
    backgroundColor: "#04c"
  },
  "&dark .cm-o-replacement": {
    backgroundColor: "#5bf"
  }
})

let myTheme = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#034"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#074"
  },
  ".cm-gutters": {
    backgroundColor: "#045",
    color: "#ddd",
    border: "none"
  }
}, { dark: true })

const Editor = () => {

  const root = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    // let startState = EditorState.create({
    //   doc: "Hello World",
    //   extensions: [keymap.of(defaultKeymap)]
    // })

    let view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          basicSetup,
          // https://codemirror.net/6/examples/tab/
          keymap.of([indentWithTab]),
          javascript(),
          // baseTheme,
          // oneDarkTheme,
          myTheme
        ]
      }),
      parent: root.current,
      dispatch: (tr: Transaction) => {
        console.log(tr.changes);
        view.update([tr])
      }
    })

    view.dispatch({
      changes: { from: 0, insert: "#!/usr/bin/env node\n" }
    })

    return () => view.destroy()
  }, [])


  return (
    <div ref={root} />

  )
}

export default Editor
