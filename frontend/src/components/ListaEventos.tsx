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
};

const EVENTOS: Evento[] = [
  {
    id: 1,
    nombre: 'Feria Circular Arequipa',
    fecha: '15 de Octubre, 2026',
    hora: '10:00 AM - 6:00 PM',
    imagenUrl: '/evento_feria.png',
    ubicacion: 'Plaza de Armas',
    googleMapsLink: 'https://goo.gl/maps/plaza_armas_arequipa',
    descripcion: 'Intercambio de recursos y exposición de productos supra-reciclados locales hechos por artesanos de toda la región.'
  },
  {
    id: 2,
    nombre: 'Taller de Eco-Turismo',
    fecha: '22 de Octubre, 2026',
    hora: '3:00 PM - 5:00 PM',
    imagenUrl: '/evento_taller.png',
    ubicacion: 'Centro Histórico (Casona Editora)',
    googleMapsLink: 'https://goo.gl/maps/centro_historico_aqp',
    descripcion: 'Capacitación inmersiva para turistas y guías sobre rutas de mínimo impacto ambiental y correcta gestión de mermas.'
  },
  {
    id: 3,
    nombre: 'Limpieza del Río Chili',
    fecha: '05 de Noviembre, 2026',
    hora: '8:00 AM - 1:00 PM',
    imagenUrl: '/evento_limpieza.png',
    ubicacion: 'Valle del Chilina',
    googleMapsLink: 'https://goo.gl/maps/valle_chilina_aqp',
    descripcion: 'Jornada de voluntariado masivo al aire libre para recuperar materiales valorizables de las riberas del río más importante de la ciudad.'
  },
  {
    id: 4,
    nombre: 'Congreso Hotelería Verde',
    fecha: '12 de Noviembre, 2026',
    hora: '9:00 AM - 2:00 PM',
    imagenUrl: '/evento_congreso.png',
    ubicacion: 'Cayma (Centro de Convenciones)',
    googleMapsLink: 'https://goo.gl/maps/cayma_aqp',
    descripcion: 'Encuentro exclusivo de empresas hoteleras que implementan la red EcoLoop para maximizar su EcoScore y compartir estrategias.'
  }
];

export default function ListaEventos() {
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
              <span class="text-lg">📅</span> 
              <span><strong class="text-white">Fecha:</strong> ${evento.fecha}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">⏰</span> 
              <span><strong class="text-white">Hora:</strong> ${evento.hora}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">📍</span> 
              <span><strong class="text-white">Lugar:</strong> ${evento.ubicacion}</span>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Ver en Google Maps 🗺️',
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
        {EVENTOS.map((evento) => (
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
              <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">{evento.fecha}</span>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-white/60 text-xs font-semibold">
                <span className="text-[#92284B]">📍</span>
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
                    <span className="text-lg leading-none">📱</span> Registra tus puntos (QR)
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
