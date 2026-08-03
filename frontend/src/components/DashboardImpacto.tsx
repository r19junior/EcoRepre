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
        whileHover={{ scale: 1.05 }}
        className="bg-[#020617]/50 border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center hover:border-[#D4AF37]/50 transition-colors cursor-pointer group"
      >
        <span className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 group-hover:from-white group-hover:to-[#D4AF37]">15 kg</span>
        <span className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-[0.2em]">CO2 Evitado</span>
      </motion.div>
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.05 }}
        className="bg-[#020617]/50 border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center hover:border-[#D4AF37]/50 transition-colors cursor-pointer group"
      >
        <span className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 group-hover:from-white group-hover:to-[#D4AF37]">200 L</span>
        <span className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-[0.2em]">Agua Ahorrada</span>
      </motion.div>
    </div>
  );
}
