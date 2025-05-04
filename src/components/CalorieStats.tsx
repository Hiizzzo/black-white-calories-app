
import React from 'react';
import CalorieCard from '@/components/CalorieCard';
import WeightChangeCard from '@/components/WeightChangeCard';
import MacroSummary from '@/components/MacroSummary';

interface CalorieStatsProps {
  consumedCalories: number;
  dailyCalorieGoal: number;
  remainingCalories: number;
  weightChange: {
    weightChange: number;
    direction: 'gain' | 'loss' | 'maintain';
  };
  userWeight: number;
}

const CalorieStats = ({ 
  consumedCalories, 
  dailyCalorieGoal, 
  remainingCalories, 
  weightChange, 
  userWeight 
}: CalorieStatsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <CalorieCard 
          title="Calorías consumidas" 
          value={consumedCalories} 
          maxValue={dailyCalorieGoal} 
        />
        <CalorieCard 
          title="Calorías restantes" 
          value={remainingCalories} 
        />
        <WeightChangeCard 
          weightChange={weightChange} 
          userWeight={userWeight} 
          dailyCalorieGoal={dailyCalorieGoal}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MacroSummary protein={60} carbs={150} fat={70} />
        <div className="md:col-span-2">
          {/* Food list goes here - placeholder for composition */}
        </div>
      </div>
    </>
  );
};

export default CalorieStats;
