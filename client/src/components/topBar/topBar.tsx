import UserButton from '@/components/userButton/userButton'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  
  const navigate = useNavigate()
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const search = e.target[0].value
    navigate(`/search?search=${search}`)
  }

  return (
    <div className='flex items-center w-full p-3 sticky top-0 bg-white z-50'>
      <form data-testid='form' onSubmit={handleSearch} className='flex items-center bg-gray-200 rounded-xl flex-1 px-4 py-1.5 my-1 gap-1'>
        <SearchIcon className='text-gray-600' />
        <input type="search" placeholder="Search" className="border p-1.5 border-none outline-none w-full text-gray-700 text-[16px]" />
      </form>
      <UserButton />
    </div>
  )
}
