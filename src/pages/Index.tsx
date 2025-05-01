
import React, { useState } from 'react';
import AppNavbar from '@/components/AppNavbar';
import CalorieCard from '@/components/CalorieCard';
import FoodItem from '@/components/FoodItem';
import AddFoodForm from '@/components/AddFoodForm';
import MacroSummary from '@/components/MacroSummary';
import { Camera, PieChart, ScrollText, Search } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  calories: number;
  time: string;
}

const Index = () => {
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Huevos revueltos', calories: 210, time: '08:30 AM' },
    { id: 2, name: 'Manzana', calories: 95, time: '10:15 AM' },
    { id: 3, name: 'Ensalada de pollo', calories: 350, time: '01:30 PM' },
  ]);

  const dailyCalorieGoal = 2000;
  const consumedCalories = foods.reduce((total, food) => total + food.calories, 0);
  const remainingCalories = dailyCalorieGoal - consumedCalories;

  const handleAddFood = (food: { name: string, calories: number }) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setFoods([
      ...foods,
      {
        id: Date.now(),
        name: food.name,
        calories: food.calories,
        time: timeString,
      }
    ]);
  };

  const handleDeleteFood = (id: number) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Control de Calorías</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CalorieCard 
            title="Calorías consumidas" 
            value={consumedCalories} 
            maxValue={dailyCalorieGoal} 
          />
          <CalorieCard 
            title="Calorías restantes" 
            value={remainingCalories} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MacroSummary protein={60} carbs={150} fat={70} />
          
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="font-medium mb-4">Métodos de registro rápido</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <Camera className="h-6 w-6 mb-2" />
                <span className="text-sm">Tomar foto</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <Search className="h-6 w-6 mb-2" />
                <span className="text-sm">Buscar</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <ScrollText className="h-6 w-6 mb-2" />
                <span className="text-sm">Lista de alimentos</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <PieChart className="h-6 w-6 mb-2" />
                <span className="text-sm">Estadísticas</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 pb-2">
            <h3 className="font-medium mb-2">Alimentos de hoy</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {foods.map((food) => (
              <FoodItem 
                key={food.id}
                name={food.name}
                calories={food.calories}
                time={food.time}
                onDelete={() => handleDeleteFood(food.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <AddFoodForm onAddFood={handleAddFood} />
        </div>
      </div>
    </div>
  );
};

export default Index;
