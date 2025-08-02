import {
  Banana,
  LayoutDashboard,
  Scale,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { UserDropdown } from '@/components/UserDropdown'


export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('exercise')

  return (
    <div className='min-h-screen bg-black text-white px-8 py-6'>
      <div className='flex justify-between items-center mb-6'>
        <div />
        <div className='flex items-center gap-2'>
          <UserDropdown />
        </div>
      </div>

      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 mb-6'>
        {[LayoutDashboard, ShieldCheck, UserRound, Banana, Scale].map((Icon, idx) => (
          <button
            key={idx}
            className='bg-gray-800 hover:bg-gray-700 w-full aspect-square flex items-center justify-center rounded-xl'
          >
            <Icon className='w-10 h-10 text-white' />
          </button>
        ))}
      </div>

      <div className='flex gap-2 mb-4'>
        <button
          onClick={() => setSelectedTab('exercise')}
          className={`px-4 py-2 rounded-full text-sm \${selectedTab === 'exercise' ? 'bg-white text-black' : 'bg-gray-800'}`}
        >
          Exercise Log
        </button>
        <button
          onClick={() => setSelectedTab('bodyweight')}
          className={`px-4 py-2 rounded-full text-sm \${selectedTab === 'bodyweight' ? 'bg-white text-black' : 'bg-gray-800'}`}
        >
          Bodyweight Log
        </button>
      </div>

      <div className='bg-gray-900 rounded-xl overflow-hidden text-sm'>
        <div className='p-4 flex justify-between items-center border-b border-gray-700'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-gray-800 px-3 py-2 rounded-md w-1/3 outline-none'
          />
          <div className='text-gray-400 text-xs'>Rows per page: 5</div>
        </div>
        <table className='w-full text-left'>
          <thead className='bg-gray-800 border-b border-gray-700'>
          <tr>
            <th className='py-2 px-4'>Exercise Name</th>
            <th className='py-2 px-4'>Weight</th>
            <th className='py-2 px-4'>Reps</th>
            <th className='py-2 px-4'>Date</th>
            <th className='py-2 px-4'>Note</th>
          </tr>
          </thead>
          <tbody>
          <tr className='text-center text-gray-500'>
            <td colSpan={5} className='py-6'>No data available</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
