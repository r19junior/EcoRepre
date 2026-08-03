const express = require('express');
const cors = require('cors');
const { hoteles, receptores, mermas } = require('./data');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hoteles', (req, res) => {
  const hotelesOrdenados = [...hoteles].sort((a, b) => b.ecoScore - a.ecoScore);
  res.json(hotelesOrdenados);
});

app.post('/api/merma', (req, res) => {
  const { hotelId, tipo, cantidad } = req.body;

  const receptorAsignado = receptores.find(
    (receptor) => receptor.necesidad === tipo && receptor.capacidad >= cantidad
  );

  if (!receptorAsignado) {
    return res.status(404).json({ error: 'No hay receptores disponibles para esta merma.' });
  }

  mermas.push({ hotelId, tipo, cantidad, receptorId: receptorAsignado.id });

  const hotel = hoteles.find((h) => h.id === hotelId);
  if (hotel) {
    hotel.ecoScore += 5;
  }

  const co2Evitado = cantidad * 0.5;

  res.status(200).json({
    mensaje: 'Éxito',
    co2Evitado,
    receptor: receptorAsignado.nombre
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
