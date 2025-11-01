import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import statsService from '../../services/statsService.js';
import { useUser } from '../../hooks/useUser.js';

const TrendChart = ({ chartType = 'line' }) => {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center h-80">
        <p className="text-gray-500">Kullanıcı bilgisi bulunamadı.</p>
      </div>
    );
  }
  
  const trendData = statsService.getTrendAnalysis(currentUser.id);
  
  if (!trendData || trendData.data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center h-80">
        <p className="text-gray-500">Henüz trend verisi bulunmamaktadır.</p>
      </div>
    );
  }

  // Prepare data for charts - group by date to avoid duplicates
  const groupedData = trendData.data.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = {
        date: item.date,
        net: 0,
        hours: 0,
        questions: 0
      };
    }
    
    if (item.type === 'exam') {
      acc[item.date].net = item.value;
    } else if (item.type === 'study') {
      acc[item.date].hours += item.hours;
      acc[item.date].questions += item.questions;
    }
    
    return acc;
  }, {});
  
  const chartData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));

  let ChartComponent;
  let dataKey;
  
  switch (chartType) {
    case 'bar':
      ChartComponent = BarChart;
      dataKey = 'net';
      break;
    case 'area':
      ChartComponent = AreaChart;
      dataKey = 'questions';
      break;
    case 'line':
    default:
      ChartComponent = LineChart;
      dataKey = 'net';
      break;
  }
  
  const chartTitle = chartType === 'line' ? 'Net Gelişimi' : 
                    chartType === 'bar' ? 'Aylık Net Karşılaştırması' : 
                    'Toplam Soru Sayısı';

  return (
    <div className="bg-white rounded-lg shadow p-4 h-80">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{chartTitle}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <ChartComponent
          data={chartData}
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
            formatter={(value, name) => {
              if (name === 'net') return [value, 'Net'];
              if (name === 'hours') return [value, 'Saat'];
              if (name === 'questions') return [value, 'Soru'];
              return [value, name];
            }}
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
          <Line
            type="monotone"
            dataKey="hours"
            name="Saat"
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="questions"
            name="Soru"
            stroke="#8b5cf6"
            strokeWidth={2}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;