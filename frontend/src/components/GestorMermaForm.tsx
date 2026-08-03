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
          background: '#1D1D1F',
          color: '#FFFFFF',
          confirmButtonColor: '#4F8A5B' 
        });
      } else {
        Swal.fire({
          title: 'Aviso',
          text: data.error || 'No se pudo realizar el emparejamiento.',
          icon: 'warning',
          background: '#1D1D1F',
          color: '#FFFFFF',
          confirmButtonColor: '#D6A34A' 
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error', 
        text: 'Hubo un problema de conexión', 
        icon: 'error',
        background: '#1D1D1F',
        color: '#FFFFFF',
        confirmButtonColor: '#C44A5A' 
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
          <label className="block text-[10px] font-mono font-bold text-white/50 mb-2 uppercase tracking-[0.2em] ml-4">Tipo de Residuo</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-white/20 rounded-full p-4 bg-black/20 text-white focus:ring-1 focus:ring-[#7A1F3D] focus:border-[#7A1F3D] outline-none transition-all backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] appearance-none cursor-pointer"
          >
            <option value="comida" className="bg-[#1D1D1F]">Comida</option>
            <option value="organico" className="bg-[#1D1D1F]">Orgánico</option>
            <option value="vidrio" className="bg-[#1D1D1F]">Vidrio</option>
            <option value="textil" className="bg-[#1D1D1F]">Textil</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold text-white/50 mb-2 uppercase tracking-[0.2em] ml-4">Cantidad (kg)</label>
          <input 
            type="number" 
            min="1"
            value={cantidad} 
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="w-full border border-white/20 rounded-full p-4 bg-black/20 text-white focus:ring-1 focus:ring-[#7A1F3D] focus:border-[#7A1F3D] outline-none transition-all backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
            required
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          className="mt-4 bg-[#7A1F3D] hover:bg-[#92284B] text-white font-bold py-4 px-4 rounded-full shadow-lg transition-all w-full uppercase tracking-widest text-[10px] font-mono"
        >
          Emparejar y Enviar
        </motion.button>
      </form>
    </motion.div>
  );
}
