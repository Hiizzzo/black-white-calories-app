
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddFoodFormProps {
  onAddFood: (food: { name: string, calories: number, weight: number, imageUrl?: string }) => void;
}

interface FoodData {
  nombreDetectado: string;
  caloriasPor100g: number;
  gramos: number;
  caloriasTotales: string;
}

const AddFoodForm = ({ onAddFood }: AddFoodFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [foundFoodName, setFoundFoodName] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const obtenerCalorias = async (nombreAlimento: string, gramosConsumidos: number): Promise<FoodData | string> => {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(nombreAlimento)}&search_simple=1&action=process&json=1`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Asegurarse de que hay resultados
      if (!data.products || data.products.length === 0) {
        return `No se encontró información para "${nombreAlimento}".`;
      }
  
      // Tomamos el primer resultado que tenga calorías registradas
      const productoConCalorias = data.products.find(p => p.nutriments && p.nutriments['energy-kcal_100g']);
  
      if (!productoConCalorias) {
        return `No se encontraron calorías para "${nombreAlimento}".`;
      }
  
      const kcalPor100g = productoConCalorias.nutriments['energy-kcal_100g'];
      const kcalTotales = (kcalPor100g * gramosConsumidos) / 100;
  
      return {
        nombreDetectado: productoConCalorias.product_name || nombreAlimento,
        caloriasPor100g: kcalPor100g,
        gramos: gramosConsumidos,
        caloriasTotales: kcalTotales.toFixed(2)
      };
    } catch (error) {
      console.error('Error al obtener calorías:', error);
      return 'Ocurrió un error al buscar los datos.';
    }
  };

  const handleSearch = async () => {
    if (!name || !weight) return;
    
    setIsSearching(true);
    setIsLoading(true);
    
    try {
      const result = await obtenerCalorias(name, Number(weight));
      
      if (typeof result === 'string') {
        toast({
          variant: "destructive",
          title: "Error",
          description: result,
        });
        setCalculatedCalories(null);
        setFoundFoodName(null);
      } else {
        setCalculatedCalories(parseFloat(result.caloriasTotales));
        setFoundFoodName(result.nombreDetectado);
        toast({
          title: "Alimento encontrado",
          description: `${result.nombreDetectado}: ${result.caloriasPor100g} kcal/100g`,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al buscar los datos.",
      });
      setCalculatedCalories(null);
      setFoundFoodName(null);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && Number(weight) > 0 && calculatedCalories !== null) {
      onAddFood({
        name: foundFoodName || name.trim(),
        calories: calculatedCalories,
        weight: Number(weight),
      });
      
      setName('');
      setWeight('');
      setCalculatedCalories(null);
      setIsExpanded(false);
      setFoundFoodName(null);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {!isExpanded ? (
        <button 
          className="w-full p-4 flex items-center justify-center text-primary hover:bg-accent transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <Plus size={20} className="mr-2" />
          <span>Agregar alimento</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="food-name" className="block text-sm font-medium mb-1">
                Alimento
              </label>
              <Input
                id="food-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Ej: Manzana"
                required
              />
            </div>
            <div>
              <label htmlFor="food-weight" className="block text-sm font-medium mb-1">
                Peso (g)
              </label>
              <Input
                id="food-weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full"
                placeholder="Ej: 100"
                min="1"
                required
              />
            </div>
            
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleSearch}
              disabled={isLoading || !name || !weight}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  Buscando...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search size={16} className="mr-2" />
                  Buscar calorías
                </div>
              )}
            </Button>
            
            {calculatedCalories !== null && foundFoodName && (
              <div className="bg-accent/50 p-3 rounded-md text-sm">
                <p className="font-medium">{foundFoodName}</p>
                <p>Calorías calculadas: <strong>{calculatedCalories} kcal</strong></p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={calculatedCalories === null}
                className="flex-1"
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFoodForm;
