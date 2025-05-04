
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface WeightChangeProps {
  weightChange: {
    weightChange: number;
    direction: 'gain' | 'loss' | 'maintain';
  };
  userWeight: number;
  dailyCalorieGoal: number;
}

const WeightChangeCard = ({ weightChange, userWeight, dailyCalorieGoal }: WeightChangeProps) => {
  // Get weight change icon
  const getWeightChangeIcon = () => {
    if (weightChange.direction === 'gain') return <TrendingUp className="h-5 w-5 text-amber-500" />;
    if (weightChange.direction === 'loss') return <TrendingDown className="h-5 w-5 text-emerald-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  return (
    <motion.div 
      className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col gap-2 dark:bg-gray-800"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Cambio de peso estimado</h3>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-primary">
          {userWeight}
          <span className="text-sm font-normal text-muted-foreground ml-1">kg</span>
        </div>
        {getWeightChangeIcon()}
      </div>
      
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Estimación semanal</span>
          <div className="flex items-center gap-1">
            <span className={`text-sm font-medium ${
              weightChange.direction === 'gain' ? 'text-amber-500' : 
              weightChange.direction === 'loss' ? 'text-emerald-500' : 
              'text-gray-500'
            }`}>
              {weightChange.direction === 'maintain' ? 'Sin cambio' :
               `${weightChange.direction === 'loss' ? '-' : '+'} ${weightChange.weightChange.toFixed(2)} kg`}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Basado en tu consumo calórico actual y tu objetivo diario de {dailyCalorieGoal} kcal
        </p>
      </div>
    </motion.div>
  );
};

export default WeightChangeCard;
