export interface Img {
    url: string;
    width: number;
    height: number;
    name: string;
}

export interface Props {
    setIsEditing?: (value: boolean) => void;
    isEditing?: boolean;
    file?: File | null;
    setFile?: (value: File) => void;
    previewImg?: Img | null;
}