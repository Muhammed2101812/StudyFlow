import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { tr } from 'date-fns/locale';
import clsx from 'clsx';

const Calendar = ({ progress = [], selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const hasProgress = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return progress.some(p => p.date === dateStr);
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const isSelected = (date) => {
    return selectedDate && isSameDay(date, selectedDate);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
    onDateSelect(new Date());
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </h3>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const inCurrentMonth = isSameMonth(day, currentMonth);
          const hasData = hasProgress(day);
          const today = isToday(day);
          const selected = isSelected(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={clsx(
                'aspect-square rounded-lg text-sm transition-all relative',
                !inCurrentMonth && 'text-gray-300',
                inCurrentMonth && !selected && 'hover:bg-gray-100',
                today && !selected && 'ring-2 ring-primary-500',
                selected && 'bg-primary-500 text-white font-semibold',
                !selected && hasData && 'bg-green-50 text-green-900 font-medium'
              )}
            >
              <span>{format(day, 'd')}</span>
              {hasData && !selected && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleToday}
          className="w-full py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
        >
          Bugüne Git
        </button>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-50 border border-green-200 rounded" />
            <span>Tamamlandı</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-primary-500 rounded" />
            <span>Bugün</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
