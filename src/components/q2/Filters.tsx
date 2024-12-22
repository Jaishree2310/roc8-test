'use client'

import { FilterProps, FilterState } from '@/app/types/chart'
import { useState } from 'react'

export default function Filters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    ageGroup: '',
    gender: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="!bg-white p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 md:flex md:space-x-6 items-center">
      <div className="flex items-center space-x-2">
        <label className="font-medium !text-gray-700">Age Group:</label>
        <select
          className="!bg-white !text-gray-900 border !border-gray-300 rounded-md px-3 py-2 focus:!ring-blue-500 focus:!border-blue-500"
          value={filters.ageGroup}
          onChange={(e) => handleChange('ageGroup', e.target.value)}
        >
          <option value="">All</option>
          <option value="15-25">15-25</option>
          <option value=">25">25+</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-medium !text-gray-700">Gender:</label>
        <select
          className="!bg-white !text-gray-900 border !border-gray-300 rounded-md px-3 py-2 focus:!ring-blue-500 focus:!border-blue-500"
          value={filters.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-medium !text-gray-700">Start Date:</label>
        <input
          type="date"
          className="!bg-white !text-gray-900 border !border-gray-300 rounded-md px-3 py-2 focus:!ring-blue-500 focus:!border-blue-500"
          value={filters.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-medium !text-gray-700">End Date:</label>
        <input
          type="date"
          className="!bg-white !text-gray-900 border !border-gray-300 rounded-md px-3 py-2 focus:!ring-blue-500 focus:!border-blue-500"
          value={filters.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
        />
      </div>
    </div>
  )
}