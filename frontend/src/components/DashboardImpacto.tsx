import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardImpacto() {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.02 }}
        className="bg-white/5 backdrop-blur-[32px] border border-white/20 p-8 rounded-[40px] flex flex-col justify-center items-center hover:border-[#7A1F3D]/50 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.1)] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F8A5B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <span className="text-4xl font-extrabold mb-2 text-white group-hover:text-[#4F8A5B] transition-colors relative z-10">15 kg</span>
        <span className="text-[10px] font-mono text-white/50 text-center uppercase tracking-[0.2em] relative z-10">CO2 Evitado</span>
      </motion.div>
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.02 }}
        className="bg-white/5 backdrop-blur-[32px] border border-white/20 p-8 rounded-[40px] flex flex-col justify-center items-center hover:border-[#7A1F3D]/50 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.1)] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4D78C8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <span className="text-4xl font-extrabold mb-2 text-white group-hover:text-[#4D78C8] transition-colors relative z-10">200 L</span>
        <span className="text-[10px] font-mono text-white/50 text-center uppercase tracking-[0.2em] relative z-10">Agua Ahorrada</span>
      </motion.div>
    </div>
  );
}
