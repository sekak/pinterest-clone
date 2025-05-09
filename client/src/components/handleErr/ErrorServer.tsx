import { Button } from '@mui/material'

export default function ErrorServer() {
  return (
    <div className='flex justify-center w-full mt-8'>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-4 text-center bg-white rounded-lg shadow-md">
        <h2 className='text-lg font-semibold'>Oops, something went wrong!</h2>
        <p className=' text-gray-500'>Don't worry, let's get you back on track.</p>
        <Button className='!mt-4' variant="outlined" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  )
}