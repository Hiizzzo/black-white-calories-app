
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddFoodFormProps {
  onAddFood: (food: { name: string, calories: number }) => void;
}

const AddFoodForm = ({ onAddFood }: AddFoodFormProps) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && Number(calories) > 0) {
      onAddFood({
        name: name.trim(),
        calories: Number(calories),
      });
      setName('');
      setCalories('');
      setIsExpanded(false);
    }
  };

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
              <input
                id="food-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej: Manzana"
                required
              />
            </div>
            <div>
              <label htmlFor="food-calories" className="block text-sm font-medium mb-1">
                Calorías
              </label>
              <input
                id="food-calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-2 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej: 95"
                min="0"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex-1 py-2 px-4 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFoodForm;
