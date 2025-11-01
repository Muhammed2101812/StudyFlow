import React from 'react';
import Card from '../common/Card.jsx';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelpers.js';
import { getSubjectColor, getSubjectIcon } from '../../utils/formatters.js';

const RecentActivity = () => {
  const navigate = useNavigate();

  // Mock data for recent activity - in real implementation this would come from progress service
  const recentActivities = [
    { id: 1, date: '2025-11-07', subject: 'turkce', topic: 'Paragraf', net: 24.5, questions: 50, duration: 1.5 },
    { id: 2, date: '2025-11-06', subject: 'matematik', topic: 'Denklemler', net: 18.25, questions: 40, duration: 2.0 },
    { id: 3, date: '2025-11-05', subject: 'tarih', topic: 'İslam Tarihi', net: 16.5, questions: 35, duration: 1.0 },
    { id: 4, date: '2025-11-04', subject: 'cografya', topic: 'İklim', net: 22.75, questions: 45, duration: 1.5 },
    { id: 5, date: '2025-11-03', subject: 'vatandaslik', topic: 'Temel Hukuk', net: 8.5, questions: 15, duration: 0.5 },
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Son Çalışmalar</h3>
          <button 
            onClick={() => navigate('/study')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Tümünü Gör →
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const subjectColor = getSubjectColor(activity.subject);
            const subjectIcon = getSubjectIcon(activity.subject);
            
            return (
              <div key={activity.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div 
                    className="text-xl mr-3" 
                    style={{ color: subjectColor }}
                  >
                    {subjectIcon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.topic}</div>
                    <div className="text-sm text-gray-500">{formatDate(activity.date)}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium" style={{ color: subjectColor }}>Net: {activity.net}</div>
                  <div className="text-sm text-gray-500">{activity.duration}h, {activity.questions}s</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default RecentActivity;