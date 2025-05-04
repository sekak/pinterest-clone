import { render, screen, fireEvent } from '@testing-library/react';
import FontSize from '@/components/editor/optionContent/fontSize';
import { vi } from 'vitest';

// Mock the editor store
const mockSetTextOptions = vi.fn();

vi.mock('@/utils/editorStore', () => ({
  useEditorStore: () => ({
    textOptions: { fontSize: 16 },
    setTextOptions: mockSetTextOptions,
  }),
}));

describe('FontSize Component', () => {
  beforeEach(() => {
    mockSetTextOptions.mockClear();
  });

  it('renders the input with correct initial font size', () => {
    render(<FontSize />);
    const input = screen.getByRole('spinbutton'); // role for number input
    expect(input).toHaveValue(16);
  });

  it('updates font size when input changes', () => {
    render(<FontSize />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '24' } });

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      fontSize: 24,
    });
  });

  it('prevents font size from going below 8', () => {
    render(<FontSize />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '3' } });

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      fontSize: 8, // should be clamped to minimum
    });
  });

  it('defaults to 16 if input is invalid', () => {
    render(<FontSize />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '' } });

    expect(mockSetTextOptions).toHaveBeenCalledWith({
      fontSize: 16,
    });
  });
});
