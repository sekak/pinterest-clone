import React, { useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function CreatePage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [board, setBoard] = useState<string>('0');
  const [tags, setTags] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Logique pour publier le pin ici
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-t border-b-gray-300 border-t-gray-300 p-4">
        <h1 className="font-bold text-lg">Create Pin</h1>
        <button
          className="bg-red-500 px-4 py-2 rounded-xl text-white"
          onClick={handleSubmit}
        >
          Public
        </button>
      </div>

      <div className="flex lg:items-start items-center justify-center mx-auto md:w-[60%] w-full my-8 gap-6 lg:flex-row flex-col p-2">
        <div className="bg-gray-200/80 border-dashed border-2 border-gray-300/80 p-4 rounded-xl text-center w-full sm:min-w-[375px] h-[453px] flex flex-col items-center justify-center relative">
          <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
            <FileUploadOutlinedIcon className="h-10 w-10" />
            <span>{file ? file.name : 'Choose a file'}</span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".jpg,.mp4"
            onChange={handleFileChange}
          />
          <p className="absolute bottom-4 p-2 text-sm">
            We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.
          </p>
        </div>

        <form className="flex flex-col gap-6 w-full md:min-w-[550px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-[12px]">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
              placeholder="Add a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-[12px]">
              Description
            </label>
            <textarea
              id="description"
              className="border-2 border-gray-300 rounded-2xl px-4 py-3 min-h-20 outline-blue-500 text-gray-800"
              placeholder="Add a detailed description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="board" className="text-[12px]">
              Board
            </label>
            <select
              id="board"
              className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
            >
              <option value="0">Choose a board</option>
              <option value="1">Board 1</option>
              <option value="2">Board 2</option>
              <option value="3">Board 3</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-[12px]">
              Tagged topics
            </label>
            <input
              className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
              type="text"
              id="tags"
              placeholder="Add tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <span className="text-gray-500 text-[12px]">
              Don’t worry, people won’t see your tags
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}