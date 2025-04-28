import Layers from "@/components/editor/layers"
import { fireEvent, render, screen } from "@testing-library/react"
import { vi } from "vitest"


vi.mock('@/components/image/image', () => ({
    default: () => <img src="/general/text.png" alt="example" />
}))

const mockCurrentEditor = 'text';
const mockSetCurrentEditor = vi.fn();
const mockAddText = vi.fn();

vi.mock('@/utils/editorStore', () => {
    return {
        useEditorStore: () => ({
            currentEditor: mockCurrentEditor,
            setCurrentEditor: mockSetCurrentEditor,
            addText: mockAddText,
            canvasOptions: { backgroundColor: '#ffffff' },
        }),
    };
});

describe('layer component', () => {

    it('renders Layers, WorkSpace and Options correctly', () => {
        render(<Layers />)

        expect(screen.getByText('Layers')).toBeInTheDocument();
        expect(screen.getByText('Select a layer to edit.')).toBeInTheDocument();
        expect(screen.getByText('Add Text')).toBeInTheDocument();
        expect(screen.getByText('Canvas')).toBeInTheDocument();
        expect(screen.getByText('Add Text')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/general/text.png');
    })

    it('calls addText when currentEditor is text', () => {
        render(<Layers />);

        fireEvent.click(screen.getByText('Add Text'));

        expect(mockAddText).toHaveBeenCalled();
        expect(mockSetCurrentEditor).toHaveBeenCalledWith('text');
        expect(mockCurrentEditor).toBe('text');
    });

    it('calls setCurrentEditor when canvas is clicked', () => {

        render(<Layers />);

        fireEvent.click(screen.getByText('Canvas'));

        expect(mockSetCurrentEditor).toHaveBeenCalledWith('canvas');
    });
})
