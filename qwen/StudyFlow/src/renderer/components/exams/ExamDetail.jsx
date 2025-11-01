import React from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import { formatDate } from '../../utils/dateHelpers.js';
import { getSubjectColor, getSubjectIcon } from '../../utils/formatters.js';

const ExamDetail = ({ exam, isOpen, onClose, onEdit }) => {
  if (!exam) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Deneme Detayı - ${exam.name}`} size="lg">
      <div className="space-y-6">
        {/* General Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Genel Bilgiler</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tarih:</span>
                <span className="font-medium">{formatDate(exam.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Yayın:</span>
                <span className="font-medium">{exam.publisher || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deneme Numarası:</span>
                <span className="font-medium">{exam.examNumber || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Süre:</span>
                <span className="font-medium">{exam.duration ? `${exam.duration} dakika` : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Yanlış Siler:</span>
                <span className="font-medium">{exam.penaltyEnabled ? 'Evet' : 'Hayır'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Genel Sonuçlar</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Soru:</span>
                <span className="font-medium">{exam.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Doğru:</span>
                <span className="font-medium">{exam.totalCorrect}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Yanlış:</span>
                <span className="font-medium">{exam.totalWrong}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Boş:</span>
                <span className="font-medium">{exam.totalBlank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Toplam Net:</span>
                <span className="font-bold text-xl text-blue-600">{exam.totalNet.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subject Results */}
        <div>
          <h3 className="font-medium text-gray-900">Ders Bazlı Sonuçlar</h3>
          <div className="mt-4 space-y-3">
            {exam.results.map((result, index) => {
              const subjectColor = getSubjectColor(result.subject);
              const subjectIcon = getSubjectIcon(result.subject);
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span 
                        className="text-xl mr-2" 
                        style={{ color: subjectColor }}
                      >
                        {subjectIcon}
                      </span>
                      <h4 
                        className="font-medium" 
                        style={{ color: subjectColor }}
                      >
                        {result.subjectName || result.subject}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: subjectColor }}>
                        {result.net.toFixed(2)} Net
                      </div>
                      <div className="text-sm text-gray-500">
                        %{result.successRate.toFixed(1)} Başarı
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500">Toplam</div>
                      <div className="font-medium">{result.totalQuestions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Doğru</div>
                      <div className="font-medium text-green-600">{result.correct}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Yanlış</div>
                      <div className="font-medium text-red-600">{result.wrong}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Boş</div>
                      <div className="font-medium">{result.blank}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Weak Topics and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exam.weakTopics && exam.weakTopics.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900">Zayıf Konular</h3>
              <div className="mt-2">
                {exam.weakTopics.map((topic, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {exam.notes && (
            <div>
              <h3 className="font-medium text-gray-900">Notlar</h3>
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                {exam.notes}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary" onClick={onClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={() => onEdit(exam)}>
          Düzenle
        </Button>
      </div>
    </Modal>
  );
};

export default ExamDetail;