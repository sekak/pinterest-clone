import { render, screen, fireEvent } from '@testing-library/react';
import Orientation from '@/components/editor/orientationContent/orientation';
import { describe, it, expect, vi } from 'vitest';

describe('<Orientation />', () => {
  const mockHandleClick = vi.fn();

  const defaultProps = {
    handleClickOrientation: mockHandleClick,
    canvasOptions: {
      orientation: 'landscape',
    },
  };

  it('renders both orientation buttons', () => {
    render(<Orientation {...defaultProps} />);

    expect(screen.getByText('Landscape')).toBeInTheDocument();
    expect(screen.getByText('Portrait')).toBeInTheDocument();
  });

  it('calls handleClickOrientation with "landscape"', () => {
    render(<Orientation {...defaultProps} />);
    fireEvent.click(screen.getByText('Landscape'));

    expect(mockHandleClick).toHaveBeenCalledWith('landscape');
  });

  it('calls handleClickOrientation with "portrait"', () => {
    render(<Orientation {...defaultProps} />);
    fireEvent.click(screen.getByText('Portrait'));

    expect(mockHandleClick).toHaveBeenCalledWith('portrait');
  });

  it('applies selected class when orientation is landscape', () => {
    render(<Orientation {...defaultProps} />);
    expect(screen.getByText('Landscape')).toHaveClass('bg-white shadow');
    expect(screen.getByText('Portrait')).not.toHaveClass('bg-white shadow');
  });

  it('applies selected class when orientation is portrait', () => {
    render(<Orientation {...defaultProps} canvasOptions={{ orientation: 'portrait' }} />);
    expect(screen.getByText('Portrait')).toHaveClass('bg-white shadow');
    expect(screen.getByText('Landscape')).not.toHaveClass('bg-white shadow');
  });
});
