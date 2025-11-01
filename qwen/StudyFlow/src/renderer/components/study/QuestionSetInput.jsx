import React, { useState } from 'react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import Card from '../common/Card.jsx';
import NetCalculator from './NetCalculator.jsx';

const QuestionSetInput = ({ 
  subjects = [], 
  onAddQuestionSet, 
  onRemoveQuestionSet,
  initialData = null
}) => {
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [correct, setCorrect] = useState(initialData?.correct || '');
  const [wrong, setWrong] = useState(initialData?.wrong || '');
  const [penaltyEnabled, setPenaltyEnabled] = useState(initialData?.penaltyEnabled ?? true);
  const [questionSetId] = useState(initialData?.id || Date.now().toString());

  const handleAdd = () => {
    if (!subject || correct === '' || wrong === '') {
      return;
    }

    const newQuestionSet = {
      id: questionSetId,
      subject,
      correct: Number(correct),
      wrong: Number(wrong),
      penaltyEnabled,
      net: Number((correct - (penaltyEnabled ? wrong / 4 : 0)).toFixed(2))
    };

    onAddQuestionSet(newQuestionSet);
    
    // Reset form
    setSubject('');
    setCorrect('');
    setWrong('');
    setPenaltyEnabled(true);
  };

  const handleRemove = () => {
    onRemoveQuestionSet(questionSetId);
  };

  return (
    <Card>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ders</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Ders seçin</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Input
              label="Doğru"
              type="number"
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              min="0"
              max="1000"
            />
          </div>
          
          <div>
            <Input
              label="Yanlış"
              type="number"
              value={wrong}
              onChange={(e) => setWrong(e.target.value)}
              min="0"
              max="1000"
            />
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={penaltyEnabled}
                onChange={(e) => setPenaltyEnabled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Yanlış Siler</span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            {subject && correct !== '' && wrong !== '' && (
              <NetCalculator correct={Number(correct)} wrong={Number(wrong)} penaltyEnabled={penaltyEnabled} />
            )}
            
            {initialData ? (
              <Button variant="danger" size="sm" onClick={handleRemove}>Sil</Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleAdd}>Ekle</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionSetInput;