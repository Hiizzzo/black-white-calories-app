
import React from 'react';

interface CalorieCardProps {
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
}

const CalorieCard = ({ title, value, maxValue, unit = 'kcal' }: CalorieCardProps) => {
  const percentage = maxValue ? Math.min(Math.round((value / maxValue) * 100), 100) : null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-3">
      <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{title}</h3>
      <div className="text-4xl font-bold text-primary">
        {value}
        <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
      </div>
      
      {maxValue && (
        <div className="space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 {unit}</span>
            <span>{percentage}%</span>
            <span>{maxValue} {unit}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCard;
