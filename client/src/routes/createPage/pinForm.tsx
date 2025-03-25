import React from 'react'

export default function PinForm() {
    return (
        <form className="flex flex-col gap-6 w-full md:min-w-[550px]" >
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-[12px]">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
                    placeholder="Add a title"
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
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="board" className="text-[12px]">
                    Board
                </label>
                <select
                    id="board"
                    className="border-2 border-gray-300 rounded-2xl px-4 py-3 outline-blue-500 text-gray-800"
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
                />
                <span className="text-gray-500 text-[12px]">
                    Don’t worry, people won’t see your tags
                </span>
            </div>
        </form>
    )
}
