import { useCallback } from "react";

export const useStyle = (textOptions,canvasOptions) => {
    const textContainerStyles: React.CSSProperties = {
        width: '100%',
        height: '100%',
        fontSize: `${textOptions.fontSize}px`,
        top: `${textOptions.top}px`,
        left: `${textOptions.left}px`,
        position: 'absolute',
      };
    
    
      const inputStyles = {
        width: '100%',
        border: 'none',
        background: 'transparent',
        color: textOptions.color,
        cursor: 'grab',
        fontSize: 'inherit',
        textAlign: textOptions.align,
        fontStyle: textOptions.italic ? 'italic' : 'normal',
        fontWeight: textOptions.bold ? 'bold' : 'normal',
        textDecoration: textOptions.underline ? 'underline' : 'none',
      };
    
      const styleContainer = {
        height: canvasOptions.height,
        background: canvasOptions.backgroundColor,
      }

      return {styleContainer, inputStyles, textContainerStyles}
}