import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function RegistroPasaporteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    if (user) setLoggedUser(JSON.parse(user));
  }, []);

  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    correo: '',
    password: '',
    avatar: '',
    aceptaTerminos: false,
  });

  const [loginData, setLoginData] = useState({
    documento: '',
    password: '',
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/turistas/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        Swal.fire({
          title: '¡Pasaporte Creado!',
          text: data.mensaje || 'Bienvenido al ecosistema.',
          icon: 'success',
          background: '#101114',
          color: '#fff',
          confirmButtonColor: '#7A1F3D',
        });
        setFormData({ documento: '', nombre: '', correo: '', password: '', avatar: '', aceptaTerminos: false });
        setLoggedUser(data.turista);
        localStorage.setItem('loggedUser', JSON.stringify(data.turista));
      } else {
        Swal.fire({ title: 'Error', text: data.error, icon: 'error', background: '#101114', color: '#fff' });
      }
    } catch (error) {
      setIsSubmitting(false);
      Swal.fire({ title: 'Error de Conexión', text: 'El servidor no está disponible.', icon: 'error', background: '#101114', color: '#fff' });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/turistas/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        Swal.fire({
          title: '¡Sesión Iniciada!',
          text: `Hola ${data.turista.nombre}.`,
          icon: 'success',
          background: '#101114',
          color: '#fff',
          confirmButtonColor: '#7A1F3D',
        });
        setLoginData({ documento: '', password: '' });
        setLoggedUser(data.turista);
        localStorage.setItem('loggedUser', JSON.stringify(data.turista));
      } else {
        Swal.fire({ title: 'Error', text: data.error, icon: 'error', background: '#101114', color: '#fff' });
      }
    } catch (error) {
      setIsSubmitting(false);
      Swal.fire({ title: 'Error de Conexión', text: 'El servidor no está disponible.', icon: 'error', background: '#101114', color: '#fff' });
    }
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem('loggedUser');
  };

  if (loggedUser) {
    return (
      <div className="max-w-md mx-auto w-full" id="auth">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-bubble p-8 md:p-12 w-full border-[#7A1F3D]/30 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_40px_rgba(122,31,61,0.15)]"
        >
          <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-[#7A1F3D]/30 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#7A1F3D] mb-4 shadow-xl relative z-10 bg-black">
            <img src={loggedUser.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mb-1 relative z-10">{loggedUser.nombre}</h2>
          <p className="text-white/60 mb-6 relative z-10 text-sm">{loggedUser.correo} <br/> DNI: {loggedUser.documento}</p>
          
          <div className="bg-black/30 border border-white/10 rounded-2xl w-full px-8 py-5 mb-8 flex flex-col items-center relative z-10">
            <span className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">Tus EcoPoints</span>
            <span className="text-5xl font-extrabold text-[#92284B]">{loggedUser.ecoPoints}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-white font-bold text-sm hover:text-white transition-all bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full relative z-10"
          >
            Cerrar Sesión
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" id="auth">
      
      {/* LADO 1: REGISTRO */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-bubble p-8 md:p-10 w-full border-white/10 relative overflow-hidden flex flex-col"
      >
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Crea tu <span className="text-[#92284B]">Pasaporte</span></h3>
          <p className="text-white/60 text-xs">Regístrate en los eventos como turista y empieza a ganar EcoPoints.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3 relative z-10 flex-grow flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1 ml-1">Foto de Perfil (Opcional)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#7A1F3D] file:text-white hover:file:bg-[#92284B] cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1 ml-1">DNI / Pasaporte</label>
              <input type="text" name="documento" value={formData.documento} onChange={handleRegisterChange} required placeholder="Ej. 72345678" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1 ml-1">Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleRegisterChange} required placeholder="Juan Pérez" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1 ml-1">Correo Electrónico</label>
              <input type="email" name="correo" value={formData.correo} onChange={handleRegisterChange} required placeholder="juan@ejemplo.com" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1 ml-1">Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleRegisterChange} required placeholder="Crea una contraseña segura" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleRegisterChange} required className="mt-1 w-4 h-4 bg-black/30 border-white/20 rounded cursor-pointer" />
              <label className="text-[10px] text-white/60 leading-tight cursor-pointer">Acepto los términos y condiciones.</label>
            </div>
          </div>
          
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full mt-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all">
            Registrarme
          </motion.button>
        </form>
      </motion.div>

      {/* LADO 2: LOGIN */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-bubble p-8 md:p-10 w-full border-[#7A1F3D]/30 relative overflow-hidden flex flex-col shadow-[0_0_40px_rgba(122,31,61,0.15)]"
      >
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#7A1F3D]/30 rounded-full blur-[40px] pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Inicia tus <span className="text-white">Puntos</span></h3>
          <p className="text-white/60 text-xs">Ingresa como Turista para ver tus EcoPoints y recompensas.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5 ml-1">DNI / Pasaporte</label>
              <input type="text" name="documento" value={loginData.documento} onChange={handleLoginChange} required placeholder="Tu documento de registro" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5 ml-1">Contraseña</label>
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required placeholder="••••••••" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7A1F3D] transition-all" />
            </div>
          </div>
          
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full mt-6 bg-gradient-to-r from-[#7A1F3D] to-[#92284B] hover:from-[#92284B] hover:to-[#A33055] text-white font-bold py-3.5 rounded-xl shadow-[0_8px_20px_rgba(122,31,61,0.3)] transition-all flex justify-center items-center">
            {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Ingresar'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
