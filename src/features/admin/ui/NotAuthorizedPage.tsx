export default function NotAuthorizedPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6'>
      <h1 className='text-5xl font-bold mb-4'>403</h1>
      <p className='text-xl mb-6'>You do not have permission to access this page.</p>
      <a
        href='/'
        className='text-indigo-400 hover:text-indigo-600 underline'
      >
        Go back to Home
      </a>
    </div>
  )
}
