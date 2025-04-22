import React, { useEffect, useState } from 'react';
import Header from './header';
import PinForm from './pinForm';
import PinImage from './pinImage';
import Editor from '../../components/editor/editor';
import { useNavigate } from 'react-router';
import useStore from '../../utils/authStore';
import { Img } from './types';
import { useMutation } from '@tanstack/react-query';
import { useEditorStore } from '../../utils/editorStore';
import { createPin } from '../../utils/fetch';


export default function CreatePage() {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewImg, setPreviewImg] = React.useState<Img | null>(null);
  const { currentUser } = useStore()
  const navigate = useNavigate();
  const { textOptions, canvasOptions } = useEditorStore()
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const mutation = useMutation({
    mutationFn: createPin,
    onSuccess: (data) => {
      if (data) {
        navigate(`/pin/${data._id}`);
      }
    },
  })

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

  useEffect(() => {
    if (!currentUser)
      navigate('/auth/login');
  }, [currentUser, navigate]);

  // Handle public pin creation logic
  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    else {
      if (formRef.current === null || !file) return
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      mutation.mutate(formData)
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Header isEditing={isEditing} setIsEditing={setIsEditing} handleSubmit={handleSubmit} isImageExist={previewImg ? true : false} />
      {isEditing ?
        (previewImg && <Editor previewImg={previewImg} />) :
        (<div className="flex lg:flex-row flex-col p-4 gap-4 h-full mt-10 lg:w-[1100px] md:w-[90%] w-full mx-auto">
          <div className='flex-[.6] w-full'>
            <PinImage previewImg={previewImg} setFile={setFile} isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
          <div className='flex-1 w-full'>
            <PinForm formRef={formRef} isImageExist={previewImg ? true : false} />
          </div>
        </div>)}
    </div>
  );
}