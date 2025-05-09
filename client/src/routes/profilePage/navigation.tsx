
export default function Navigation({ setType, type }: { setType: (type: string) => void, type: string }) {
    return (
        <div className='my-6 flex items-center gap-4 text-sm'>
            <span
                onClick={() => setType('created')}
                className={`text-[15px] font-semibold cursor-pointer border-b-2 border-transparent transition-all duration-300 ${type === 'created' && '!border-black'}`}
            >
                Created
            </span>
            <span
                onClick={() => setType('saved')}
                className={`text-[15px] font-semibold cursor-pointer border-b-2 border-transparent transition-all duration-300 ${type === 'saved' && '!border-black'}`}
            >
                Saved
            </span>
        </div>
    );
}