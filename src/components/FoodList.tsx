
import React from 'react';
import { Info } from 'lucide-react';
import FoodItem from '@/components/FoodItem';

interface Food {
  id: number;
  name: string;
  calories: number;
  weight: number;
  time: string;
  imageUrl?: string;
}

interface FoodListProps {
  foods: Food[];
  onDeleteFood: (id: number) => void;
}

const FoodList = ({ foods, onDeleteFood }: FoodListProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden dark:bg-gray-800">
      <div className="p-5 pb-2">
        <h3 className="font-medium mb-2">Alimentos de hoy</h3>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {foods.length > 0 ? (
          foods.map((food) => (
            <FoodItem 
              key={food.id}
              name={food.name}
              calories={food.calories}
              weight={food.weight}
              time={food.time}
              onDelete={() => onDeleteFood(food.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
            <Info className="h-6 w-6 mb-2" />
            <p>No hay alimentos registrados hoy</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;
