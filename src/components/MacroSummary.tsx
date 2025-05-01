
import React from 'react';

interface MacroSummaryProps {
  protein: number;
  carbs: number;
  fat: number;
}

const MacroSummary = ({ protein, carbs, fat }: MacroSummaryProps) => {
  const total = protein + carbs + fat;
  const proteinPercentage = total > 0 ? Math.round((protein / total) * 100) : 0;
  const carbsPercentage = total > 0 ? Math.round((carbs / total) * 100) : 0;
  const fatPercentage = total > 0 ? Math.round((fat / total) * 100) : 0;

  return (
    <div className="calorie-card">
      <h3 className="text-muted-foreground text-sm font-medium">Macronutrientes</h3>
      
      <div className="grid grid-cols-3 gap-2 mt-1">
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Proteínas</span>
          <span className="font-semibold">{protein}g</span>
          <span className="text-xs text-muted-foreground">{proteinPercentage}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Carbos</span>
          <span className="font-semibold">{carbs}g</span>
          <span className="text-xs text-muted-foreground">{carbsPercentage}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Grasas</span>
          <span className="font-semibold">{fat}g</span>
          <span className="text-xs text-muted-foreground">{fatPercentage}%</span>
        </div>
      </div>
      
      <div className="flex h-2 mt-2 rounded-full overflow-hidden">
        <div 
          style={{ width: `${proteinPercentage}%` }}
          className="bg-black"
        />
        <div 
          style={{ width: `${carbsPercentage}%` }}
          className="bg-gray-600"
        />
        <div 
          style={{ width: `${fatPercentage}%` }}
          className="bg-gray-400"
        />
      </div>
    </div>
  );
};

export default MacroSummary;
