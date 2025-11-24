const mongoose = require('mongoose');
require('dotenv').config();

const Producto = require('./src/models/Producto');
const Categoria = require('./src/models/Categoria');
const MONGO_URI = 'mongodb://127.0.0.1:27017/mercapp';

async function runSeed() {
  try {
    console.log('🌱 Conectando a MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('🧹 Limpiando colecciones...');
    await Promise.all([
      Producto.deleteMany({}),
      Categoria.deleteMany({})
    ]);

    console.log('📦 Creando categorías...');
    const categorias = await Categoria.insertMany([
      { nombre: 'Electrodomésticos' },
      { nombre: 'Hogar' },
      { nombre: 'Juguetes' },
      { nombre: 'Ropa' },
      { nombre: 'Tecnología' }
    ]);

    console.log('📦 Categorías creadas:', categorias.length);

    // Obtener IDs REALES
    const [electro, hogar, juguetes, ropa, tecno] = categorias.map(c => c._id);

    console.log('🛒 Creando productos...');

    const productos = [
      {
        nombre: 'Licuadora compacta',
        descripcion: 'Licuadora de 3 velocidades, vaso de vidrio.',
        precio: 49.99,
        imagenUrl: 'https://store.projects.ec/media/uploaded_images/CUI-CPB3001.jpg.360x360_q85_box-0%2C0%2C1000%2C1000_crop_detail.jpg',
        stock: 10,
        categoriaId: electro,
      },
      {
        nombre: 'Plancha de vapor',
        descripcion: 'Plancha a vapor con sistema antigoteo.',
        precio: 39.5,
        imagenUrl: 'https://web-pro-resources.s3.us-east-2.amazonaws.com/public/optimized-resources/product/c99ed174-8744-4683-85e9-404f5c15c6fb/image/planchavaporizador-manual-propa-1875w-200ml-blanconegro-caccesorios-600x600.jpg',
        stock: 15,
        categoriaId: electro,
      },
      {
        nombre: 'Juego de sábanas queen',
        descripcion: 'Sábanas de algodón suave.',
        precio: 35.0,
        imagenUrl: 'https://m.media-amazon.com/images/I/81+R-0hQICL._AC_SY300_SX300_QL70_FMwebp_.jpg',
        stock: 20,
        categoriaId: hogar,
      },
      {
        nombre: 'Almohada ergonómica',
        descripcion: 'Almohada viscoelástica.',
        precio: 22.75,
        imagenUrl: 'https://img-1.kwcdn.com/product/open/329125b6f2a8417ea0ef9b18535b7ae2-goods.jpeg?imageView2/2/w/1300/q/80/format/avif',
        stock: 30,
        categoriaId: hogar,
      },
      {
        nombre: 'Robot de construcción',
        descripcion: 'Set de bloques para armar robot.',
        precio: 29.99,
        imagenUrl: 'https://lego.latamelite.com/cdn/shop/products/31062_1b6ebae4-26e3-4ec4-8fdc-064ad2d65603_712x712.jpg?v=1597086751',
        stock: 25,
        categoriaId: juguetes,
      },
      {
        nombre: 'Muñeca articulada',
        descripcion: 'Muñeca con accesorios.',
        precio: 19.99,
        imagenUrl: 'https://tienda.videooca.com/170355-superlarge_default/barbie-movimiento-sin-limites-muneca-articulada-rubia.jpg',
        stock: 18,
        categoriaId: juguetes,
      },
      {
        nombre: 'Camiseta básica unisex',
        descripcion: 'Camiseta de algodón.',
        precio: 12.5,
        imagenUrl: 'https://m.media-amazon.com/images/I/61sycpzr5pL._AC_SX679_.jpg',
        stock: 40,
        categoriaId: ropa,
      },
      {
        nombre: 'Pantalón deportivo',
        descripcion: 'Pantalón cómodo.',
        precio: 24.99,
        imagenUrl: 'https://m.media-amazon.com/images/I/41bu223ZAwL._AC_SL500_.jpg',
        stock: 22,
        categoriaId: ropa,
      },
      {
        nombre: 'Auriculares inalámbricos',
        descripcion: 'Bluetooth con estuche.',
        precio: 59.99,
        imagenUrl: 'https://maxitec.vtexassets.com/arquivos/ids/202580-800-800?v=638563506580670000&width=800&height=800&aspect=true',
        stock: 12,
        categoriaId: tecno,
      },
      {
        nombre: 'Mouse óptico USB',
        descripcion: 'Alta precisión.',
        precio: 14.99,
        imagenUrl: 'https://lavictoria.ec/wp-content/uploads/2023/01/MOUSE-OPTICO-GENIUS-MICRO-TRAVELER-BLACK-MINI-1-600x600.jpg',
        stock: 35,
        categoriaId: tecno,
      }
    ];

    await Producto.insertMany(productos);

    console.log('🌱 Semilla creada con éxito');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la semilla:', error);
    process.exit(1);
  }
}

runSeed();
