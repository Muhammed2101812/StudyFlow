import React from 'react';
import Card from '../common/Card.jsx';
import { formatDate } from '../../utils/dateHelpers.js';

const WeeklySummary = () => {
  // Mock data for weekly summary - in real implementation this would come from progress service
  const weeklyData = [
    { date: '2025-11-01', subject: 'Türkçe', completed: true, net: 24.5, questions: 50, duration: 1.5 },
    { date: '2025-11-02', subject: 'Matematik', completed: true, net: 18.25, questions: 40, duration: 2.0 },
    { date: '2025-11-03', subject: 'Tarih', completed: false, net: null, questions: 0, duration: 0 },
    { date: '2025-11-04', subject: 'Coğrafya', completed: true, net: 16.5, questions: 35, duration: 1.0 },
    { date: '2025-11-05', subject: 'Fen', completed: true, net: 22.75, questions: 45, duration: 1.5 },
    { date: '2025-11-06', subject: 'Yabancı Dil', completed: false, net: null, questions: 0, duration: 0 },
    { date: '2025-11-07', subject: 'Vatandaşlık', completed: true, net: 8.5, questions: 15, duration: 0.5 },
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bu Hafta Özeti</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ders</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soru</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Süre</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weeklyData.map((day, index) => (
                <tr key={index} className={day.completed ? 'bg-green-50' : 'bg-white'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(day.date)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.net !== null ? day.net : '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.questions}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.duration} saat</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {day.completed ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ✓ Tamamlandı
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        - Devam ediyor
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default WeeklySummary;