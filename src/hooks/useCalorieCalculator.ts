
import { useState, useEffect } from 'react';

interface UserProfile {
  weight: number;
  height: number;
  age: number;
  goal: string;
  activityLevel: string;
}

interface WeightChange {
  weightChange: number;
  direction: 'gain' | 'loss' | 'maintain';
}

interface Food {
  id: number;
  name: string;
  calories: number;
  weight: number;
  time: string;
  imageUrl?: string;
}

interface UseCalorieCalculatorReturn {
  userProfile: UserProfile;
  dailyCalorieGoal: number;
  consumedCalories: number;
  remainingCalories: number;
  weightChange: WeightChange;
}

const ACTIVITY_LEVELS = [
  { value: 'sedentary', multiplier: 1.2 },
  { value: 'light', multiplier: 1.375 },
  { value: 'moderate', multiplier: 1.55 },
  { value: 'active', multiplier: 1.725 },
  { value: 'veryActive', multiplier: 1.9 },
];

export const useCalorieCalculator = (foods: Food[]): UseCalorieCalculatorReturn => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    weight: 70, // Default weight in kg
    height: 175, // Default height in cm
    age: 28, // Default age
    goal: 'Mantener peso', // Default goal
    activityLevel: 'sedentary' // Default activity level
  });
  const [weightChange, setWeightChange] = useState<WeightChange>({
    weightChange: 0,
    direction: 'maintain'
  });

  // Calculate daily calorie goal based on user profile
  const calculateDailyCalorieGoal = () => {
    // Harris-Benedict formula for BMR (Basal Metabolic Rate)
    const bmr = 66 + (13.7 * userProfile.weight) + (5 * userProfile.height) - (6.8 * userProfile.age);
    
    // Find activity multiplier
    const activityInfo = ACTIVITY_LEVELS.find(level => level.value === userProfile.activityLevel);
    const activityMultiplier = activityInfo ? activityInfo.multiplier : 1.2; // Default to sedentary
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultiplier;
    
    // Adjust based on goal
    if (userProfile.goal === 'Bajar peso') {
      return Math.round(tdee * 0.85); // 15% deficit for weight loss
    } else if (userProfile.goal === 'Subir peso') {
      return Math.round(tdee * 1.15); // 15% surplus for weight gain
    } else {
      return Math.round(tdee); // Maintenance
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

  return {
    userProfile,
    dailyCalorieGoal,
    consumedCalories,
    remainingCalories,
    weightChange,
  };
};
