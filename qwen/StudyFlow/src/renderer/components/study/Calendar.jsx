import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import Button from '../common/Button.jsx';

const Calendar = ({ onDaySelect, selectedDate, completedDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = 'd';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = new Date(day);
      
      // Check if this day is completed
      const isCompleted = completedDates.includes(format(cloneDay, 'yyyy-MM-dd'));
      // Check if this day is today
      const isToday = isSameDay(cloneDay, new Date());
      // Check if this day is selected
      const isSelected = selectedDate ? isSameDay(cloneDay, new Date(selectedDate)) : false;
      
      days.push(
        <div
          key={cloneDay.toString()}
          className={`p-2 text-center cursor-pointer rounded-lg border ${
            isSameMonth(cloneDay, monthStart) 
              ? 'border-gray-200 hover:bg-gray-100' 
              : 'border-transparent text-gray-400'
          } ${
            isToday ? 'bg-blue-100 border-blue-300 font-bold' : ''
          } ${
            isSelected ? 'bg-blue-500 text-white' : ''
          } ${
            isCompleted && !isToday && !isSelected ? 'bg-green-100 border-green-300' : ''
          }`}
          onClick={() => onDaySelect(format(cloneDay, 'yyyy-MM-dd'))}
        >
          <div className="text-sm">
            {formattedDate}
            {isToday && !isCompleted && !isSelected && <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>}
            {isCompleted && !isToday && !isSelected && <div className="w-1 h-1 bg-green-500 rounded-full mx-auto mt-1"></div>}
            {isCompleted && isToday && <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>}
            {isCompleted && isSelected && <div className="w-1 h-1 bg-green-300 rounded-full mx-auto mt-1"></div>}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {format(currentDate, 'MMMM yyyy', { locale: tr })}
        </h3>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Bugün
          </Button>
          <Button variant="secondary" size="sm" onClick={prevMonth}>
            &lt;
          </Button>
          <Button variant="secondary" size="sm" onClick={nextMonth}>
            &gt;
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
          <div key={day} className="text-xs text-center font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {rows}
      </div>
    </div>
  );
};

export default Calendar;