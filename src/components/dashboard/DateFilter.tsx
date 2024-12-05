import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { format, subDays, startOfToday, endOfToday } from 'date-fns';

interface DateFilterProps {
  onDateChange: (dates: { start: Date; end: Date }) => void;
}

export function DateFilter({ onDateChange }: DateFilterProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (filter: string) => {
    const today = startOfToday();
    const todayEnd = endOfToday();
    let start: Date;
    let end: Date = todayEnd;

    switch (filter) {
      case 'today':
        start = today;
        break;
      case '7days':
        start = subDays(today, 6);
        break;
      case '30days':
        start = subDays(today, 29);
        break;
      case '60days':
        start = subDays(today, 59);
        break;
      case '90days':
        start = subDays(today, 89);
        break;
      default:
        start = today;
    }

    setSelectedDate(format(start, 'yyyy-MM-dd'));
    onDateChange({ start, end });
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    const selectedDate = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    onDateChange({ start: selectedDate, end: endOfDay });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Calendar className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-700">
          {format(new Date(selectedDate), 'MMM dd, yyyy')}
        </span>
      </button>

      {isCalendarOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleFilterClick('today')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Today
            </button>
            <button
              onClick={() => handleFilterClick('7days')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handleFilterClick('30days')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => handleFilterClick('60days')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Last 60 Days
            </button>
            <button
              onClick={() => handleFilterClick('90days')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Last 90 Days
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="px-4 py-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select specific date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateSelect}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}