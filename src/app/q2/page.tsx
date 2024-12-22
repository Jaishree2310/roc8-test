'use client'

import { useState, useEffect } from 'react'
import Filters from '@/components/q2/Filters'
import BarChartComponent from '@/components/q2/BarChartComponent'
import LineChartComponent from '@/components/q2/LineChartComponent'
import { DataPoint, FilterState } from '../types/chart'

export default function Home() {
  const [data, setData] = useState<DataPoint[]>([])
  const [filteredData, setFilteredData] = useState<DataPoint[]>([])
  const [lineChartData, setLineChartData] = useState<DataPoint[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()
        setData(jsonData)
        setFilteredData(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleFilterChange = async (filters: FilterState) => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`/api/data?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const jsonData = await response.json()
      setFilteredData(jsonData)
    } catch (error) {
      console.error('Error applying filters:', error)
    }
  }

  const handleBarClick = (entry: any, index: number) => {
    const feature = entry.feature as keyof DataPoint
    const filtered = filteredData.map(item => ({
      ...item,
      timeSpent: parseInt(item[feature] as string, 10)
    }))
    setLineChartData(filtered)
  }

  return (
    <main className="!bg-gray-50 flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-7xl space-y-8">
        <h1 className="text-3xl font-bold text-center !text-gray-900">Feature Usage Dashboard</h1>
        <Filters onFilterChange={handleFilterChange} />
        <div className="space-y-8">
          <div className="!bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 !text-gray-900">Feature Usage Overview</h2>
            <BarChartComponent data={filteredData} onBarClick={handleBarClick} />
          </div>
          <div className="!bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 !text-gray-900">Usage Trends</h2>
            <LineChartComponent data={filteredData} />
          </div>
        </div>
      </div>
    </main>
  )
}