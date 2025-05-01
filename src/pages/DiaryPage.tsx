
import React, { useState } from 'react';
import AppNavbar from '@/components/AppNavbar';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import FoodItem from '@/components/FoodItem';
import AddFoodForm from '@/components/AddFoodForm';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface MealFood {
  id: number;
  name: string;
  calories: number;
  weight: number;
}

interface Meal {
  name: string;
  foods: MealFood[];
}

const DiaryPage = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [meals, setMeals] = useState<Meal[]>([
    {
      name: 'Desayuno',
      foods: [
        { id: 1, name: 'Huevos revueltos', calories: 210, weight: 140 },
        { id: 2, name: 'Pan tostado', calories: 80, weight: 30 },
      ],
    },
    {
      name: 'Almuerzo',
      foods: [
        { id: 3, name: 'Ensalada de pollo', calories: 350, weight: 250 },
        { id: 4, name: 'Manzana', calories: 95, weight: 182 },
      ],
    },
    {
      name: 'Cena',
      foods: [
        { id: 5, name: 'Salmón a la plancha', calories: 280, weight: 170 },
        { id: 6, name: 'Verduras al vapor', calories: 120, weight: 250 },
      ],
    },
    {
      name: 'Snacks',
      foods: [
        { id: 7, name: 'Yogurt griego', calories: 150, weight: 200 },
      ],
    },
  ]);

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
    
    toast({
      title: "Día cambiado",
      description: `Viendo el diario para ${formatDate(prevDay)}`,
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
    
    toast({
      title: "Día cambiado",
      description: `Viendo el diario para ${formatDate(nextDay)}`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDeleteFood = (mealIndex: number, foodId: number) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods = updatedMeals[mealIndex].foods.filter(
      (food) => food.id !== foodId
    );
    setMeals(updatedMeals);
    
    toast({
      title: "Alimento eliminado",
      description: "El alimento ha sido eliminado de tu diario",
    });
  };

  const handleAddFood = (mealIndex: number, food: { name: string; calories: number; weight: number }) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods.push({
      id: Date.now(),
      name: food.name,
      calories: food.calories,
      weight: food.weight,
    });
    setMeals(updatedMeals);
    
    toast({
      title: "Alimento añadido",
      description: `${food.name} (${food.calories} kcal) ha sido añadido a ${meals[mealIndex].name}`,
    });
  };

  const totalCalories = meals.reduce(
    (total, meal) => 
      total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0), 
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Diario de Alimentos</h1>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Calendar className="mr-2" size={18} />
            <span className="font-medium capitalize">{formatDate(currentDate)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePreviousDay}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentDate(new Date());
                toast({ 
                  title: "Fecha actualizada", 
                  description: "Mostrando el diario de hoy" 
                });
              }}
            >
              Hoy
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNextDay}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        
        <div className="text-right mb-3">
          <span className="text-sm text-muted-foreground">Total de calorías:</span>
          <span className="ml-2 font-bold text-lg">{totalCalories} kcal</span>
        </div>
        
        {meals.map((meal, mealIndex) => {
          const mealCalories = meal.foods.reduce(
            (total, food) => total + food.calories, 
            0
          );
          
          return (
            <div key={meal.name} className="mb-6 bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-medium">{meal.name}</h3>
                <span className="text-sm font-medium">{mealCalories} kcal</span>
              </div>
              
              {meal.foods.length > 0 ? (
                <div>
                  {meal.foods.map((food) => (
                    <FoodItem
                      key={food.id}
                      name={food.name}
                      calories={food.calories}
                      weight={food.weight}
                      onDelete={() => handleDeleteFood(mealIndex, food.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                  <Info className="h-6 w-6 mb-2" />
                  <p>No hay alimentos registrados</p>
                </div>
              )}
              
              <div className="p-3">
                <AddFoodForm onAddFood={(food) => handleAddFood(mealIndex, food)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiaryPage;
