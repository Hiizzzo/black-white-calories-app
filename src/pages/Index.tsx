
import React, { useState } from 'react';
import AppNavbar from '@/components/AppNavbar';
import CalorieCard from '@/components/CalorieCard';
import FoodItem from '@/components/FoodItem';
import AddFoodForm from '@/components/AddFoodForm';
import MacroSummary from '@/components/MacroSummary';
import { Camera, PieChart, ScrollText, Search, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Food {
  id: number;
  name: string;
  calories: number;
  weight: number;
  time: string;
}

const Index = () => {
  const { toast } = useToast();
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Huevos revueltos', calories: 210, weight: 140, time: '08:30 AM' },
    { id: 2, name: 'Manzana', calories: 95, weight: 182, time: '10:15 AM' },
    { id: 3, name: 'Ensalada de pollo', calories: 350, weight: 250, time: '01:30 PM' },
  ]);

  const dailyCalorieGoal = 2000;
  const consumedCalories = foods.reduce((total, food) => total + food.calories, 0);
  const remainingCalories = dailyCalorieGoal - consumedCalories;

  const handleAddFood = (food: { name: string, calories: number, weight: number }) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setFoods([
      ...foods,
      {
        id: Date.now(),
        name: food.name,
        calories: food.calories,
        weight: food.weight,
        time: timeString,
      }
    ]);

    toast({
      title: "Alimento añadido",
      description: `${food.name} (${food.calories} kcal) ha sido añadido`,
    });
  };

  const handleDeleteFood = (id: number) => {
    setFoods(foods.filter(food => food.id !== id));
    
    toast({
      title: "Alimento eliminado",
      description: "El alimento ha sido eliminado de tu lista",
    });
  };

  const handlePhotoCapture = () => {
    toast({
      title: "Función en desarrollo",
      description: "La función de captura de fotos estará disponible próximamente",
    });
  };

  const handleSearch = () => {
    toast({
      title: "Función en desarrollo",
      description: "La búsqueda avanzada estará disponible próximamente",
    });
  };

  const handleFoodList = () => {
    toast({
      title: "Lista de alimentos",
      description: "Próximamente podrás ver la lista completa de alimentos disponibles",
    });
  };

  const handleStats = () => {
    toast({
      title: "Estadísticas",
      description: "Próximamente podrás ver estadísticas detalladas de tu consumo",
    });
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
              <button 
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                onClick={handlePhotoCapture}
              >
                <Camera className="h-6 w-6 mb-2" />
                <span className="text-sm">Tomar foto</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                onClick={handleSearch}
              >
                <Search className="h-6 w-6 mb-2" />
                <span className="text-sm">Buscar</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                onClick={handleFoodList}
              >
                <ScrollText className="h-6 w-6 mb-2" />
                <span className="text-sm">Lista de alimentos</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                onClick={handleStats}
              >
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
            {foods.length > 0 ? (
              foods.map((food) => (
                <FoodItem 
                  key={food.id}
                  name={food.name}
                  calories={food.calories}
                  weight={food.weight}
                  time={food.time}
                  onDelete={() => handleDeleteFood(food.id)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <Info className="h-8 w-8 mb-2" />
                <p>No hay alimentos registrados hoy</p>
              </div>
            )}
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
