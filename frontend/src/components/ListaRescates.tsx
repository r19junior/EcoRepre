import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

type Evento = {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  imagenUrl: string;
  ubicacion: string;
  googleMapsLink: string;
  descripcion: string;
  puntos: number;
};

const RESCATES: Evento[] = [
  {
    id: 1,
    nombre: 'Menú Ejecutivo Sobrante',
    fecha: 'Hoy, 3:00 PM',
    hora: '3:00 PM - 4:30 PM',
    imagenUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    ubicacion: 'Chicha por Gastón Acurio',
    googleMapsLink: 'https://goo.gl/maps/plaza_armas_arequipa',
    descripcion: 'Deliciosos platos del menú ejecutivo que quedaron intactos. ¡Ayúdanos a no desperdiciar y disfruta con un 50% de descuento!',
    puntos: 20
  },
  {
    id: 2,
    nombre: 'Buffet de Desayuno',
    fecha: 'Mañana, 10:30 AM',
    hora: '10:30 AM - 11:30 AM',
    imagenUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    ubicacion: 'Hotel Casa Andina Premium',
    googleMapsLink: 'https://goo.gl/maps/centro_historico_aqp',
    descripcion: 'Frutas, panes, y jugos del buffet matutino en perfecto estado. Abundante comida a una fracción de su costo original.',
    puntos: 15
  },
  {
    id: 3,
    nombre: 'Postres Artesanales',
    fecha: 'Hoy, 8:00 PM',
    hora: '8:00 PM - 9:30 PM',
    imagenUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    ubicacion: 'La Benita de los Claustros',
    googleMapsLink: 'https://goo.gl/maps/valle_chilina_aqp',
    descripcion: 'Llevate 2x1 en postres artesanales tradicionales arequipeños que preparamos hoy. ¡Súper frescos y a bajo costo!',
    puntos: 10
  },
  {
    id: 4,
    nombre: 'Cena de Rescate',
    fecha: 'Hoy, 9:00 PM',
    hora: '9:00 PM - 10:00 PM',
    imagenUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    ubicacion: 'Eco-Lodge Arequipa',
    googleMapsLink: 'https://goo.gl/maps/cayma_aqp',
    descripcion: 'Porciones generosas de platos de fondo. Evitamos que la comida termine en la basura ofreciéndotela con un 70% de descuento.',
    puntos: 25
  }
];

export default function ListaRescates() {
  // Estado para verificar sesión
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('loggedUser');
      setLoggedUser(userStr ? JSON.parse(userStr) : null);
    };
    checkUser();
    const interval = setInterval(checkUser, 1000); // Polling simple para sincronizar ventanas
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    // Scroll a la sección de login
    window.location.href = '#auth';
  };

  const handleQRClick = (eventoNombre: string) => {
    Swal.fire({
      title: `Registrar Puntos`,
      html: `
        <p class="text-sm text-white/70 mb-4">Hola <b>${loggedUser?.nombre}</b>, muestra este código en <b>${eventoNombre}</b></p>
        <div class="flex justify-center p-4 bg-white rounded-xl mx-auto w-48 h-48">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(loggedUser?.documento + '-' + eventoNombre)}" alt="QR Code" class="w-full h-full object-contain" />
        </div>
      `,
      background: '#101114',
      color: '#fff',
      confirmButtonColor: '#7A1F3D',
      confirmButtonText: 'Cerrar',
      customClass: { popup: 'border border-white/20 rounded-2xl' }
    });
  };

  const handleVerDetalles = (evento: Evento) => {
    Swal.fire({
      title: evento.nombre,
      html: `
        <div class="text-left text-sm text-white/80 space-y-4 mb-4 mt-2">
          <img src="${evento.imagenUrl}" alt="${evento.nombre}" class="w-full h-40 object-cover rounded-xl border border-white/10 shadow-lg" />
          <p class="text-white/90 text-sm leading-relaxed">${evento.descripcion}</p>
          
          <div class="bg-black/40 p-5 rounded-xl border border-white/10 space-y-3 mt-4">
            <div class="flex items-center gap-3">
              <span class="text-lg">Fecha</span> 
              <span><strong class="text-white"></strong> ${evento.fecha}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">Hora</span> 
              <span><strong class="text-white"></strong> ${evento.hora}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">Lugar</span> 
              <span><strong class="text-white"></strong> ${evento.ubicacion}</span>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Ver en Google Maps',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#7A1F3D',
      cancelButtonColor: '#222',
      background: '#101114',
      color: '#fff',
      customClass: { 
        popup: 'border border-white/20 rounded-2xl max-w-lg',
        confirmButton: 'rounded-full px-6 py-2.5 font-bold',
        cancelButton: 'rounded-full px-6 py-2.5 bg-white/10 hover:bg-white/20'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(evento.googleMapsLink, '_blank');
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {RESCATES.map((evento) => (
          <motion.div
            key={evento.id}
            variants={itemVariants}
            className="glass-bubble overflow-hidden rounded-[2rem] border border-white/10 group flex flex-col"
          >
            <div className="h-56 overflow-hidden relative border-b border-white/10">
              <div className="absolute inset-0 bg-[#7A1F3D]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img 
                src={evento.imagenUrl} 
                alt={evento.nombre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">{evento.fecha}</span>
                </div>
                <div className="bg-[#7A1F3D] px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">+{evento.puntos} PTS</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-white/60 text-xs font-semibold">
                <span>{evento.ubicacion}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{evento.nombre}</h3>
              <p className="text-sm text-white/70 mb-8 font-light leading-relaxed flex-grow">
                {evento.descripcion}
              </p>
              
              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                <button 
                  onClick={() => handleVerDetalles(evento)}
                  className="text-[#7A1F3D] font-bold text-sm hover:text-white transition-colors flex items-center justify-center gap-2 bg-white/5 hover:bg-[#92284B] px-5 py-3 rounded-full border border-white/10 hover:border-transparent w-full sm:w-auto"
                >
                  Ver detalles
                </button>
                
                {!loggedUser ? (
                  <button 
                    onClick={handleLoginClick}
                    className="text-white font-bold text-sm hover:text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-[#7A1F3D] to-[#92284B] hover:from-[#92284B] hover:to-[#A33055] shadow-lg hover:shadow-[#7A1F3D]/30 px-5 py-3 rounded-full border border-transparent w-full sm:w-auto"
                  >
                    Inicia tus puntos
                  </button>
                ) : (
                  <button 
                    onClick={() => handleQRClick(evento.nombre)}
                    className="text-white font-bold text-sm hover:text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg hover:shadow-emerald-500/30 px-5 py-3 rounded-full border border-transparent w-full sm:w-auto"
                  >
                    Registra tus puntos (QR)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
