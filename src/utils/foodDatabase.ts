
// Simplified food database with calories per 100g
interface FoodItem {
  name: string;
  caloriesPer100g: number;
  imageUrl?: string;
}

// Database of common foods with their calories per 100g
const foodDatabase: Record<string, FoodItem> = {
  "manzana": { 
    name: "Manzana", 
    caloriesPer100g: 52,
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100&auto=format" 
  },
  "platano": { 
    name: "Plátano", 
    caloriesPer100g: 89,
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=100&auto=format" 
  },
  "naranja": { 
    name: "Naranja", 
    caloriesPer100g: 47,
    imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=100&auto=format" 
  },
  "pollo": { 
    name: "Pollo (pechuga)", 
    caloriesPer100g: 165,
    imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=100&auto=format" 
  },
  "arroz": { 
    name: "Arroz", 
    caloriesPer100g: 130,
    imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=100&auto=format" 
  },
  "huevo": { 
    name: "Huevo", 
    caloriesPer100g: 155,
    imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=100&auto=format" 
  },
  "leche": { 
    name: "Leche", 
    caloriesPer100g: 42,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=100&auto=format" 
  },
  "pan": { 
    name: "Pan", 
    caloriesPer100g: 265,
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=100&auto=format" 
  },
  "pasta": { 
    name: "Pasta", 
    caloriesPer100g: 131,
    imageUrl: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?q=80&w=100&auto=format" 
  },
  "atun": { 
    name: "Atún", 
    caloriesPer100g: 132,
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=100&auto=format" 
  },
  "yogurt": { 
    name: "Yogur", 
    caloriesPer100g: 59,
    imageUrl: "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=100&auto=format" 
  },
  "queso": { 
    name: "Queso", 
    caloriesPer100g: 402,
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=100&auto=format" 
  },
  "frijoles": { 
    name: "Frijoles", 
    caloriesPer100g: 347,
    imageUrl: "https://images.unsplash.com/photo-1564894809611-1742fc40ed80?q=80&w=100&auto=format" 
  },
  "aguacate": { 
    name: "Aguacate", 
    caloriesPer100g: 160,
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=100&auto=format" 
  },
  "zanahoria": { 
    name: "Zanahoria", 
    caloriesPer100g: 41,
    imageUrl: "https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=100&auto=format" 
  },
  "brocoli": { 
    name: "Brócoli", 
    caloriesPer100g: 34,
    imageUrl: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?q=80&w=100&auto=format" 
  },
  "lechuga": { 
    name: "Lechuga", 
    caloriesPer100g: 15,
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=100&auto=format" 
  },
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
