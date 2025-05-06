import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Editor from "@/components/editor/editor";
import { Img } from "@/routes/createPage/types";

// Mock the child components
vi.mock('@/components/editor/layers', () => ({
  default: () => <div>Mocked Layers</div>,
}));

vi.mock('@/components/editor/workSpace', () => ({
  default: ({ previewImg }: { previewImg: Img }) => <div>Mocked WorkSpace: {previewImg.url}</div>,
}));

vi.mock('@/components/editor/options', () => ({
  default: ({ previewImg }: { previewImg: Img }) => <div>Mocked Options: {previewImg.url}</div>,
}));

describe('Editor component', () => {
  const mockPreviewImg: Img = {
    url: 'https://example.com/image.jpg',
    width: 12,
    height: 23,
    name: 'example.jpg',
  };

  it('renders Layers, WorkSpace and Options correctly', () => {
    render(<Editor previewImg={mockPreviewImg} />);

    expect(screen.getByText('Mocked Layers')).toBeInTheDocument();
    expect(screen.getByText(/Mocked WorkSpace/)).toHaveTextContent(mockPreviewImg.url);
    expect(screen.getByText(/Mocked Options/)).toHaveTextContent(mockPreviewImg.url);
  });
});
