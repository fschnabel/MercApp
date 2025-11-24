<template>
  <div class="product-form-page">
    <h1 class="title">
      {{ esCreacion ? 'Crear producto' : 'Editar producto' }}
    </h1>

    <!-- Estados de carga/errores generales -->
    <div v-if="cargandoGlobal" class="state">
      Cargando información...
    </div>

    <div v-else>
      <div v-if="errorGeneral" class="state state-error">
        {{ errorGeneral }}
      </div>

      <!-- Formulario -->
      <form class="product-form" @submit.prevent="guardarProducto">
        <!-- Nombre -->
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model.trim="nombre"
            type="text"
            placeholder="Ej: Manzana Roja"
          />
          <p v-if="errores.nombre" class="error-msg">{{ errores.nombre }}</p>
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model.trim="descripcion"
            rows="3"
            placeholder="Descripción corta del producto"
          ></textarea>
          <p v-if="errores.descripcion" class="error-msg">
            {{ errores.descripcion }}
          </p>
        </div>

        <!-- Precio -->
        <div class="form-row">
          <div class="form-group">
            <label for="precio">Precio ($)</label>
            <input
              id="precio"
              v-model.number="precio"
              type="number"
              min="0"
              step="0.01"
            />
            <p v-if="errores.precio" class="error-msg">
              {{ errores.precio }}
            </p>
          </div>

          <!-- Stock -->
          <div class="form-group">
            <label for="stock">Stock</label>
            <input
              id="stock"
              v-model.number="stock"
              type="number"
              min="0"
              step="1"
            />
            <p v-if="errores.stock" class="error-msg">
              {{ errores.stock }}
            </p>
          </div>
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="categoria">Categoría</label>
          <select
            id="categoria"
            v-model="categoriaId"
          >
            <option value="">Seleccione una categoría</option>
            <option
              v-for="cat in categorias"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.nombre }}
            </option>
          </select>
          <p v-if="errores.categoriaId" class="error-msg">
            {{ errores.categoriaId }}
          </p>
          <p v-if="errorCategorias" class="error-msg">
            Error al cargar categorías: {{ errorCategorias.message || errorCategorias }}
          </p>
        </div>

        <!-- URL de imagen -->
        <div class="form-group">
          <label for="imagenUrl">URL de imagen</label>
          <input
            id="imagenUrl"
            v-model.trim="imagenUrl"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <p v-if="errores.imagenUrl" class="error-msg">
            {{ errores.imagenUrl }}
          </p>
        </div>

        <!-- Vista previa simple de la imagen -->
        <div v-if="imagenUrl" class="image-preview">
          <p>Vista previa:</p>
          <img :src="imagenUrl" alt="Vista previa" />
        </div>

        <!-- Botones -->
        <div class="form-actions">
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="guardando"
          >
            {{ guardando ? 'Guardando...' : (esCreacion ? 'Crear producto' : 'Guardar cambios') }}
          </button>

          <button
            class="btn btn-secondary"
            type="button"
            @click="volverAlListado"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/composables/useApi';

const route = useRoute();
const router = useRouter();

// Modo de la pantalla
const esCreacion = computed(() => route.name === 'product-new');
const esEdicion = computed(() => route.name === 'product-edit');

// Estado general
const cargandoGlobal = ref(true);
const guardando = ref(false);
const errorGeneral = ref(null);

// Campos del formulario
const nombre = ref('');
const descripcion = ref('');
const precio = ref(0);
const stock = ref(0);
const categoriaId = ref('');
const imagenUrl = ref('');

// Errores de validación de formulario
const errores = ref({});

// Categorías desde la API
const {
  data: categoriasData,
  loading: cargandoCategorias,
  error: errorCategorias,
  request: requestCategorias,
} = useApi();

const categorias = computed(() => categoriasData.value || []);

// --- Validación del formulario ---
function validarFormulario() {
  const e = {};

  if (!nombre.value.trim()) {
    e.nombre = 'El nombre es obligatorio';
  }

  if (!descripcion.value.trim()) {
    e.descripcion = 'La descripción es obligatoria';
  }

  if (precio.value === null || precio.value === '' || Number(precio.value) <= 0) {
    e.precio = 'El precio debe ser mayor a 0';
  }

  if (stock.value === null || stock.value === '' || Number(stock.value) < 0) {
    e.stock = 'El stock no puede ser negativo';
  }

  if (!categoriaId.value) {
    e.categoriaId = 'Debe seleccionar una categoría';
  }

  if (imagenUrl.value) {
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(imagenUrl.value)) {
      e.imagenUrl = 'Debe ingresar una URL válida (http o https)';
    }
  }

  errores.value = e;
  return Object.keys(e).length === 0;
}

// --- Cargar categorías ---
async function cargarCategorias() {
  try {
    await requestCategorias('/api/categoria');
  } catch (err) {
    console.error('Error cargando categorías', err);
  }
}

// --- Cargar datos del producto en modo edición ---
async function cargarProducto() {
  if (!esEdicion.value) return;

  const id = route.params.id;
  if (!id) {
    errorGeneral.value = 'ID de producto no proporcionado.';
    return;
  }

  try {
    const resp = await fetch(`/api/producto/${id}`);
    if (!resp.ok) {
      throw new Error('No se pudo cargar el producto');
    }
    const data = await resp.json();

    // Rellenar campos
    nombre.value = data.nombre ?? '';
    descripcion.value = data.descripcion ?? '';
    precio.value = data.precio ?? 0;
    stock.value = data.stock ?? 0;

    // 👇 Aquí nos aseguramos de guardar SOLO el id de la categoría
    if (data.categoriaId) {
      if (typeof data.categoriaId === 'string') {
        // Caso sin populate
        categoriaId.value = data.categoriaId;
      } else {
        // Caso con populate: objeto { _id, nombre, ... }
        categoriaId.value = data.categoriaId._id || data.categoriaId.id || '';
      }
    } else {
      categoriaId.value = '';
    }

    imagenUrl.value = data.imagenUrl ?? '';
  } catch (err) {
    console.error(err);
    errorGeneral.value = err.message || 'Error desconocido al cargar el producto';
  }
}

// --- Guardar (crear o actualizar) ---
async function guardarProducto() {
  if (!validarFormulario()) {
    return;
  }

  guardando.value = true;
  errorGeneral.value = null;

  const payload = {
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    precio: Number(precio.value),
    stock: Number(stock.value),
    categoriaId: categoriaId.value,
    imagenUrl: imagenUrl.value.trim(),
  };

  try {
    const esEdit = esEdicion.value;
    const url = esEdit
      ? `/api/producto/${route.params.id}`
      : '/api/producto';

    const metodo = esEdit ? 'PUT' : 'POST';

    const resp = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      let mensaje = 'Ocurrió un error al guardar el producto';
      try {
        const body = await resp.json();
        mensaje = body.mensaje || body.message || mensaje;
      } catch (_) {
        // ignorar error parseando json
      }
      throw new Error(mensaje);
    }

    window.alert('Producto guardado correctamente ✔');
    router.push('/');
  } catch (err) {
    console.error(err);
    errorGeneral.value = err.message || 'Error desconocido al guardar';
  } finally {
    guardando.value = false;
  }
}

// --- Volver al listado ---
function volverAlListado() {
  router.push('/');
}

// --- Ciclo de vida ---
onMounted(async () => {
  try {
    await Promise.all([cargarCategorias(), cargarProducto()]);
  } finally {
    cargandoGlobal.value = false;
  }
});
</script>

<style scoped>
.product-form-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.state {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.state-error {
  background: #ffe5e5;
  color: #b71c1c;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  font-weight: 600;
}

input,
textarea,
select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font: inherit;
}

.error-msg {
  font-size: 0.85rem;
  color: #b71c1c;
}

.image-preview {
  margin-top: 0.5rem;
}

.image-preview img {
  max-width: 200px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #1976d2;
  color: white;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: default;
}

.btn-secondary {
  background: #e0e0e0;
}
</style>
