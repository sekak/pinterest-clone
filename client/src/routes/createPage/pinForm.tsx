type PinFormProps = {
    formRef: React.RefObject<HTMLFormElement | null>;
    isImageExist: boolean;
    errors?: { name: string; message: string }[] | null;
}

export default function PinForm(props: PinFormProps) {

    const getErrorMessage = (name: string) => {
        if (!props.errors) return null;
        const error = props.errors.find((error) => error?.name === name);
        return error ? error?.message : null;
    }

    return (
        <form className={`flex flex-col gap-6 w-full ${!props.isImageExist && 'opacity-40 pointer-events-none'}`} ref={props.formRef}>
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-[12px]">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name='title'
                className={`border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800 ${getErrorMessage('title') && 'border-red-400 outline-red-600'}`}
                    placeholder="Add a title"
                />
                <span className="text-md text-red-500">{getErrorMessage('title')}</span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-[12px]">
                    Description
                </label>
                <textarea
                    id="description"
                    name='description'
                    className={`border-2 border-gray-300 rounded-2xl px-4 py-3 min-h-20 outline-blue-500 text-gray-800 ${getErrorMessage('description') && 'border-red-400 outline-red-600'}`}
                    placeholder="Add a detailed description"
                />
                <span className="text-sm text-red-600">{getErrorMessage('description')}</span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="board" className="text-[12px]">
                    Board
                </label>
                <select
                    id="board"
                    name='board'
                    className={`border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800 ${getErrorMessage('board') && 'border-red-400 outline-red-600'}`}
                >
                    <option value="">Choose a board</option>
                    <option value="Board1">Board 1</option>
                    <option value="Board2">Board 2</option>
                    <option value="Board3">Board 3</option>
                </select>
                <span className="text-md text-red-500">{getErrorMessage('board')}</span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="tags" className="text-[12px]">
                    Tagged topics
                </label>
                <input
                    className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
                    type="text"
                    id="tags"
                    name='tags'
                    placeholder="Add tags"
                />
                <span className="text-gray-500 text-[12px]">
                    Don’t worry, people won’t see your tags
                </span>
            </div>
        </form>
    )
}
