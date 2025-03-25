import { create } from "zustand";

interface TextOptions {
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  top: number;
  left: number;
}
interface EditorProps {
  currentEditor: string;
  setCurrentEditor: (newEditor: string) => void;
  textOptions: TextOptions;
  setTextOptions: (newOptions: TextOptions) => void;
  addText: () => void;
}

export const useEditorStore = create<EditorProps>((set) => ({
  currentEditor: "canvas",
  setCurrentEditor: (newEditor: string) => set({ currentEditor: newEditor }),
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    fontFamily: "Arial",
    top: 0,
    left: 0,
  },
  setTextOptions: (newOptions: TextOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add Text",
        fontSize: 48,
        color: "#000000",
        fontFamily: "Arial",
        top: 10,
        left: 10,
      },
    }),
}));
