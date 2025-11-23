<template>
  <div class="about-page">
    <h1>Acerca de MercApp</h1>

    <p>
      MercApp es una aplicación web de una sola página (SPA) desarrollada con
      <strong>Vue 3</strong> y <strong>Vite</strong>, como parte de la Unidad 3
      de la materia de <em>Aplicaciones Web</em>.
    </p>

    <p>
      El objetivo es gestionar un catálogo de productos con búsqueda, filtros
      por categoría y un carrito de compras simple, consumiendo un
      <strong>API REST</strong> creado en Node.js/Express.
    </p>

    <ul>
      <li>Listado de productos con buscador y filtro por categoría.</li>
      <li>Detalle de producto con información ampliada.</li>
      <li>Carrito en memoria con persistencia en localStorage.</li>
      <li>Vistas con carga perezosa (lazy loading) y manejo de rutas.</li>
    </ul>

    <p class="student">
      Estudiante: <strong>[Tu Nombre Aquí]</strong><br />
      Universidad Politécnica Salesiana
    </p>

    <router-link to="/" class="btn btn-primary">
      Volver al catálogo
    </router-link>
  </div>
</template>

<script setup>
// Solo contenido estático, no se requiere lógica en el script de momento.
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.about-page h1 {
  margin-bottom: 1rem;
}

.about-page p {
  margin-bottom: 0.75rem;
}

.about-page ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.student {
  margin-top: 1rem;
  font-style: italic;
}

.btn {
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background-color: #1976d2;
  color: #fff;
}
</style>
