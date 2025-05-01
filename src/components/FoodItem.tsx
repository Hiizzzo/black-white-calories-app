
import React from 'react';
import { Trash2 } from 'lucide-react';

interface FoodItemProps {
  name: string;
  calories: number;
  time?: string;
  onDelete?: () => void;
}

const FoodItem = ({ name, calories, time, onDelete }: FoodItemProps) => {
  return (
    <div className="flex justify-between items-center p-3 border-b border-border hover:bg-accent/50 transition-colors">
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        {time && <span className="text-xs text-muted-foreground">{time}</span>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{calories} kcal</span>
        {onDelete && (
          <button 
            onClick={onDelete} 
            className="text-muted-foreground hover:text-destructive p-1 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
