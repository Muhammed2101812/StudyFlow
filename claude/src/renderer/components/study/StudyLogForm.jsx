import React, { useState, useEffect } from 'react';
import { useProgress } from '../../hooks/useProgress';
import { useToast } from '../../contexts/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';
import QuestionSetInput from './QuestionSetInput';
import { X, Save } from 'lucide-react';
import { format } from 'date-fns';
import { validateDuration } from '../../utils/validators';
import { SUBJECT_COLORS } from '../../utils/constants';

const StudyLogForm = ({ selectedDate, existingLog, onSaved }) => {
  const { saveStudyLog } = useProgress();
  const { toast } = useToast();

  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [questionSets, setQuestionSets] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingLog) {
      setTopic(existingLog.topic || '');
      setDuration(existingLog.duration?.toString() || '');
      setQuestionSets(existingLog.questionSets || []);
      setCompleted(existingLog.completed || false);
      setNotes(existingLog.notes || '');
    } else {
      // Reset form
      setTopic('');
      setDuration('');
      setQuestionSets([]);
      setCompleted(false);
      setNotes('');
    }
    setError('');
  }, [existingLog, selectedDate]);

  const handleAddQuestionSet = (set) => {
    setQuestionSets([...questionSets, set]);
  };

  const handleRemoveQuestionSet = (index) => {
    setQuestionSets(questionSets.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    // Validation
    if (!duration || parseFloat(duration) <= 0) {
      setError('Çalışma süresi girmelisiniz');
      toast.error('Çalışma süresi girmelisiniz');
      return;
    }

    const durationError = validateDuration(parseFloat(duration));
    if (durationError) {
      setError(durationError);
      toast.error(durationError);
      return;
    }

    if (questionSets.length === 0) {
      setError('En az bir soru seti eklemelisiniz');
      toast.error('En az bir soru seti eklemelisiniz');
      return;
    }

    setSaving(true);

    const logData = {
      date: selectedDate,
      topic,
      duration: parseFloat(duration),
      questionSets,
      completed,
      notes,
    };

    const result = await saveStudyLog(logData);

    setSaving(false);

    if (result.success) {
      toast.success(existingLog ? 'Çalışma güncellendi!' : 'Çalışma kaydedildi!');
      setError('');
      if (onSaved) onSaved();
    } else {
      toast.error(result.error || 'Çalışma kaydedilemedi');
      setError(result.error);
    }
  };

  const totalNet = questionSets.reduce((sum, set) => sum + (set.net || 0), 0);
  const totalQuestions = questionSets.reduce(
    (sum, set) => sum + (set.correct || 0) + (set.wrong || 0),
    0
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {format(selectedDate, 'dd MMMM yyyy, EEEE')}
        </h3>
        <p className="text-sm text-gray-600">
          {existingLog ? 'Çalışma kaydını düzenle' : 'Yeni çalışma kaydı ekle'}
        </p>
      </div>

      <Input
        label="Konu"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Örn: Matematik - Limit ve Süreklilik"
      />

      <Input
        label="Çalışma Süresi (saat)"
        type="number"
        step="0.5"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="2.5"
        min="0"
        max="24"
        required
      />

      {/* Question Sets */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Soru Setleri</h4>

        {questionSets.length > 0 && (
          <div className="space-y-2 mb-3">
            {questionSets.map((set, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: SUBJECT_COLORS[set.subject] || '#6B7280' }}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{set.subject}</div>
                    <div className="text-sm text-gray-600">
                      D: {set.correct} • Y: {set.wrong} • Net: {set.net.toFixed(2)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveQuestionSet(index)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            ))}

            <div className="bg-primary-50 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-600">Toplam Soru</div>
                  <div className="text-xl font-bold text-gray-900">{totalQuestions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Toplam Net</div>
                  <div className="text-xl font-bold text-primary-600">
                    {totalNet.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <QuestionSetInput onAdd={handleAddQuestionSet} />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span>Konuyu tamamladım</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notlar (Opsiyonel)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Çalışma hakkında notlarınız..."
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <Button
        onClick={handleSave}
        loading={saving}
        leftIcon={<Save size={16} />}
        className="w-full"
      >
        {existingLog ? 'Güncelle' : 'Kaydet'}
      </Button>
    </div>
  );
};

export default StudyLogForm;
