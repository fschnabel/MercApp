require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const categoriasRouter = require('./routes/categoria.rutas');
const productosRouter = require('./routes/producto.rutas');

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const allowedOrigins = (process.env.FRONTEND_URL || '').split(',');

app.use(
  cors({
    origin: (origin, callback) => {
      // Peticiones sin origin (por ejemplo Postman) se permiten
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido por CORS: ' + origin), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API MercApp funcionando' })
})

app.use('/api/producto', productosRouter)

app.use('/api/categoria', categoriasRouter)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Recurso no encontrado',
    path: req.originalUrl,
  })
})

app.use((err, req, res, next) => {
  console.error('Error en la API:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Error de validación',
      errors: err.errors,
    })
  }

  res.status(500).json({
    message: 'Error interno del servidor',
  })
})


app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});