import React, { useEffect, useState } from 'react';
import Header from './header';
import PinForm from './pinForm';
import PinImage from './pinImage';
import Editor from '../../components/editor/editor';
import { useNavigate } from 'react-router';
import useStore from '../../utils/authStore';
import { Img } from './types';

export default function CreatePage() {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewImg, setPreviewImg] = React.useState<Img | null>(null);
  const { currentUser } = useStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser)
      navigate('/login');
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!file) return
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setPreviewImg({
        url: URL.createObjectURL(file),
        width: img.width,
        height: img.height,
        name: file.name,
      });
    }
  }, [file])

  return (
    <div className="flex flex-col w-full h-full">
      <Header isEditing={isEditing} setIsEditing={setIsEditing} />
      {isEditing ?
        (previewImg && <Editor previewImg={previewImg} />) :
        (<div className="flex lg:items-start items-center justify-center mx-auto md:w-[60%] w-full my-8 gap-6 lg:flex-row flex-col p-2">
          <PinImage previewImg={previewImg} setFile={setFile} isEditing={isEditing} setIsEditing={setIsEditing} />
          <PinForm />
        </div>)}
    </div>
  );
}