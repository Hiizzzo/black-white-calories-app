
import React from 'react';
import { motion } from 'framer-motion';

const motivationalQuotes = [
  "El dolor que sientes hoy es la fuerza que sentirás mañana.",
  "Tu cuerpo puede soportar casi cualquier cosa. Es tu mente la que debes convencer.",
  "Los buenos hábitos de hoy son los resultados de mañana.",
  "El fitness no es una meta, es un estilo de vida.",
  "Mantén la calma y sigue entrenando."
];

const LoadingScreen: React.FC = () => {
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-4">Fitt Boys</h1>
        <motion.div 
          className="h-1 w-40 bg-primary rounded-full overflow-hidden mb-6"
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <p className="text-center text-muted-foreground px-8 max-w-md">{randomQuote}</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
