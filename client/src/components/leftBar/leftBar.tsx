import { Link } from 'react-router'
import Image from '@/components/image/image'
import { items } from '@/components/leftBar/utils'

export default function LeftBar() {

    return (
        <div className='flex flex-col justify-between h-screen items-center border-r border-gray-200 sticky top-0 min-w-[72px]'>
            <div className='flex flex-col gap-8 p-3'>
                {items.map((item) => (
                    <Link to={item.href} className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center">
                        <Image media={item.media} className='w-5 h-5' />
                    </Link>
                ))}
            </div>
            <Link to="" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Image media="/general/settings.svg" />
            </Link>
        </div>
    )
}
