import React from 'react';
import { getSubjectColor, getSubjectIcon } from '../../utils/formatters.js';
import statsService from '../../services/statsService.js';
import { useUser } from '../../hooks/useUser.js';

const SubjectStats = () => {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">Kullanıcı bilgisi bulunamadı.</p>
      </div>
    );
  }
  
  const subjectStats = statsService.getSubjectStats(currentUser.id);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ders Bazlı İstatistikler</h3>
        
        {subjectStats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Henüz ders bazlı istatistik veriniz yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectStats.map((subject, index) => {
              const subjectColor = getSubjectColor(subject.subject);
              const subjectIcon = getSubjectIcon(subject.subject);
              
              return (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <span 
                      className="text-2xl mr-3" 
                      style={{ color: subjectColor }}
                    >
                      {subjectIcon}
                    </span>
                    <h4 
                      className="font-medium" 
                      style={{ color: subjectColor, textTransform: 'capitalize' }}
                    >
                      {subject.subject}
                    </h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Toplam Soru:</span>
                      <span className="font-medium">{subject.totalQuestions}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Doğru / Net:</span>
                      <span className="font-medium">{subject.totalCorrect} / {subject.totalNet.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ortalama Net:</span>
                      <span className="font-medium">{subject.averageNet.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Başarı Oranı:</span>
                      <span className="font-medium">{subject.successRate.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Çalışma Sayısı:</span>
                      <span className="font-medium">{subject.sessionCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectStats;