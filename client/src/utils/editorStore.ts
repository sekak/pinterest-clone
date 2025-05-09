import { create } from "zustand";


interface TextOptions {
  text: string;
  fontSize: number;
  color: string;
  top: number;
  left: number;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline: boolean;
}
interface EditorProps {
  currentEditor: string;
  setCurrentEditor: (newEditor: string) => void;
  textOptions: TextOptions;
  setTextOptions: (newOptions: TextOptions) => void;
  addText: () => void;
  canvasOptions: CanvasOptions;
  setCanvasOptions: (newOptions: CanvasOptions) => void;
}

interface CanvasOptions {
  height: number;
  size: string;
  backgroundColor: string;
  orientation: 'portrait' | 'landscape' | '';
}

export const useEditorStore = create<EditorProps>((set) => ({
  currentEditor: "canvas",
  setCurrentEditor: (newEditor: string) => set({ currentEditor: newEditor }),
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    align: 'left',
    top: 0,
    left: 0,
    bold: false,
    italic: false,
    underline: false,
  },
  setTextOptions: (newOptions: TextOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add Text",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0,
        align: 'left',
        bold: false,
        italic: false,
        underline: false,
      },
    }),
  canvasOptions: {
    height: 0,
    size: 'original',
    backgroundColor: "#ffffff",
    orientation: "",
  },
  setCanvasOptions: (newOptions: CanvasOptions) => set({ canvasOptions: newOptions }),
}));
