
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppNavbar from '@/components/AppNavbar';
import AddFoodForm from '@/components/AddFoodForm';
import CalorieStats from '@/components/CalorieStats';
import FoodList from '@/components/FoodList';
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { useFoodManager } from '@/hooks/useFoodManager';
import { useCalorieCalculator } from '@/hooks/useCalorieCalculator';

const Index = () => {
  const location = useLocation();
  
  // Initialize swipe navigation
  useSwipeNavigation('/');
  
  // Food management hook
  const { foods, handleAddFood, handleDeleteFood } = useFoodManager();
  
  // Calorie calculation hook
  const { 
    userProfile, 
    dailyCalorieGoal, 
    consumedCalories, 
    remainingCalories, 
    weightChange 
  } = useCalorieCalculator(foods);

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Control de Calorías</h1>
        
        {/* Calorie statistics section */}
        <CalorieStats
          consumedCalories={consumedCalories}
          dailyCalorieGoal={dailyCalorieGoal}
          remainingCalories={remainingCalories}
          weightChange={weightChange}
          userWeight={userProfile.weight}
        />
        
        {/* Food items display section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1">
            {/* MacroSummary is already included in CalorieStats */}
          </div>
          <div className="md:col-span-2">
            <FoodList 
              foods={foods}
              onDeleteFood={handleDeleteFood}
            />
          </div>
        </div>
        
        {/* Food form section */}
        <div className="mt-5">
          <AddFoodForm onAddFood={handleAddFood} />
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
