const express = require('express');
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

const router = express.Router();

// GET /api/producto - listar productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoriaId').sort({ nombre: 1 });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// GET /api/producto/:id - obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    console.log("producto a buscar " + req.params.id);
    const producto = await Producto.findById(req.params.id).populate('categoriaId');
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
});

// POST /api/producto - crear producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagenUrl, stock, categoriaId } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    if (!descripcion || !descripcion.trim()) {
      return res.status(400).json({ mensaje: 'La descripción es obligatoria' });
    }

    if (precio === undefined || isNaN(precio)) {
      return res.status(400).json({ mensaje: 'El precio es obligatorio y debe ser válido' });
    }

    if (stock === undefined || isNaN(stock)) {
      return res.status(400).json({ mensaje: 'El stock es obligatorio y debe ser válido' });
    }

    if (!categoriaId) {
      return res.status(400).json({ mensaje: 'La categoría es obligatoria' });
    }

    // Verificar categoría existente
    const existeCategoria = await Categoria.findById(categoriaId);
    if (!existeCategoria) {
      return res.status(400).json({ mensaje: 'La categoría no existe' });
    }

    const nuevo = new Producto({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      imagenUrl: imagenUrl || '',
      stock,
      categoriaId,
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
});

// PUT /api/producto/:id - actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagenUrl, stock, categoriaId } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    if (!descripcion || !descripcion.trim()) {
      return res.status(400).json({ mensaje: 'La descripción es obligatoria' });
    }

    if (precio === undefined || isNaN(precio)) {
      return res.status(400).json({ mensaje: 'El precio es obligatorio y debe ser válido' });
    }

    if (stock === undefined || isNaN(stock)) {
      return res.status(400).json({ mensaje: 'El stock es obligatorio y debe ser válido' });
    }

    if (!categoriaId) {
      return res.status(400).json({ mensaje: 'La categoría es obligatoria' });
    }

    const existeCategoria = await Categoria.findById(categoriaId);
    if (!existeCategoria) {
      return res.status(400).json({ mensaje: 'La categoría no existe' });
    }

    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio,
        imagenUrl: imagenUrl || '',
        stock,
        categoriaId,
      },
      { new: true, runValidators: true }
    );

    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
});

// DELETE /api/producto/:id - eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
});

module.exports = router;
