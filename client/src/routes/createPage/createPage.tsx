import { useEffect, useRef, useState } from 'react';
import Header from '@/routes/createPage/header';
import PinForm from '@/routes/createPage/pinForm';
import PinImage from '@/routes/createPage/pinImage';
import Editor from '@/components/editor/editor';
import { useNavigate } from 'react-router';
import useStore from '@/utils/authStore';
import { Img } from '@/routes/createPage/types';
import { useMutation } from '@tanstack/react-query';
import { useEditorStore } from '@/utils/editorStore';
import { createPin } from '@/utils/fetch';
import { handleFormData } from './utils/handleFormData';


export default function CreatePage() {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<Img | null>(null);
  const [errors, setErrors] = useState<{name:string, message:string}[] | null>([null]);

  const { currentUser } = useStore()
  const navigate = useNavigate();
  const { textOptions, canvasOptions } = useEditorStore()
  const formRef = useRef<HTMLFormElement | null>(null);

  const {mutate, isPending: loading} = useMutation({
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
    if (isEditing)
      setIsEditing(false);
    else {
      if (formRef.current === null || !file) return
      const formData = new FormData(formRef.current);
      const isError = handleFormData(formData);
      if(isError)
      {
        setErrors(isError);
        return
      }
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      mutate(formData)
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Header loading={loading} isEditing={isEditing} setIsEditing={setIsEditing} handleSubmit={handleSubmit} isImageExist={previewImg ? true : false} />
      {isEditing ?
        (previewImg && <Editor previewImg={previewImg} />) :
        (<div className="flex lg:flex-row flex-col p-4 gap-4 h-full mt-10 lg:w-[1100px] md:w-[90%] w-full mx-auto">
          <div className='flex-[.6] w-full'>
            <PinImage previewImg={previewImg} setFile={setFile} isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
          <div className='flex-1 w-full'>
            <PinForm errors={errors} formRef={formRef} isImageExist={previewImg ? true : false} />
          </div>
        </div>)}
    </div>
  );
}