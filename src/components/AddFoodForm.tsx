
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateCalories, findFoodByName } from '@/utils/foodDatabase';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AddFoodFormProps {
  onAddFood: (food: { name: string, calories: number, weight: number, imageUrl?: string }) => void;
}

const AddFoodForm = ({ onAddFood }: AddFoodFormProps) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFoodFound, setIsFoodFound] = useState(false);
  const [currentFood, setCurrentFood] = useState<{ name: string; imageUrl?: string } | null>(null);

  useEffect(() => {
    if (name) {
      const foundFood = findFoodByName(name);
      setCurrentFood(foundFood);
      
      if (foundFood && weight) {
        const calories = calculateCalories(name, Number(weight));
        setCalculatedCalories(calories);
        setIsFoodFound(!!calories);
      } else {
        setCalculatedCalories(null);
        setIsFoodFound(false);
      }
    } else {
      setCurrentFood(null);
      setCalculatedCalories(null);
      setIsFoodFound(false);
    }
  }, [name, weight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && Number(weight) > 0 && calculatedCalories !== null) {
      const foundFood = findFoodByName(name);
      
      onAddFood({
        name: foundFood?.name || name.trim(),
        calories: calculatedCalories,
        weight: Number(weight),
        imageUrl: foundFood?.imageUrl
      });
      
      setName('');
      setWeight('');
      setCalculatedCalories(null);
      setIsExpanded(false);
      setCurrentFood(null);
    }
  };

  const nameInitial = currentFood?.name.charAt(0).toUpperCase() || '';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
      {!isExpanded ? (
        <button 
          className="w-full p-4 flex items-center justify-center text-primary hover:bg-accent transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <Plus size={20} className="mr-2" />
          <span>Agregar alimento</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="food-name" className="block text-sm font-medium mb-1">
                Alimento
              </label>
              <div className="flex items-center gap-3">
                {name && (
                  <Avatar className="h-10 w-10 border border-border">
                    {currentFood?.imageUrl ? (
                      <AvatarImage src={currentFood.imageUrl} alt={currentFood.name} />
                    ) : (
                      <AvatarFallback>{nameInitial}</AvatarFallback>
                    )}
                  </Avatar>
                )}
                <Input
                  id="food-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  placeholder="Ej: Manzana"
                  required
                />
              </div>
              {name && !isFoodFound && weight && (
                <p className="text-xs text-destructive mt-1">
                  Alimento no encontrado en la base de datos
                </p>
              )}
            </div>
            <div>
              <label htmlFor="food-weight" className="block text-sm font-medium mb-1">
                Peso (g)
              </label>
              <Input
                id="food-weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full"
                placeholder="Ej: 100"
                min="1"
                required
              />
            </div>
            
            {calculatedCalories !== null && isFoodFound && (
              <div className="bg-accent/50 p-2 rounded-md text-sm">
                Calorías calculadas: <strong>{calculatedCalories} kcal</strong>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!isFoodFound}
                className="flex-1"
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFoodForm;
