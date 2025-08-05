import React from 'react'
import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel: string
  actionHref: string
  className?: string
}

export default function EmptyState({
                                     title,
                                     description,
                                     actionLabel,
                                     actionHref,
                                     className = '',
                                   }: EmptyStateProps) {
  const navigate = useNavigate()

  return (
    <div className={`p-6 text-center ${className}`}>
      <h2 className='text-xl font-semibold mb-2'>{title}</h2>
      {description && <p className='text-gray-400 mb-4'>{description}</p>}
      <button
        onClick={() => navigate(actionHref)}
        className='px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700'
      >
        {actionLabel}
      </button>
    </div>
  )
}
