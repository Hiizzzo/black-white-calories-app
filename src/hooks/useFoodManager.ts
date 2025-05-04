
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Food {
  id: number;
  name: string;
  calories: number;
  weight: number;
  time: string;
  imageUrl?: string;
}

interface UseFoodManagerReturn {
  foods: Food[];
  handleAddFood: (food: { name: string; calories: number; weight: number; imageUrl?: string }) => void;
  handleDeleteFood: (id: number) => void;
}

export const useFoodManager = (): UseFoodManagerReturn => {
  const { toast } = useToast();
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Huevos revueltos', calories: 210, weight: 140, time: '08:30 AM' },
    { id: 2, name: 'Manzana', calories: 95, weight: 182, time: '10:15 AM' },
    { id: 3, name: 'Ensalada de pollo', calories: 350, weight: 250, time: '01:30 PM' },
  ]);

  // Load foods from localStorage on component mount
  useEffect(() => {
    const storedFoods = localStorage.getItem('todayFoods');
    if (storedFoods) {
      setFoods(JSON.parse(storedFoods));
    }
  }, []);

  const handleAddFood = (food: { name: string; calories: number; weight: number; imageUrl?: string }) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Get stored foods from localStorage or use current state
    const storedFoods = localStorage.getItem('todayFoods');
    const currentFoods = storedFoods ? JSON.parse(storedFoods) : foods;
    
    const updatedFoods = [
      ...currentFoods,
      {
        id: Date.now(),
        name: food.name,
        calories: food.calories,
        weight: food.weight,
        time: timeString,
        imageUrl: food.imageUrl
      }
    ];
    
    setFoods(updatedFoods);
    // Store in localStorage
    localStorage.setItem('todayFoods', JSON.stringify(updatedFoods));

    toast({
      title: "Alimento añadido",
      description: `${food.name} (${food.calories} kcal) ha sido añadido`,
    });
  };

  const handleDeleteFood = (id: number) => {
    const updatedFoods = foods.filter(food => food.id !== id);
    setFoods(updatedFoods);
    // Update localStorage
    localStorage.setItem('todayFoods', JSON.stringify(updatedFoods));
    
    toast({
      title: "Alimento eliminado",
      description: "El alimento ha sido eliminado de tu lista",
    });
  };

  return {
    foods,
    handleAddFood,
    handleDeleteFood
  };
};
