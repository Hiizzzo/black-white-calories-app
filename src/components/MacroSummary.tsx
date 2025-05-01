
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-4">Macronutrientes</h3>
      
      <div className="flex h-2 rounded-full overflow-hidden mb-6">
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
      
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Proteínas</span>
          <div className="flex items-baseline">
            <span className="font-semibold text-lg mr-1">{protein}</span>
            <span className="text-xs text-muted-foreground">g</span>
          </div>
          <span className="text-xs text-muted-foreground">{proteinPercentage}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Carbos</span>
          <div className="flex items-baseline">
            <span className="font-semibold text-lg mr-1">{carbs}</span>
            <span className="text-xs text-muted-foreground">g</span>
          </div>
          <span className="text-xs text-muted-foreground">{carbsPercentage}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Grasas</span>
          <div className="flex items-baseline">
            <span className="font-semibold text-lg mr-1">{fat}</span>
            <span className="text-xs text-muted-foreground">g</span>
          </div>
          <span className="text-xs text-muted-foreground">{fatPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default MacroSummary;
