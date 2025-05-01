
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
    <div className="calorie-card animate-fade-in">
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <div className="calorie-value">
        {value}
        <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
      </div>
      
      {maxValue && (
        <div className="space-y-2">
          <div className="progress-container">
            <div 
              className="progress-bar transition-all duration-500" 
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
