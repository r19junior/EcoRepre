import React, { useState } from 'react';

export default function CreadorItinerario() {
  const [paso, setPaso] = useState(1);
  const [dias, setDias] = useState('2');
  const [ninos, setNinos] = useState(false);
  const [sillaRuedas, setSillaRuedas] = useState(false);
  const [intereses, setIntereses] = useState<string[]>([]);
  const [generando, setGenerando] = useState(false);

  const toggleInteres = (i: string) => {
    if (intereses.includes(i)) setIntereses(intereses.filter(x => x !== i));
    else setIntereses([...intereses, i]);
  };

  const handleGenerar = () => {
    setGenerando(true);
    setTimeout(() => {
      setGenerando(false);
      setPaso(2);
    }, 1500); // Simulamos tiempo de generación de IA
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {paso === 1 && (
        <div className="w-full max-w-3xl glass-bubble rounded-[2rem] border border-white/20 p-8 md:p-12 text-left relative overflow-hidden">
          {/* Círculo decorativo */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#F1B400]/20 rounded-full blur-[60px] pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Diseñemos tu viaje perfecto</h2>
          <p className="text-white/70 mb-8">Responde unas breves preguntas para generar un itinerario a tu medida.</p>

          <div className="space-y-8 relative z-10">
            {/* Pregunta 1 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">1. ¿Cuántos días visitarás Arequipa?</h3>
              <div className="flex gap-3">
                {['1', '2', '3', '4+'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setDias(d)}
                    className={`w-12 h-12 rounded-xl font-bold transition-colors border ${dias === d ? 'bg-[#F1B400] text-black border-[#F1B400]' : 'bg-black/30 text-white/70 border-white/10 hover:border-white/30'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Pregunta 2 (Problemática de Accesibilidad y Familias) */}
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 shadow-inner">
              <h3 className="text-lg font-bold text-white mb-1">2. ¿Tienes alguna necesidad especial?</h3>
              <p className="text-white/50 text-sm mb-4">Filtraremos automáticamente los lugares que no cuenten con las facilidades necesarias.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setNinos(!ninos)}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center ${ninos ? 'bg-white/20 border-white text-white scale-[1.02]' : 'bg-black/20 border-white/10 text-white/50 hover:bg-white/5'}`}
                >
                  <span className="text-4xl mb-2">🚸</span>
                  <span className="font-bold text-sm">Viajo con niños</span>
                  <span className="text-[10px] mt-1 opacity-70">Lugares amigables y seguros</span>
                </button>
                
                <button 
                  onClick={() => setSillaRuedas(!sillaRuedas)}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center ${sillaRuedas ? 'bg-[#7A1F3D] border-[#7A1F3D] text-white scale-[1.02]' : 'bg-black/20 border-white/10 text-white/50 hover:bg-white/5'}`}
                >
                  <span className="text-4xl mb-2">♿</span>
                  <span className="font-bold text-sm">Accesibilidad</span>
                  <span className="text-[10px] mt-1 opacity-70">Rampas y facilidades motrices</span>
                </button>
              </div>
            </div>

            {/* Pregunta 3 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">3. ¿Qué experiencias buscas?</h3>
              <div className="flex flex-wrap gap-3">
                {['Cultura e Historia', 'Gastronomía Local', 'Aventura', 'Naturaleza', 'Relajación'].map(i => (
                  <button 
                    key={i}
                    onClick={() => toggleInteres(i)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${intereses.includes(i) ? 'bg-white/20 text-white border-white' : 'bg-black/30 text-white/70 border-white/10 hover:border-white/30'}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleGenerar}
              disabled={generando}
              className="w-full bg-[#7A1F3D] hover:bg-[#92284B] text-white py-4 rounded-xl font-extrabold text-lg transition-all flex justify-center items-center gap-2"
            >
              {generando ? 'Generando tu ruta mágica...' : 'Crear Itinerario Personalizado ✨'}
            </button>
          </div>
        </div>
      )}

      {paso === 2 && (
        <div className="w-full max-w-4xl animate-fade-in text-left">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Tu Itinerario Sugerido</h2>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-[#F1B400]/20 text-[#F1B400] px-2 py-1 rounded border border-[#F1B400]/30">{dias} Días</span>
                {ninos && <span className="text-xs bg-white/20 text-white px-2 py-1 rounded border border-white/30">🚸 Apto para Niños</span>}
                {sillaRuedas && <span className="text-xs bg-[#7A1F3D]/40 text-[#ff8fb3] px-2 py-1 rounded border border-[#7A1F3D]/50">♿ Accesible</span>}
              </div>
            </div>
            <button onClick={() => setPaso(1)} className="text-white/50 hover:text-white text-sm underline">
              Volver a editar
            </button>
          </div>

          {/* Timeline del Itinerario */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            
            {/* Parada 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#101114] bg-[#F1B400] text-black font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-bubble p-5 rounded-2xl border border-white/10 group-hover:border-[#F1B400]/50 transition-colors">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-[#F1B400]">09:00 AM</span>
                  <span className="text-xs text-white/50">1 hora</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Desayuno Tradicional</h3>
                <p className="text-sm text-white/70 mb-3">La Benita de los Claustros. Excelente comida y rampas de acceso.</p>
                {sillaRuedas && <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded">✓ Acceso verificado</span>}
              </div>
            </div>

            {/* Parada 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#101114] bg-[#7A1F3D] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-bubble p-5 rounded-2xl border border-white/10 group-hover:border-[#7A1F3D]/50 transition-colors">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-[#ff8fb3]">10:30 AM</span>
                  <span className="text-xs text-white/50">2.5 horas</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Monasterio Santa Catalina</h3>
                <p className="text-sm text-white/70 mb-3">Tour histórico adaptado para familias. Espacios amplios.</p>
                {ninos && <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">✓ Actividades Infantiles</span>}
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
             <button className="bg-white text-[#101114] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors">
               Guardar Itinerario y Ver Mapa
             </button>
          </div>
        </div>
      )}

    </div>
  );
}
