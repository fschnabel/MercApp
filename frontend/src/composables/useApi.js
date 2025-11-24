import { ref } from 'vue';

export function useApi() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Guardamos el AbortController actual para poder cancelar
  const currentController = ref(null);

  /**
   * request(url, options)
   *
   * options acepta TODO lo de fetch (method, headers, body, etc.)
   * y además:
   *   - retries: número de reintentos si falla (por defecto 0)
   *   - retryDelay: milisegundos entre reintentos (por defecto 500)
   */
  async function request(url, options = {}) {
    const {
      retries = 0,
      retryDelay = 500,
      ...fetchOptions
    } = options;

    // Si había una petición anterior, la cancelamos
    if (currentController.value) {
      currentController.value.abort();
    }

    const controller = new AbortController();
    currentController.value = controller;

    // Si el caller no envió signal, usamos la nuestra
    if (!fetchOptions.signal) {
      fetchOptions.signal = controller.signal;
    }

    loading.value = true;
    error.value = null;

    let attempt = 0;

    // Bucle de reintentos
    // 1 intento normal + N reintentos adicionales (retries)
    // Ej: retries = 2 -> hasta 3 intentos en total
    while (true) {
      try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          // Intentamos sacar un mensaje amigable del backend
          let message = `Error HTTP ${response.status}`;
          try {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const body = await response.json();
              message = body.mensaje || body.message || message;
            }
          } catch {
            // ignoramos errores al parsear el JSON
          }
          throw new Error(message);
        }

        // Asumimos JSON en tus APIs
        const json = await response.json();
        data.value = json;

        loading.value = false;
        return json;
      } catch (err) {
        // Si la petición fue cancelada, no tiene sentido reintentar
        if (err.name === 'AbortError') {
          loading.value = false;
          error.value = new Error('Solicitud cancelada');
          throw err;
        }

        // Si aún quedan reintentos, esperamos y volvemos a intentar
        if (attempt < retries) {
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }

        // Sin reintentos disponibles: propagamos el error
        loading.value = false;
        error.value = err;
        throw err;
      }
    }
  }

  /**
   * Cancela la petición actual (si existe)
   */
  function cancel() {
    if (currentController.value) {
      currentController.value.abort();
      currentController.value = null;
    }
  }

  return {
    data,
    loading,
    error,
    request,
    cancel,
  };
}
