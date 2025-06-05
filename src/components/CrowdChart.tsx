// 혼잡도 그래프 (꺾은선 쓸 듯)
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

interface Props {
  data: { [time: string]: number }
}

const CrowdChart: React.FC<Props> = ({ data }) => {
  const chartData = Object.entries(data).map(([time, count]) => ({
    time,
    count
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CrowdChart
