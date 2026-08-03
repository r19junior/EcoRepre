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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/5 backdrop-blur-[32px] rounded-[40px] border border-white/20 p-8 flex flex-col justify-between hover:border-[#7A1F3D]/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A1F3D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#92284B] transition-colors">{hotel.nombre}</h3>
            <p className="text-white/50 text-[10px] font-mono uppercase tracking-[0.2em] mb-8">Score Ambiental // B2C</p>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col">
              <span className={`text-5xl font-extrabold transition-colors ${hotel.ecoScore >= 80 ? 'text-[#4F8A5B]' : 'text-white'}`}>
                {hotel.ecoScore}
              </span>
              <span className="text-white/50 text-[10px] font-mono uppercase tracking-[0.1em] mt-1">Puntos</span>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-sm border transition-all ${
              hotel.ecoScore >= 80 
              ? 'bg-[#CFAE5D]/10 border-[#CFAE5D]/50 text-[#CFAE5D]' 
              : 'bg-white/10 border-white/20 text-white/70'
            }`}>
              {hotel.ecoScore >= 80 ? 'Platinum' : 'Standard'}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
