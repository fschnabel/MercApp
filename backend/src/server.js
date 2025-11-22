// server.js
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

// Rutas
const categoriasRouter = require('./routes/categoria.rutas.js')
const productosRouter = require('./routes/categoria.rutas.js')

const app = express()

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/miinventario'

mongoose
  .connect(mongoUri)
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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`)
})
