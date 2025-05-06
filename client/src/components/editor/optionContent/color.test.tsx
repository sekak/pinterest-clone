import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Color from '@/components/editor/optionContent/color';

vi.mock('@/utils/editorStore', () => ({
    useEditorStore: () => ({
        textOptions: { color: '#ff0000' },
        setTextOptions: vi.fn(),
    }),
}));

vi.mock('react-colorful', () => ({
    HexColorPicker: (props: any) => {
        return (
            <div>
                <input
                    data-testid="color-picker"
                    onChange={(e) => props.onChange(e.target.value)}
                    value={props.color}
                />
            </div>
        )
    }
}))

describe('Color Component', () => {
    it('render component correctly', () => {
        render(<Color />);

        expect(screen.getByText('Color')).toBeInTheDocument();
    });

    it('should toggle color picker on click', () => {
        render(<Color />);

        const colorPicker = screen.getByTestId('clickable-color');
        fireEvent.click(colorPicker);

        expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    });
});
