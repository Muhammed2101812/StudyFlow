import React, { useState, useEffect } from 'react';
import { usePlan } from '../../hooks/usePlan.js';
import { useUser } from '../../hooks/useUser.js';
import { formatDate } from '../../utils/dateHelpers.js';
import { validateDuration, validateQuestionCount } from '../../utils/validators.js';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import Card from '../common/Card.jsx';
import QuestionSetInput from './QuestionSetInput.jsx';
import NetCalculator from './NetCalculator.jsx';
import { calculateNet } from '../../utils/calculations.js';

const StudyLogForm = ({ initialData = null, onSave, onCancel }) => {
  const { currentPlan, todayProgram } = usePlan();
  const { currentUser } = useUser();
  const [date, setDate] = useState(initialData?.date || formatDate(new Date(), 'yyyy-MM-dd'));
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [topic, setTopic] = useState(initialData?.topic || (todayProgram?.topic || ''));
  const [manualTopic, setManualTopic] = useState(!!initialData?.topic && initialData?.fromPlan !== true);
  const [isCompleted, setIsCompleted] = useState(initialData?.completed || false);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [questionSets, setQuestionSets] = useState(initialData?.questionSets || []);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [totalNet, setTotalNet] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Form validation errors
  const [errors, setErrors] = useState({});

  // Calculate totals when question sets change
  useEffect(() => {
    let correctSum = 0;
    let wrongSum = 0;
    let questionSum = 0;
    
    questionSets.forEach(set => {
      correctSum += set.correct || 0;
      wrongSum += set.wrong || 0;
      questionSum += (set.correct || 0) + (set.wrong || 0);
    });
    
    setTotalCorrect(correctSum);
    setTotalWrong(wrongSum);
    setTotalQuestions(questionSum);
    
    // Calculate total net using penalty of the first question set if available
    const firstPenaltyEnabled = questionSets.length > 0 ? questionSets[0].penaltyEnabled : true;
    setTotalNet(calculateNet(correctSum, wrongSum, firstPenaltyEnabled));
  }, [questionSets]);

  const handleAddQuestionSet = (newSet) => {
    // Update existing set if id matches
    if (questionSets.some(set => set.id === newSet.id)) {
      setQuestionSets(questionSets.map(set => 
        set.id === newSet.id ? newSet : set
      ));
    } else {
      setQuestionSets([...questionSets, newSet]);
    }
  };

  const handleRemoveQuestionSet = (setId) => {
    setQuestionSets(questionSets.filter(set => set.id !== setId));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate date
    if (!date) {
      newErrors.date = 'Tarih zorunludur';
    }

    // Validate duration
    const durationError = validateDuration(duration, 0, 24);
    if (durationError) {
      newErrors.duration = durationError;
    }

    // Validate topic
    if (!topic.trim()) {
      newErrors.topic = 'Konu zorunludur';
    }

    // Validate at least one question set
    if (questionSets.length === 0) {
      newErrors.questionSets = 'En az bir soru seti eklemelisiniz';
    }

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
      duration: parseFloat(duration),
      subject: initialData?.subject || todayProgram?.subject || questionSets[0]?.subject || '',
      topic,
      duration: parseFloat(duration),
      questionSets,
      totalCorrect,
      totalWrong,
      totalNet,
      totalQuestions,
      completed: isCompleted,
      notes,
      fromPlan: !manualTopic, // indicates if this log is from the plan
      userId: currentUser.id
    };

    onSave(formData);
  };

  // Filter subjects from current plan
  const planSubjects = currentPlan?.subjects || [];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {initialData ? 'Çalışma Güncelle' : 'Yeni Çalışma Ekle'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tarih"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
            />
            
            <Input
              label="Süre (saat)"
              type="number"
              step="0.25"
              min="0"
              max="24"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              error={errors.duration}
              helpText="Toplam çalışma süresi"
            />
          </div>
          
          <div>
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={manualTopic}
                onChange={(e) => setManualTopic(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="text-sm text-gray-700">Plan dışısı çalışma</span>
            </label>
            
            <Input
              label={manualTopic ? "Konu Adı" : "Konu (Plandan)"}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={manualTopic ? "Çalıştığınız konuyu girin" : todayProgram?.topic || "Bugünkü planlı konu"}
              error={errors.topic}
              disabled={!manualTopic && todayProgram?.topic}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Soru Setleri</h4>
            
            {questionSets.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm font-medium text-gray-700 border-b pb-2">
                  <div>Ders</div>
                  <div>Doğru/Yanlış</div>
                  <div>Net</div>
                  <div>İşlem</div>
                </div>
                {questionSets.map((set, index) => (
                  <div key={set.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm py-2 border-b">
                    <div>{planSubjects.find(s => s.id === set.subject)?.name || set.subject}</div>
                    <div>{set.correct}/{set.wrong}</div>
                    <NetCalculator correct={set.correct} wrong={set.wrong} penaltyEnabled={set.penaltyEnabled} />
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleRemoveQuestionSet(set.id)}
                    >
                      Sil
                    </Button>
                  </div>
                ))}
                
                <div className="mt-3 pt-3 border-t border-gray-200 font-medium">
                  <div className="flex justify-between">
                    <span>Toplam: </span>
                    <span>{totalCorrect} Doğru / {totalWrong} Yanlış, {totalQuestions} Soru</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genel Net: </span>
                    <NetCalculator correct={totalCorrect} wrong={totalWrong} penaltyEnabled={questionSets.length > 0 ? questionSets[0].penaltyEnabled : true} />
                  </div>
                </div>
              </div>
            )}
            
            <QuestionSetInput 
              subjects={planSubjects}
              onAddQuestionSet={handleAddQuestionSet}
              onRemoveQuestionSet={handleRemoveQuestionSet}
            />
            
            {errors.questionSets && (
              <p className="mt-1 text-sm text-red-600">{errors.questionSets}</p>
            )}
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Konuyu tamamladım</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Çalışmayla ilgili notlarınızı buraya yazabilirsiniz..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary">
              {initialData ? 'Güncelle' : 'Kaydet'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              İptal
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default StudyLogForm;