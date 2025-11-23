<template>
  <div class="not-found-page">
    <h1>404</h1>
    <h2>Página no encontrada</h2>
    <p>
      La ruta que intentas acceder no existe. Verifica la URL o vuelve al
      catálogo principal.
    </p>

    <router-link to="/" class="btn btn-primary">
      Ir al inicio
    </router-link>
  </div>
</template>

<script setup>
// Vista simple para manejar rutas no encontradas
</script>

<style scoped>
.not-found-page {
  max-width: 600px;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
}

.not-found-page h1 {
  font-size: 4rem;
  margin: 0;
}

.not-found-page h2 {
  margin: 0.5rem 0 1rem;
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
