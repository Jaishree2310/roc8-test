'use client'

import { BarChartProps, ChartDataPoint, DataPoint } from '@/app/types/chart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function BarChartComponent({ data, onBarClick }: BarChartProps) {
  const aggregatedData: ChartDataPoint[] = ['A', 'B', 'C', 'D', 'E', 'F'].map((feature) => ({
    feature,
    timeSpent: data.reduce((acc, item) => acc + parseInt(item[feature as keyof DataPoint] as string || '0', 10), 0)
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="feature" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="timeSpent" fill="#8884d8" onClick={onBarClick} />
      </BarChart>
    </ResponsiveContainer>
  )
}