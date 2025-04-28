export interface Img {
    url: string;
    width: number;
    height: number;
    name: string;
}

export interface Props {
    loading?: boolean;
    handleSubmit?: () => void;
    setIsEditing?: (value: boolean) => void;
    isEditing?: boolean;
    file?: File | null;
    setFile?: (value: File) => void;
    previewImg?: Img | null;
    isImageExist?: boolean;
}