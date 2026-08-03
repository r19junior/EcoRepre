import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Hotel = {
  id: number;
  nombre: string;
  ecoScore: number;
};

export default function ListaHoteles() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/hoteles')
      .then((res) => res.json())
      .then((data) => setHoteles(data))
      .catch((err) => console.error(err));
  }, []);

  // Variantes de Framer Motion para efecto cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {hoteles.map((hotel) => (
        <motion.div 
          key={hotel.id} 
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-[#020617]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-colors group cursor-pointer relative overflow-hidden"
        >
          {/* Brillo dinámico de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-[#D4AF37] transition-colors">{hotel.nombre}</h3>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-8">Score Ambiental // B2C</p>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 group-hover:from-white group-hover:to-[#D4AF37] transition-all">
                {hotel.ecoScore}
              </span>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.1em] mt-1">Puntos</span>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest text-white shadow-sm border transition-all ${
              hotel.ecoScore >= 80 
              ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black' 
              : 'bg-slate-800/50 border-slate-600 text-slate-400'
            }`}>
              {hotel.ecoScore >= 80 ? 'Platinum' : 'Standard'}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
