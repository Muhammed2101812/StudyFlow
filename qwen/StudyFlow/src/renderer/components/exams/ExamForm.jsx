import React, { useState, useEffect } from 'react';
import { usePlan } from '../../hooks/usePlan.js';
import { useUser } from '../../hooks/useUser.js';
import { validateDate, validateQuestionCount } from '../../utils/validators.js';
import Input from '../common/Input.jsx';
import Card from '../common/Card.jsx';
import { calculateNet } from '../../utils/calculations.js';
import { getSubjectColor, getSubjectIcon } from '../../utils/formatters.js';

const ExamForm = ({ initialData = null, onSave, onCancel }) => {
  const { currentPlan } = usePlan();
  const { currentUser } = useUser();
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [name, setName] = useState(initialData?.name || '');
  const [publisher, setPublisher] = useState(initialData?.publisher || '');
  const [examNumber, setExamNumber] = useState(initialData?.examNumber || '');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [penaltyEnabled, setPenaltyEnabled] = useState(initialData?.penaltyEnabled ?? true);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [weakTopics, setWeakTopics] = useState(initialData?.weakTopics || '');
  
  // Store subject results
  const [subjectResults, setSubjectResults] = useState(initialData?.results || []);
  const [totalNet, setTotalNet] = useState(initialData?.totalNet || 0);
  
  // Form validation errors
  const [errors, setErrors] = useState({});

  // Initialize subject results based on plan subjects
  useEffect(() => {
    if (currentPlan?.subjects && subjectResults.length === 0) {
      const initialResults = currentPlan.subjects.map(subject => ({
        subject: subject.id,
        subjectName: subject.name,
        totalQuestions: subject.totalQuestions || 0,
        correct: 0,
        wrong: 0,
        blank: subject.totalQuestions || 0, // Initially all blank
        net: 0
      }));
      setSubjectResults(initialResults);
    }
  }, [currentPlan, subjectResults.length]);

  // Calculate totals when subject results change
  useEffect(() => {
    let netSum = 0;
    
    const updatedResults = subjectResults.map(result => {
      const blank = result.totalQuestions - result.correct - result.wrong;
      const net = calculateNet(result.correct, result.wrong, penaltyEnabled);
      
      netSum += net;
      
      return {
        ...result,
        blank,
        net: parseFloat(net.toFixed(2))
      };
    });
    
    setSubjectResults(updatedResults);
    setTotalNet(parseFloat(netSum.toFixed(2)));
  }, [subjectResults, penaltyEnabled]);

  const handleSubjectResultChange = (subjectId, field, value) => {
    const numValue = field !== 'subjectName' ? parseInt(value) || 0 : value;
    
    setSubjectResults(prev => 
      prev.map(result => 
        result.subject === subjectId 
          ? { ...result, [field]: numValue } 
          : result
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate date
    const dateError = validateDate(date);
    if (dateError) {
      newErrors.date = dateError;
    }

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Deneme adı zorunludur';
    }

    // Validate duration
    if (duration && isNaN(duration)) {
      newErrors.duration = 'Geçerli bir süre girin';
    } else if (duration < 0 || duration > 300) {
      newErrors.duration = 'Süre 0-300 dakika aralığında olmalı';
    }

    // Validate each subject result
    subjectResults.forEach(result => {
      const correctError = validateQuestionCount(result.correct, 0, result.totalQuestions);
      if (correctError) {
        newErrors[`correct_${result.subject}`] = correctError;
      }

      const wrongError = validateQuestionCount(result.wrong, 0, result.totalQuestions);
      if (wrongError) {
        newErrors[`wrong_${result.subject}`] = wrongError;
      }

      if (result.correct + result.wrong > result.totalQuestions) {
        newErrors[`total_${result.subject}`] = 'Doğru + Yanlış sayısı toplam soru sayısını geçemez';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formData = {
      id: initialData?.id || Date.now().toString(),
      date,
      name,
      publisher,
      examNumber: examNumber ? parseInt(examNumber) : null,
      duration: duration ? parseInt(duration) : null,
      penaltyEnabled,
      results: subjectResults,
      totalQuestions: subjectResults.reduce((sum, r) => sum + r.totalQuestions, 0),
      totalCorrect: subjectResults.reduce((sum, r) => sum + r.correct, 0),
      totalWrong: subjectResults.reduce((sum, r) => sum + r.wrong, 0),
      totalBlank: subjectResults.reduce((sum, r) => sum + r.blank, 0),
      totalNet,
      overallSuccessRate: subjectResults.reduce((sum, r) => sum + r.totalQuestions, 0) > 0 
        ? (subjectResults.reduce((sum, r) => sum + r.correct, 0) / subjectResults.reduce((sum, r) => sum + r.totalQuestions, 0)) * 100 
        : 0,
      weakTopics: weakTopics.split(',').map(t => t.trim()).filter(t => t),
      notes,
      userId: currentUser.id
    };

    onSave(formData);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {initialData ? 'Deneme Güncelle' : 'Yeni Deneme Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam General Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tarih"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
              required
            />
            
            <Input
              label="Deneme Adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ör: Yeni YKS Deneme - 1"
              error={errors.name}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Yayın Evi"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Yayın adı"
            />
            
            <Input
              label="Deneme Numarası"
              type="number"
              value={examNumber}
              onChange={(e) => setExamNumber(e.target.value)}
              placeholder="1, 2, 3..."
              min="1"
            />
            
            <Input
              label="Süre (dakika)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="120, 130..."
              min="0"
              max="300"
              error={errors.duration}
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={penaltyEnabled}
                onChange={(e) => setPenaltyEnabled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Yanlış Cevaplar Doğruları Etkiliyor</span>
            </label>
          </div>
          
          {/* Subject Results */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Ders Sonuçları</h4>
            
            {subjectResults.map((result, index) => {
              const subject = currentPlan?.subjects?.find(s => s.id === result.subject) || {};
              const subjectColor = getSubjectColor(result.subject);
              const subjectIcon = getSubjectIcon(result.subject);
              const blank = result.totalQuestions - result.correct - result.wrong;
              
              return (
                <Card key={result.subject} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span 
                        className="text-xl mr-2" 
                        style={{ color: subjectColor }}
                      >
                        {subjectIcon}
                      </span>
                      <h5 className="font-medium" style={{ color: subjectColor }}>
                        {subject.name || result.subjectName || result.subject}
                      </h5>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: subjectColor }}>
                        Net: {result.net.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ({result.correct}D - {result.wrong}Y - {blank}B)
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Toplam</label>
                      <input
                        type="number"
                        value={result.totalQuestions}
                        readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Doğru"
                        type="number"
                        value={result.correct}
                        onChange={(e) => handleSubjectResultChange(result.subject, 'correct', e.target.value)}
                        min="0"
                        max={result.totalQuestions}
                        error={errors[`correct_${result.subject}`]}
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Yanlış"
                        type="number"
                        value={result.wrong}
                        onChange={(e) => handleSubjectResultChange(result.subject, 'wrong', e.target.value)}
                        min="0"
                        max={result.totalQuestions - result.correct}
                        error={errors[`wrong_${result.subject}`]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Boş</label>
                      <input
                        type="number"
                        value={blank}
                        readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Net</label>
                      <input
                        type="number"
                        value={result.net.toFixed(2)}
                        readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  {errors[`total_${result.subject}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`total_${result.subject}`]}</p>
                  )}
                </Card>
              );
            })}
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Toplam Net:</span>
                <span className="font-bold text-xl text-blue-600">{totalNet.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zayıf Konular</label>
            <input
              type="text"
              value={weakTopics}
              onChange={(e) => setWeakTopics(e.target.value)}
              placeholder="Virgülle ayırarak zayıf konuları girin"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Virgülle ayırarak zayıf konuları girin</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Denemeyle ilgili notlarınızı buraya yazabilirsiniz..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {initialData ? 'Güncelle' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ExamForm;