import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExamChart = ({ data }) => {
  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center h-80">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Grafik Verisi Yok</h3>
        <p className="text-gray-500">Henüz deneme verisi bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 h-80">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Net Gelişimi</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Format date to be more readable (just day/month)
              try {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              } catch {
                return value;
              }
            }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value) => [value, 'Net']}
            labelFormatter={(value) => `Tarih: ${value}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="net"
            name="Net"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExamChart;