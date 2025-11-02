import React, { useState, useEffect } from 'react';
import { usePlan } from '../../hooks/usePlan';
import Input from '../common/Input';
import Button from '../common/Button';
import { Plus, X } from 'lucide-react';
import { calculateNet } from '../../utils/calculations';
import { validateQuestionCount } from '../../utils/validators';
import clsx from 'clsx';

const QuestionSetInput = ({ onAdd }) => {
  const { currentPlan } = usePlan();
  const [subject, setSubject] = useState('');
  const [correct, setCorrect] = useState('');
  const [wrong, setWrong] = useState('');
  const [empty, setEmpty] = useState('');
  const [penaltyEnabled, setPenaltyEnabled] = useState(true);
  const [error, setError] = useState('');

  const subjects = currentPlan?.subjects || ['Matematik', 'Türkçe', 'Tarih', 'Coğrafya'];

  useEffect(() => {
    if (subjects.length > 0 && !subject) {
      setSubject(subjects[0]);
    }
  }, [subjects]);

  const handleAdd = () => {
    const correctNum = parseInt(correct) || 0;
    const wrongNum = parseInt(wrong) || 0;
    const emptyNum = parseInt(empty) || 0;

    // Validation
    if (!subject) {
      setError('Ders seçin');
      return;
    }

    if (correctNum === 0 && wrongNum === 0) {
      setError('En az bir soru girmelisiniz');
      return;
    }

    const validationError = validateQuestionCount(correctNum, wrongNum, 1000);
    if (validationError) {
      setError(validationError);
      return;
    }

    const net = calculateNet(correctNum, wrongNum, penaltyEnabled);
    const total = correctNum + wrongNum + emptyNum;

    onAdd({
      subject,
      correct: correctNum,
      wrong: wrongNum,
      empty: emptyNum,
      total,
      penaltyEnabled,
      net,
    });

    // Reset form
    setCorrect('');
    setWrong('');
    setEmpty('');
    setError('');
  };

  const net = calculateNet(
    parseInt(correct) || 0,
    parseInt(wrong) || 0,
    penaltyEnabled
  );

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3">Soru Seti Ekle</h4>

      <div className="space-y-3 mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ders
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Doğru"
            type="number"
            value={correct}
            onChange={(e) => setCorrect(e.target.value)}
            placeholder="0"
            min="0"
          />

          <Input
            label="Yanlış"
            type="number"
            value={wrong}
            onChange={(e) => setWrong(e.target.value)}
            placeholder="0"
            min="0"
          />

          <Input
            label="Boş"
            type="number"
            value={empty}
            onChange={(e) => setEmpty(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={penaltyEnabled}
            onChange={(e) => setPenaltyEnabled(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span>Yanlış cevap doğruyu siler (net = doğru - yanlış/4)</span>
        </label>
      </div>

      {(correct || wrong) && (
        <div className="bg-primary-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Net:</span>
            <span className="text-2xl font-bold text-primary-600">
              {net.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-error mb-3">{error}</p>
      )}

      <Button
        onClick={handleAdd}
        leftIcon={<Plus size={16} />}
        className="w-full"
      >
        Soru Seti Ekle
      </Button>
    </div>
  );
};

export default QuestionSetInput;
