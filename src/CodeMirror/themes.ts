import { EditorView } from "@codemirror/basic-setup";

export const baseTheme = EditorView.baseTheme({
  ".cm-o-replacement": {
    display: "inline-block",
    width: ".5em",
    height: ".5em",
    borderRadius: ".25em",
  },
  "&light .cm-o-replacement": {
    backgroundColor: "#04c",
  },
  "&dark .cm-o-replacement": {
    backgroundColor: "#5bf",
  },
});

export const myTheme = EditorView.theme(
  {
    "&": {
      color: "white",
      backgroundColor: "#034",
    },
    ".cm-content": {
      caretColor: "#0e9",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074",
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none",
    },
  },
  { dark: true },
);
