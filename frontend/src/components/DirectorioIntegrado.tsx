import React, { useState } from 'react';

const MOCK_DATA = [
  {
    id: 1,
    nombre: 'Monasterio de Santa Catalina',
    categoria: 'Atractivos',
    presupuesto: '$$',
    experiencia: 'Cultura',
    ubicacion: 'Centro Histórico',
    horarios: '9:00 AM - 5:00 PM',
    precios: 'S/ 40.00 General',
    contacto: 'visitas@santacatalina.org.pe',
    imagen: '/mod_atractivo.png',
    descripcion: 'Un convento colonial que parece una ciudad dentro de otra.',
    rating: '4.9',
    reviews: 1250,
  },
  {
    id: 2,
    nombre: 'Zingaro Restaurante',
    categoria: 'Restaurantes',
    presupuesto: '$$$',
    experiencia: 'Gastronomía',
    ubicacion: 'Centro Histórico',
    horarios: '12:00 PM - 10:00 PM',
    precios: 'S/ 50.00 - S/ 120.00',
    contacto: '+51 54 217662',
    imagen: '/mod_restaurante_1785800492796.png',
    descripcion: 'Auténtica gastronomía arequipeña en un ambiente colonial.',
    rating: '4.7',
    reviews: 840,
  },
  {
    id: 3,
    nombre: 'Trekking Valle del Colca',
    categoria: 'Actividades',
    presupuesto: '$$',
    experiencia: 'Aventura',
    ubicacion: 'Valle del Colca',
    horarios: 'Tours de 2 a 3 días',
    precios: 'S/ 150.00 - S/ 300.00',
    contacto: 'info@colcatreks.com',
    imagen: '/mod_actividad.png',
    descripcion: 'Caminatas por uno de los cañones más profundos del mundo.',
    rating: '4.8',
    reviews: 530,
  },
  {
    id: 4,
    nombre: 'Hotel Costa del Sol',
    categoria: 'Hoteles / Hospedajes',
    presupuesto: '$$$',
    experiencia: 'Relax',
    ubicacion: 'Selva Alegre',
    horarios: 'Check-in 2:00 PM',
    precios: 'Desde $120.00/noche',
    contacto: 'reservas@costadelsol.pe',
    imagen: '/mod_hotel_1785800485064.png',
    descripcion: 'Hotel 5 estrellas con instalaciones modernas y vistas al volcán.',
    rating: '4.6',
    reviews: 1100,
  },
  {
    id: 5,
    nombre: 'Arequipa Free Walking Tour',
    categoria: 'Guías turísticos',
    presupuesto: '$',
    experiencia: 'Cultura',
    ubicacion: 'Centro Histórico',
    horarios: '10:00 AM y 3:00 PM',
    precios: 'Aporte Voluntario (Propina)',
    contacto: '+51 987654321',
    imagen: '/mod_guia_1785800500716.png',
    descripcion: 'Descubre los secretos de la ciudad blanca caminando con expertos.',
    rating: '4.9',
    reviews: 2100,
  },
];

const CATEGORIAS = ['Todos', 'Hoteles / Hospedajes', 'Restaurantes', 'Atractivos', 'Guías turísticos', 'Actividades'];

export default function DirectorioIntegrado() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroPresupuesto, setFiltroPresupuesto] = useState('');
  const [filtroExperiencia, setFiltroExperiencia] = useState('');
  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [conNinos, setConNinos] = useState(false);
  const [accesibilidad, setAccesibilidad] = useState(false);

  // Lógica de filtrado
  const resultados = MOCK_DATA.filter((item) => {
    const matchCat = categoriaActiva === 'Todos' || item.categoria === categoriaActiva;
    const matchSearch = item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || item.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPres = filtroPresupuesto ? item.presupuesto === filtroPresupuesto : true;
    const matchExp = filtroExperiencia ? item.experiencia === filtroExperiencia : true;
    const matchUbi = filtroUbicacion ? item.ubicacion === filtroUbicacion : true;
    // (Lógica mockeada temporalmente: si está activo el filtro, asumimos que siempre pasa o se puede filtrar más estrictamente después)
    // const matchNinos = conNinos ? item.aptoNinos : true;
    // const matchAcceso = accesibilidad ? item.accesible : true;

    return matchCat && matchSearch && matchPres && matchExp && matchUbi;
  });

  return (
    <div className="w-full flex flex-col space-y-8">
      
      {/* 1. Navegación de Categorías */}
      <div className="flex flex-wrap gap-2 justify-center pb-2">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md ${
              categoriaActiva === cat
                ? 'bg-[#F1B400] text-black border border-[#F1B400]'
                : 'glass-bubble text-white/80 hover:text-white border border-white/10 hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Buscador y Filtros */}
      <div className="glass-bubble p-4 border border-white/20 rounded-2xl flex flex-col md:flex-row gap-4">
        {/* Búsqueda por texto */}
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
          <input
            type="text"
            placeholder="Buscar lugares, restaurantes o actividades..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F1B400] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filtro: Presupuesto */}
        <select 
          className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#F1B400] appearance-none cursor-pointer"
          value={filtroPresupuesto}
          onChange={(e) => setFiltroPresupuesto(e.target.value)}
        >
          <option value="">Presupuesto</option>
          <option value="$">$ (Económico)</option>
          <option value="$$">$$ (Moderado)</option>
          <option value="$$$">$$$ (Premium)</option>
        </select>

        {/* Filtro: Experiencia */}
        <select 
          className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#F1B400] appearance-none cursor-pointer"
          value={filtroExperiencia}
          onChange={(e) => setFiltroExperiencia(e.target.value)}
        >
          <option value="">Experiencia</option>
          <option value="Cultura">Cultura</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Aventura">Aventura</option>
          <option value="Relax">Relax</option>
        </select>

        {/* Filtro: Ubicación */}
        <select 
          className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#F1B400] appearance-none cursor-pointer"
          value={filtroUbicacion}
          onChange={(e) => setFiltroUbicacion(e.target.value)}
        >
          <option value="">Ubicación</option>
          <option value="Centro Histórico">Centro Histórico</option>
          <option value="Yanahuara">Yanahuara</option>
          <option value="Valle del Colca">Valle del Colca</option>
          <option value="Selva Alegre">Selva Alegre</option>
        </select>
      </div>

      {/* 2.5. Toggles de Accesibilidad */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="text-white/50 text-sm font-semibold">Necesidades especiales:</span>
        <button 
          onClick={() => setConNinos(!conNinos)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors border ${conNinos ? 'bg-white/20 border-white text-white' : 'bg-black/20 border-white/10 text-white/60 hover:border-white/30 hover:text-white'}`}
        >
          🚸 Viajando con niños
        </button>
        <button 
          onClick={() => setAccesibilidad(!accesibilidad)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors border ${accesibilidad ? 'bg-[#7A1F3D] border-[#7A1F3D] text-white' : 'bg-black/20 border-white/10 text-white/60 hover:border-white/30 hover:text-white'}`}
        >
          ♿ Accesibilidad (Silla de Ruedas)
        </button>
      </div>

      {/* 3. Grilla de Resultados (Fichas de Detalle) */}
      {resultados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultados.map(item => (
            <div key={item.id} className="glass-bubble rounded-3xl overflow-hidden border border-white/10 hover:border-[#F1B400]/50 transition-all hover:shadow-[0_10px_30px_rgba(241,180,0,0.15)] flex flex-col group">
              
              {/* Imagen y Categoría */}
              <div className="relative h-48 w-full bg-black/50 overflow-hidden">
                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                  {item.categoria}
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-lg text-xs font-bold text-black flex items-center gap-1 shadow-lg">
                  ⭐ {item.rating} <span className="text-black/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              {/* Contenido Ficha de Detalle */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white leading-tight pr-2">{item.nombre}</h3>
                  <span className="text-[#F1B400] font-bold text-sm bg-[#F1B400]/10 px-2 py-0.5 rounded border border-[#F1B400]/30">{item.presupuesto}</span>
                </div>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{item.descripcion}</p>
                
                {/* Campos Obligatorios */}
                <div className="space-y-2 mt-auto pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-[#F1B400]">📍</span>
                    <span className="text-white/80 font-medium">{item.ubicacion}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F1B400]">🕒</span>
                    <span className="text-white/80">{item.horarios}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F1B400]">💵</span>
                    <span className="text-white/80">{item.precios}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F1B400]">📞</span>
                    <span className="text-white/80">{item.contacto}</span>
                  </div>
                </div>

                <button className="w-full mt-5 bg-white/10 hover:bg-[#7A1F3D] text-white py-2 rounded-xl font-bold transition-colors text-sm border border-white/20 hover:border-transparent">
                  Ver detalles
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-bubble rounded-3xl border border-white/10">
          <div className="text-4xl mb-4">🏜️</div>
          <h3 className="text-xl text-white font-bold mb-2">No se encontraron lugares</h3>
          <p className="text-white/60 text-sm">Prueba ajustando los filtros de tu búsqueda para ver más resultados.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFiltroPresupuesto('');
              setFiltroExperiencia('');
              setFiltroUbicacion('');
              setCategoriaActiva('Todos');
            }}
            className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors border border-white/20"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

    </div>
  );
}
