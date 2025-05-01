
import React from 'react';
import AppNavbar from '@/components/AppNavbar';
import { User, Settings, Activity, Clock } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <User size={40} className="text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold">Usuario</h2>
                <p className="text-sm text-muted-foreground mb-4">usuario@ejemplo.com</p>
                <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Editar perfil
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Edad</span>
                  <span className="font-medium">28 años</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Altura</span>
                  <span className="font-medium">175 cm</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Peso</span>
                  <span className="font-medium">70 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Objetivo</span>
                  <span className="font-medium">Mantener peso</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex items-start mb-4">
                <Activity className="mr-2" />
                <div>
                  <h3 className="font-medium">Objetivos diarios</h3>
                  <p className="text-sm text-muted-foreground">Configura tus metas nutricionales</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Calorías</span>
                    <span className="text-sm font-medium">2000 kcal</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-black rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Proteínas</span>
                    <span className="text-sm font-medium">120 g</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-black rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Carbohidratos</span>
                    <span className="text-sm font-medium">240 g</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-black rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Grasas</span>
                    <span className="text-sm font-medium">65 g</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-black rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Ajustar objetivos
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex items-start mb-4">
                <Settings className="mr-2" />
                <div>
                  <h3 className="font-medium">Preferencias</h3>
                  <p className="text-sm text-muted-foreground">Configura las opciones de la aplicación</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Notificaciones</span>
                  <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-primary absolute top-0.5 left-0.5 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Tema oscuro</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white absolute top-0.5 right-0.5 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Unidades métricas</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white absolute top-0.5 right-0.5 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span>Recordatorios</span>
                  <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-primary absolute top-0.5 left-0.5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex items-start mb-4">
                <Clock className="mr-2" />
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
