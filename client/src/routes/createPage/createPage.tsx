import React, { useEffect, useState } from 'react';
import Header from './header';
import PinForm from './pinForm';
import PinImage from './pinImage';
import Editor from '../../components/editor/editor';
import { useNavigate } from 'react-router';
import useStore from '../../utils/authStore';
import { Img } from './types';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../utils/apiRequest';
import { useEditorStore } from '../../utils/editorStore';
interface PropsObject {
  title?: string;
  description?: string;
  tags?: string[];
  media: File | null;
  textOptions: object;
  canvasOptions: object;
}
const createPin = async (data) => {
  const res = await apiRequest.post('/pins/create',data)
  return res.data;
};



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
        console.log(data)
        // navigate(`/pin/${data._id}`);
      }
    },
  })

  useEffect(() => {
    if (!currentUser)
      navigate('/auth/login');
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



  // Handle public pin creation logic
  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    else {
      if (formRef.current === null) return
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      mutation.mutate(formData)
    }
  };



  return (
    <div className="flex flex-col w-full h-full">
      <Header isEditing={isEditing} setIsEditing={setIsEditing} handleSubmit={handleSubmit} />
      {isEditing ?
        (previewImg && <Editor previewImg={previewImg} />) :
        (<div className="flex lg:items-start items-center justify-center mx-auto md:w-[60%] w-full my-8 gap-6 lg:flex-row flex-col p-2">
          <PinImage previewImg={previewImg} setFile={setFile} isEditing={isEditing} setIsEditing={setIsEditing} />
          <PinForm formRef={formRef} />
        </div>)}
    </div>
  );
}