import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function GestorMermaForm() {
  const [tipo, setTipo] = useState('comida');
  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/merma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelId: 1, tipo, cantidad: Number(cantidad) })
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: `Tus recursos fueron asignados a ${data.receptor}. Has evitado ${data.co2Evitado}kg de CO2.`,
          icon: 'success',
          background: '#020617',
          color: '#ffffff',
          confirmButtonColor: '#D4AF37'
        });
      } else {
        Swal.fire({
          title: 'Aviso',
          text: data.error || 'No se pudo realizar el emparejamiento.',
          icon: 'warning',
          background: '#020617',
          color: '#ffffff',
          confirmButtonColor: '#D4AF37'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error', 
        text: 'Hubo un problema de conexión', 
        icon: 'error',
        background: '#020617',
        color: '#ffffff',
        confirmButtonColor: '#D4AF37'
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Tipo de Residuo</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-white/10 rounded-xl p-4 bg-[#020617]/50 text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all hover:bg-white/5"
          >
            <option value="comida">Comida</option>
            <option value="organico">Orgánico</option>
            <option value="vidrio">Vidrio</option>
            <option value="textil">Textil</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Cantidad (kg)</label>
          <input 
            type="number" 
            min="1"
            value={cantidad} 
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="w-full border border-white/10 rounded-xl p-4 bg-[#020617]/50 text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all hover:bg-white/5"
            required
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          className="mt-4 bg-[#D4AF37] hover:bg-white text-[#020617] font-bold py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-colors w-full uppercase tracking-widest text-[10px] font-mono"
        >
          Emparejar y Enviar
        </motion.button>
      </form>
    </motion.div>
  );
}
