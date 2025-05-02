
import React, { useState, useEffect } from 'react';
import AppNavbar from '@/components/AppNavbar';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Settings, 
  Activity, 
  Clock, 
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserProfile {
  nickname: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  dailyCalories: string;
  protein: string;
  carbs: string;
  fat: string;
  reminder: string;
}

interface Preferences {
  darkMode: boolean;
  notifications: boolean;
  metricUnits: boolean;
  reminders: boolean;
}

const ProfilePage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    darkMode: false,
    notifications: true,
    metricUnits: true,
    reminders: true
  });
  const [reminderText, setReminderText] = useState('');
  const isMobile = useIsMobile();
  
  const form = useForm<UserProfile>({
    defaultValues: {
      nickname: 'Usuario',
      email: 'usuario@ejemplo.com',
      age: '28',
      height: '175',
      weight: '70',
      goal: 'Mantener peso',
      dailyCalories: '2000',
      protein: '120',
      carbs: '240',
      fat: '65',
      reminder: ''
    }
  });
  
  const { watch } = form;
  const watchedValues = watch();
  
  // Calculate goal progress
  const calorieProgress = 100; // Mock progress - would come from actual tracking data
  const proteinProgress = 100;
  const carbsProgress = 100;
  const fatProgress = 100;

  const toggleDarkMode = (checked: boolean) => {
    setPreferences({...preferences, darkMode: checked});
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Apply dark mode on initial load
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);
  
  const saveProfile = (data: UserProfile) => {
    console.log('Profile data saved:', data);
    setIsEditingProfile(false);
  };
  
  const saveGoals = (data: UserProfile) => {
    console.log('Goals saved:', data);
    setIsEditingGoals(false);
  };
  
  const saveReminder = () => {
    console.log('Reminder saved:', reminderText);
    form.setValue('reminder', reminderText);
    setReminderText('');
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0 md:pt-16">
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-1">
            {!isEditingProfile ? (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <User size={isMobile ? 32 : 40} className="text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">{watchedValues.nickname}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{watchedValues.email}</p>
                  <button 
                    className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => setIsEditingProfile(true)}
                  >
                    Editar perfil
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Edad</span>
                    <span className="font-medium">{watchedValues.age} años</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Altura</span>
                    <span className="font-medium">{watchedValues.height} {preferences.metricUnits ? 'cm' : 'in'}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Peso</span>
                    <span className="font-medium">{watchedValues.weight} {preferences.metricUnits ? 'kg' : 'lb'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Objetivo</span>
                    <span className="font-medium">{watchedValues.goal}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(saveProfile)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apodo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Edad</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Altura ({preferences.metricUnits ? 'cm' : 'in'})</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso ({preferences.metricUnits ? 'kg' : 'lb'})</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objetivo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1"
                      >
                        Guardar
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            {!isEditingGoals ? (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="flex items-start mb-4">
                  <Activity className="mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Objetivos diarios</h3>
                    <p className="text-sm text-muted-foreground">Configura tus metas nutricionales</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Calorías</span>
                      <span className="text-sm font-medium">{watchedValues.dailyCalories} kcal</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: `${calorieProgress}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Proteínas</span>
                      <span className="text-sm font-medium">{watchedValues.protein} g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: `${proteinProgress}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Carbohidratos</span>
                      <span className="text-sm font-medium">{watchedValues.carbs} g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: `${carbsProgress}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Grasas</span>
                      <span className="text-sm font-medium">{watchedValues.fat} g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: `${fatProgress}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full mt-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsEditingGoals(true)}
                >
                  Ajustar objetivos
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <h3 className="text-xl font-bold mb-4">Ajustar Objetivos</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(saveGoals)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="dailyCalories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calorías diarias (kcal)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="protein"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proteínas (g)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="carbs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carbohidratos (g)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grasas (g)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsEditingGoals(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1"
                      >
                        Guardar
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
              <div className="flex items-start mb-4">
                <Settings className="mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Preferencias</h3>
                  <p className="text-sm text-muted-foreground">Configura las opciones de la aplicación</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Notificaciones</span>
                  <Switch 
                    checked={preferences.notifications} 
                    onCheckedChange={(checked) => setPreferences({...preferences, notifications: checked})}
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center">
                    <span className="mr-2">Tema oscuro</span>
                    {preferences.darkMode ? 
                      <Moon size={16} className="text-muted-foreground" /> : 
                      <Sun size={16} className="text-muted-foreground" />
                    }
                  </div>
                  <Switch 
                    checked={preferences.darkMode} 
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Unidades métricas</span>
                  <Switch 
                    checked={preferences.metricUnits} 
                    onCheckedChange={(checked) => setPreferences({...preferences, metricUnits: checked})}
                  />
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span>Recordatorios</span>
                  <Switch 
                    checked={preferences.reminders} 
                    onCheckedChange={(checked) => setPreferences({...preferences, reminders: checked})}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
              <div className="flex items-start mb-4">
                <Bell className="mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Recordatorio personalizado</h3>
                  <p className="text-sm text-muted-foreground">Crea un recordatorio diario</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {watchedValues.reminder && (
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="font-medium text-sm">Recordatorio actual:</p>
                    <p className="text-sm mt-1">{watchedValues.reminder}</p>
                  </div>
                )}
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="reminder" className="text-sm font-medium">
                    Establecer nuevo recordatorio
                  </label>
                  <Input 
                    id="reminder"
                    value={reminderText}
                    onChange={(e) => setReminderText(e.target.value)}
                    placeholder="Ej: Beber 8 vasos de agua al día"
                  />
                  <Button 
                    onClick={saveReminder}
                    disabled={!reminderText}
                    className="w-full mt-2"
                  >
                    Guardar recordatorio
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
              <div className="flex items-start mb-4">
                <Clock className="mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Historial de actividad</h3>
                  <p className="text-sm text-muted-foreground">Tus últimas acciones en la aplicación</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div>
                    <p className="font-medium">Alimento añadido</p>
                    <p className="text-xs text-muted-foreground">Añadiste "Ensalada de pollo"</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Hoy, 13:45</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div>
                    <p className="font-medium">Objetivo actualizado</p>
                    <p className="text-xs text-muted-foreground">Cambiaste tu objetivo de calorías a 2000</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Ayer, 19:30</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">Peso registrado</p>
                    <p className="text-xs text-muted-foreground">Actualizaste tu peso a 70 kg</p>
                  </div>
                  <span className="text-xs text-muted-foreground">25/04/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
