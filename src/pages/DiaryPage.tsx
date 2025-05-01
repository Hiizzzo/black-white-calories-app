
import React, { useState } from 'react';
import AppNavbar from '@/components/AppNavbar';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import FoodItem from '@/components/FoodItem';
import AddFoodForm from '@/components/AddFoodForm';

interface MealFood {
  id: number;
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: MealFood[];
}

const DiaryPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [meals, setMeals] = useState<Meal[]>([
    {
      name: 'Desayuno',
      foods: [
        { id: 1, name: 'Huevos revueltos', calories: 210 },
        { id: 2, name: 'Pan tostado', calories: 80 },
      ],
    },
    {
      name: 'Almuerzo',
      foods: [
        { id: 3, name: 'Ensalada de pollo', calories: 350 },
        { id: 4, name: 'Manzana', calories: 95 },
      ],
    },
    {
      name: 'Cena',
      foods: [
        { id: 5, name: 'Salmón a la plancha', calories: 280 },
        { id: 6, name: 'Verduras al vapor', calories: 120 },
      ],
    },
    {
      name: 'Snacks',
      foods: [
        { id: 7, name: 'Yogurt griego', calories: 150 },
      ],
    },
  ]);

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
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
  };

  const handleAddFood = (mealIndex: number, food: { name: string; calories: number }) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods.push({
      id: Date.now(),
      name: food.name,
      calories: food.calories,
    });
    setMeals(updatedMeals);
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
            <button 
              onClick={handlePreviousDay}
              className="p-2 rounded-full hover:bg-accent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="py-1 px-3 text-sm rounded-md border border-border hover:bg-accent"
            >
              Hoy
            </button>
            <button 
              onClick={handleNextDay}
              className="p-2 rounded-full hover:bg-accent"
            >
              <ChevronRight size={20} />
            </button>
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
                      onDelete={() => handleDeleteFood(mealIndex, food.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No hay alimentos registrados
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
