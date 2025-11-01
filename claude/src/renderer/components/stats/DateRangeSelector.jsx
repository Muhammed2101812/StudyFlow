import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Button from '../common/Button';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export default function DateRangeSelector({ onRangeChange }) {
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const presets = [
    { id: 'last7', label: 'Son 7 Gün' },
    { id: 'last30', label: 'Son 30 Gün' },
    { id: 'thisWeek', label: 'Bu Hafta' },
    { id: 'thisMonth', label: 'Bu Ay' },
    { id: 'all', label: 'Tüm Zamanlar' },
    { id: 'custom', label: 'Özel Aralık' },
  ];

  const handlePresetChange = (presetId) => {
    setSelectedPreset(presetId);
    setShowCustom(presetId === 'custom');

    if (presetId === 'custom') {
      return;
    }

    const today = new Date();
    let start, end;

    switch (presetId) {
      case 'last7':
        start = subDays(today, 7);
        end = today;
        break;
      case 'last30':
        start = subDays(today, 30);
        end = today;
        break;
      case 'thisWeek':
        start = startOfWeek(today, { weekStartsOn: 1 });
        end = endOfWeek(today, { weekStartsOn: 1 });
        break;
      case 'thisMonth':
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      case 'all':
      default:
        onRangeChange(null);
        return;
    }

    onRangeChange({
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onRangeChange({
        start: customStart,
        end: customEnd,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Tarih Aralığı</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetChange(preset.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedPreset === preset.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {showCustom && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Başlangıç
              </label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bitiş
              </label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button
            onClick={handleCustomApply}
            disabled={!customStart || !customEnd}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Uygula
          </Button>
        </div>
      )}
    </div>
  );
}
