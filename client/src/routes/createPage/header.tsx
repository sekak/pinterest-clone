import { Props } from '@/routes/createPage/types';
import { Button } from '@mui/material';

export default function Header(props: Props) {
    return (
        <div className="flex items-center justify-between border-b border-t border-b-gray-300 border-t-gray-300 p-4">
            <h1 className="font-bold text-lg">{props.isEditing ? 'Edit Pin' : 'Create Pin'}</h1>
           
            <button
                onClick={props.handleSubmit}
                className={`!bg-red-500 !px-3 !py-2 !rounded-xl !text-white !font-semibold !cursor-pointer ${(!props.isImageExist) && '!opacity-50'}`}
            >
                {props.isEditing ? 'Done' : 'Public'}
            </button>
        </div>
    )
}
