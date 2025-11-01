import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Input from '../common/Input';
import Button from '../common/Button';
import { calculateNet } from '../../utils/calculations';
import { SUBJECT_QUESTIONS } from '../../utils/constants';
import { useUser } from '../../hooks/useUser';
import { usePlan } from '../../hooks/usePlan';
import examService from '../../services/examService';
import { useToast } from '../../contexts/ToastContext';

export default function ExamForm({ examToEdit, onSuccess, onCancel }) {
  const { currentUser } = useUser();
  const { currentPlan } = usePlan();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    name: '',
    publisher: '',
    examNumber: '',
    duration: 135,
    penaltyEnabled: true,
  });

  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [weakTopics, setWeakTopics] = useState('');
  const [notes, setNotes] = useState('');

  // Initialize results from plan subjects
  useEffect(() => {
    if (currentPlan?.subjects && Object.keys(results).length === 0) {
      const initialResults = {};
      currentPlan.subjects.forEach((subject) => {
        const totalQuestions = SUBJECT_QUESTIONS[subject] || 0;
        initialResults[subject] = {
          correct: 0,
          wrong: 0,
          empty: totalQuestions,
          net: 0,
          total: totalQuestions,
        };
      });
      setResults(initialResults);
    }
  }, [currentPlan, results]);

  // Load exam data if editing
  useEffect(() => {
    if (examToEdit) {
      setFormData({
        date: examToEdit.date,
        name: examToEdit.name,
        publisher: examToEdit.publisher || '',
        examNumber: examToEdit.examNumber || '',
        duration: examToEdit.duration || 135,
        penaltyEnabled: examToEdit.penaltyEnabled,
      });
      setResults(examToEdit.results || {});
      setWeakTopics(examToEdit.weakTopics?.join(', ') || '');
      setNotes(examToEdit.notes || '');
    }
  }, [examToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleResultChange = (subject, field, value) => {
    const numValue = parseInt(value) || 0;
    const subjectData = results[subject];

    if (numValue < 0) return;

    let updatedResult = { ...subjectData, [field]: numValue };

    // Calculate empty
    if (field === 'correct' || field === 'wrong') {
      const correct = field === 'correct' ? numValue : updatedResult.correct;
      const wrong = field === 'wrong' ? numValue : updatedResult.wrong;
      const total = updatedResult.total;

      // Validation: correct + wrong <= total
      if (correct + wrong > total) {
        setErrors((prev) => ({
          ...prev,
          [subject]: 'Doğru + Yanlış toplamı toplam soru sayısından fazla olamaz',
        }));
        return;
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[subject];
          return newErrors;
        });
      }

      updatedResult.empty = total - correct - wrong;

      // Calculate net
      updatedResult.net = calculateNet(correct, wrong, formData.penaltyEnabled);
    }

    setResults((prev) => ({
      ...prev,
      [subject]: updatedResult,
    }));
  };

  // Recalculate all nets when penalty toggle changes
  useEffect(() => {
    setResults((prev) => {
      const updated = {};
      Object.keys(prev).forEach((subject) => {
        updated[subject] = {
          ...prev[subject],
          net: calculateNet(prev[subject].correct, prev[subject].wrong, formData.penaltyEnabled),
        };
      });
      return updated;
    });
  }, [formData.penaltyEnabled]);

  const calculateTotalNet = () => {
    return Object.values(results).reduce((sum, result) => sum + result.net, 0);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Tarih gerekli';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Deneme adı gerekli';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Süre 0\'dan büyük olmalı';
    }

    // Check for subject errors
    Object.keys(results).forEach((subject) => {
      const { correct, wrong, total } = results[subject];
      if (correct + wrong > total) {
        newErrors[subject] = 'Doğru + Yanlış toplamı geçersiz';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showToast('Lütfen tüm alanları doğru doldurun', 'error');
      return;
    }

    setLoading(true);

    const examData = {
      ...formData,
      results,
      totalNet: Number(calculateTotalNet().toFixed(2)),
      weakTopics: weakTopics
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      notes: notes.trim(),
    };

    try {
      let response;
      if (examToEdit) {
        response = await examService.update(currentUser.id, examToEdit.id, examData);
      } else {
        response = await examService.save(currentUser.id, examData);
      }

      if (response.success) {
        showToast(
          examToEdit ? 'Deneme güncellendi' : 'Deneme kaydedildi',
          'success'
        );
        onSuccess?.();
      } else {
        showToast(response.error || 'İşlem başarısız', 'error');
      }
    } catch (error) {
      console.error('Error saving exam:', error);
      showToast('Beklenmeyen bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const totalNet = calculateTotalNet();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Genel Bilgiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tarih"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
          />
          <Input
            label="Deneme Adı"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Ösym Tarz Deneme 1"
            error={errors.name}
            required
          />
          <Input
            label="Yayınevi (Opsiyonel)"
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Örn: X Yayınevi"
          />
          <Input
            label="Deneme Numarası (Opsiyonel)"
            type="text"
            name="examNumber"
            value={formData.examNumber}
            onChange={handleChange}
            placeholder="Örn: 5"
          />
          <Input
            label="Süre (dakika)"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            error={errors.duration}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="penaltyEnabled"
              name="penaltyEnabled"
              checked={formData.penaltyEnabled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="penaltyEnabled"
              className="ml-2 block text-sm text-gray-900"
            >
              Yanlış cevap doğruyu siler (4 yanlış = 1 doğru)
            </label>
          </div>
        </div>
      </div>

      {/* Subject Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ders Sonuçları</h3>
        <div className="space-y-4">
          {Object.entries(results).map(([subject, data]) => (
            <div
              key={subject}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{subject}</h4>
                <span className="text-sm text-gray-500">
                  Toplam: {data.total} soru
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doğru
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={data.total}
                    value={data.correct}
                    onChange={(e) =>
                      handleResultChange(subject, 'correct', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yanlış
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={data.total}
                    value={data.wrong}
                    onChange={(e) =>
                      handleResultChange(subject, 'wrong', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boş
                  </label>
                  <input
                    type="number"
                    value={data.empty}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Net
                  </label>
                  <div className="flex items-center h-10 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-lg font-bold text-blue-600">
                      {data.net.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              {errors[subject] && (
                <p className="mt-2 text-sm text-red-600">{errors[subject]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Total Net */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Toplam Net</h3>
          <div className="text-4xl font-bold text-blue-600">
            {totalNet.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Additional Fields */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ek Bilgiler (Opsiyonel)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zayıf Konular (virgülle ayırın)
            </label>
            <input
              type="text"
              value={weakTopics}
              onChange={(e) => setWeakTopics(e.target.value)}
              placeholder="Örn: Geometri, Osmanlı Tarihi, Edatlar"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notlar
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="Deneme hakkında notlarınız..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            İptal
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {examToEdit ? 'Güncelle' : 'Kaydet'}
        </Button>
      </div>
    </form>
  );
}
