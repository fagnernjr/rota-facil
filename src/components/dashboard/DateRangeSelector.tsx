import React from 'react';
import { format, startOfToday, subDays, startOfMonth, endOfMonth, subMonths, subYears } from 'date-fns';

interface DateRangeSelectorProps {
  onChange: (range: { start: Date; end: Date }) => void;
  selectedRange: { start: Date; end: Date };
}

export function DateRangeSelector({ onChange, selectedRange }: DateRangeSelectorProps) {
  const dateRangeOptions = [
    {
      label: 'Today',
      getValue: () => {
        const today = startOfToday();
        return { start: today, end: today };
      },
    },
    {
      label: 'Last 7 Days',
      getValue: () => ({
        start: subDays(new Date(), 6),
        end: new Date(),
      }),
    },
    {
      label: 'This Month',
      getValue: () => ({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      }),
    },
    {
      label: 'Last 60 Days',
      getValue: () => ({
        start: subDays(new Date(), 59),
        end: new Date(),
      }),
    },
    {
      label: 'Last 90 Days',
      getValue: () => ({
        start: subDays(new Date(), 89),
        end: new Date(),
      }),
    },
    {
      label: 'Last Year',
      getValue: () => ({
        start: subYears(new Date(), 1),
        end: new Date(),
      }),
    },
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (!isNaN(selectedDate.getTime())) {
      onChange({ start: selectedDate, end: selectedDate });
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = dateRangeOptions.find((opt) => opt.label === e.target.value);
    if (option) {
      onChange(option.getValue());
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={format(selectedRange.start, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <select
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={dateRangeOptions.find(
              (opt) => 
                format(opt.getValue().start, 'yyyy-MM-dd') === format(selectedRange.start, 'yyyy-MM-dd') &&
                format(opt.getValue().end, 'yyyy-MM-dd') === format(selectedRange.end, 'yyyy-MM-dd')
            )?.label || ''}
            onChange={handleRangeChange}
          >
            {dateRangeOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}