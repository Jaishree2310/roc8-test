'use client'

import { LineChartProps } from '@/app/types/chart'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function LineChartComponent({ data }: LineChartProps) {
  const transformedData = data.map((item) => ({
    date: item.Day,
    timeSpent: parseInt(item.A, 10)
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="timeSpent" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}