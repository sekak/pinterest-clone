export interface OptionsType {
  name: string;
  width: number;
  height: number;
}

export type backgroundType = {
  canvasOptions: {
    backgroundColor: string;
  };
  setCanvasOptions: (options: { backgroundColor: string }) => void;
};

export type orientationType = {
  handleClickOrientation: (orientation: string) => void;
  canvasOptions: {
    orientation: string;
  };
};

export type SizeType = {
  handleClickSize: (size: OptionsType | string) => void;
  canvasOptions: {
    size: string;
    orientation: string;
  };
};
