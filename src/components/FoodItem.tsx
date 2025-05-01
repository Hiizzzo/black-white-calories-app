
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
interface FoodItemProps {
  name: string;
  calories: number;
  weight?: number;
  time?: string;
  onDelete?: () => void;
  imageUrl?: string;
}
const FoodItem = ({
  name,
  calories,
  weight,
  time,
  onDelete,
  imageUrl
}: FoodItemProps) => {
  const nameInitial = name.charAt(0).toUpperCase();
  return <div className="flex justify-between items-center p-3 border-b border-border hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-black bg-white rounded-full overflow-hidden">
          {imageUrl ? 
            <AvatarImage 
              src={imageUrl} 
              alt={name} 
              className="object-contain grayscale contrast-125 brightness-110 p-0.5" 
            /> : 
            <AvatarFallback className="bg-white text-black font-bold">{nameInitial}</AvatarFallback>
          }
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          {time && <span className="text-xs text-muted-foreground">{time}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-sm font-medium">{calories} kcal</span>
          {weight && <div className="text-xs text-muted-foreground">{weight}g</div>}
        </div>
        {onDelete && <button onClick={onDelete} className="text-muted-foreground hover:text-destructive p-1 rounded-full">
            <Trash2 size={16} />
          </button>}
      </div>
    </div>;
};
export default FoodItem;
