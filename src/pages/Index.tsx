
import React, { useState, useEffect } from 'react';
import AppNavbar from '@/components/AppNavbar';
import CalorieCard from '@/components/CalorieCard';
import FoodItem from '@/components/FoodItem';
import AddFoodForm from '@/components/AddFoodForm';
import MacroSummary from '@/components/MacroSummary';
import { Camera, PieChart, ScrollText, Search, Info, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Food {
  id: number;
  name: string;
  calories: number;
  weight: number;
  time: string;
  imageUrl?: string;
}

interface WeightChange {
  weightChange: number;
  direction: 'gain' | 'loss' | 'maintain';
}

const Index = () => {
  const { toast } = useToast();
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Huevos revueltos', calories: 210, weight: 140, time: '08:30 AM' },
    { id: 2, name: 'Manzana', calories: 95, weight: 182, time: '10:15 AM' },
    { id: 3, name: 'Ensalada de pollo', calories: 350, weight: 250, time: '01:30 PM' },
  ]);
  const [userProfile, setUserProfile] = useState({
    weight: 70, // Default weight in kg
    height: 175, // Default height in cm
    age: 28, // Default age
    goal: 'Mantener peso' // Default goal
  });
  const [weightChange, setWeightChange] = useState<WeightChange>({
    weightChange: 0,
    direction: 'maintain'
  });

  // Calculate daily calorie goal based on user profile
  const calculateDailyCalorieGoal = () => {
    // Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    const bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    
    // Adjust based on goal
    if (userProfile.goal === 'Bajar peso') {
      return Math.round(bmr * 0.85); // 15% deficit for weight loss
    } else if (userProfile.goal === 'Subir peso') {
      return Math.round(bmr * 1.15); // 15% surplus for weight gain
    } else {
      return Math.round(bmr); // Maintenance
    }
  };

  const dailyCalorieGoal = calculateDailyCalorieGoal();
  const consumedCalories = foods.reduce((total, food) => total + food.calories, 0);
  const remainingCalories = dailyCalorieGoal - consumedCalories;

  // Calculate estimated weekly weight change based on calorie deficit/surplus
  useEffect(() => {
    // Fetch user profile from localStorage
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }

    // Calculate weekly weight change
    // 7700 kcal ≈ 1 kg of body weight
    const dailyCalorieDiff = consumedCalories - dailyCalorieGoal;
    const weeklyCalorieDiff = dailyCalorieDiff * 7;
    const estimatedWeeklyWeightChange = weeklyCalorieDiff / 7700;
    
    setWeightChange({
      weightChange: Math.abs(estimatedWeeklyWeightChange),
      direction: estimatedWeeklyWeightChange > 0 ? 'gain' : 
                estimatedWeeklyWeightChange < 0 ? 'loss' : 'maintain'
    });
  }, [consumedCalories, dailyCalorieGoal]);

  const handleAddFood = (food: { name: string, calories: number, weight: number, imageUrl?: string }) => {
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

  // Get weight change icon
  const getWeightChangeIcon = () => {
    if (weightChange.direction === 'gain') return <TrendingUp className="h-5 w-5 text-amber-500" />;
    if (weightChange.direction === 'loss') return <TrendingDown className="h-5 w-5 text-emerald-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Control de Calorías</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <CalorieCard 
            title="Calorías consumidas" 
            value={consumedCalories} 
            maxValue={dailyCalorieGoal} 
          />
          <CalorieCard 
            title="Calorías restantes" 
            value={remainingCalories} 
          />
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border flex flex-col gap-2 dark:bg-gray-800">
            <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Cambio de peso estimado</h3>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">
                {userProfile.weight}
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MacroSummary protein={60} carbs={150} fat={70} />
          
          <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-border dark:bg-gray-800">
            <h3 className="font-medium mb-4">Métodos de registro rápido</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={handlePhotoCapture}
              >
                <Camera className="h-5 w-5 mb-2" />
                <span className="text-xs">Tomar foto</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mb-2" />
                <span className="text-xs">Buscar</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={handleFoodList}
              >
                <ScrollText className="h-5 w-5 mb-2" />
                <span className="text-xs">Lista de alimentos</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={handleStats}
              >
                <PieChart className="h-5 w-5 mb-2" />
                <span className="text-xs">Estadísticas</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden dark:bg-gray-800">
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
                  onDelete={() => handleDeleteFood(food.id)}
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
        
        <div className="mt-5">
          <AddFoodForm onAddFood={handleAddFood} />
        </div>
      </div>
    </div>
  );
};

export default Index;
