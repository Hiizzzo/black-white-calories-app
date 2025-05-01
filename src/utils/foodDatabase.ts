
// Simplified food database with calories per 100g
interface FoodItem {
  name: string;
  caloriesPer100g: number;
}

// Database of common foods with their calories per 100g
const foodDatabase: Record<string, FoodItem> = {
  "manzana": { name: "Manzana", caloriesPer100g: 52 },
  "platano": { name: "Plátano", caloriesPer100g: 89 },
  "naranja": { name: "Naranja", caloriesPer100g: 47 },
  "pollo": { name: "Pollo (pechuga)", caloriesPer100g: 165 },
  "arroz": { name: "Arroz", caloriesPer100g: 130 },
  "huevo": { name: "Huevo", caloriesPer100g: 155 },
  "leche": { name: "Leche", caloriesPer100g: 42 },
  "pan": { name: "Pan", caloriesPer100g: 265 },
  "pasta": { name: "Pasta", caloriesPer100g: 131 },
  "atun": { name: "Atún", caloriesPer100g: 132 },
  "yogurt": { name: "Yogur", caloriesPer100g: 59 },
  "queso": { name: "Queso", caloriesPer100g: 402 },
  "frijoles": { name: "Frijoles", caloriesPer100g: 347 },
  "aguacate": { name: "Aguacate", caloriesPer100g: 160 },
  "zanahoria": { name: "Zanahoria", caloriesPer100g: 41 },
  "brocoli": { name: "Brócoli", caloriesPer100g: 34 },
  "lechuga": { name: "Lechuga", caloriesPer100g: 15 },
};

export const findFoodByName = (searchTerm: string): FoodItem | null => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  // Exact match
  if (foodDatabase[normalizedSearch]) {
    return foodDatabase[normalizedSearch];
  }
  
  // Partial match
  for (const key in foodDatabase) {
    if (key.includes(normalizedSearch) || foodDatabase[key].name.toLowerCase().includes(normalizedSearch)) {
      return foodDatabase[key];
    }
  }
  
  return null;
};

export const calculateCalories = (foodName: string, weightInGrams: number): number | null => {
  const food = findFoodByName(foodName);
  
  if (!food) return null;
  
  // Calculate calories based on weight
  return Math.round((food.caloriesPer100g * weightInGrams) / 100);
};

export default foodDatabase;
