// models/Producto.js
const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [150, 'El nombre no puede superar 150 caracteres'],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede superar 500 caracteres'],
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock debe ser mayor o igual a 0'],
      default: 0,
    },
    imagenUrl: {
      type: String,
      trim: true,
      default: '',
    },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: [true, 'La categoría es obligatoria'],
    },
  },
  {
    timestamps: true, // createdAt / updatedAt como en Categoria
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        return ret
      },
    },
  },
)

// Índice similar al de categoría, ordenando por fecha de creación descendente
productoSchema.index({ createdAt: -1 }, { name: 'idx_productos_created_desc' })

const Producto = mongoose.model('Producto', productoSchema)
module.exports = Producto
