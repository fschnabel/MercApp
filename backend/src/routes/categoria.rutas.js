// routes/categoria-rutas.js
const express = require('express')
const Categoria = require('../models/Categoria')

const router = express.Router()

// GET /api/categorias - listar categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 })
    res.json(categorias)
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    res.status(500).json({ mensaje: 'Error al obtener categorías' })
  }
})

// GET /api/categorias/:id - obtener categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id)
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' })
    }
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la categoría' })
  }
})

// POST /api/categorias - crear categoría
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body

    if (!nombre || !nombre.trim()) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre de la categoría es obligatorio' })
    }

    const nueva = new Categoria({ nombre: nombre.trim() })
    const guardada = await nueva.save()

    res.status(201).json(guardada)
  } catch (error) {
    console.error('Error al crear categoría:', error)

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: 'Ya existe una categoría con ese nombre' })
    }

    res.status(500).json({ mensaje: 'Error al crear la categoría' })
  }
})

// PUT /api/categorias/:id - actualizar categoría
router.put('/:id', async (req, res) => {
  try {
    const { nombre } = req.body

    if (!nombre || !nombre.trim()) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre es obligatorio' })
    }

    const actualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre: nombre.trim() },
      { new: true, runValidators: true }
    )

    if (!actualizada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' })
    }

    res.json(actualizada)
  } catch (error) {
    console.error('Error al actualizar categoría:', error)

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: 'Ya existe otra categoría con ese nombre' })
    }

    res.status(500).json({ mensaje: 'Error al actualizar la categoría' })
  }
})

// DELETE /api/categorias/:id - eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Categoria.findByIdAndDelete(req.params.id)
    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' })
    }
    res.json({ mensaje: 'Categoría eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' })
  }
})

module.exports = router
