import { render, screen, fireEvent } from '@testing-library/react';
import TextStyle from '@/components/editor/optionContent/textStyle';
import { vi } from 'vitest';

// Mock the store
const mockSetTextOptions = vi.fn();

vi.mock('@/utils/editorStore', () => ({
  useEditorStore: () => ({
    textOptions: {
      bold: false,
      italic: true,
      underline: false,
    },
    setTextOptions: mockSetTextOptions,
  }),
}));

describe('TextStyle Component', () => {
  beforeEach(() => {
    mockSetTextOptions.mockClear();
  });

  it('renders style buttons', () => {
    render(<TextStyle />);
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Underline')).toBeInTheDocument();
  });

  it('toggles bold style on click', () => {
    render(<TextStyle />);
    fireEvent.click(screen.getByText('Bold'));

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      bold: true,
      italic: true,
      underline: false,
    });
  });

  it('toggles italic style on click', () => {
    render(<TextStyle />);
    fireEvent.click(screen.getByText('Italic'));

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      bold: false,
      italic: false,
      underline: false,
    });
  });

  it('toggles underline style on click', () => {
    render(<TextStyle />);
    fireEvent.click(screen.getByText('Underline'));

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      bold: false,
      italic: true,
      underline: true,
    });
  });
});
