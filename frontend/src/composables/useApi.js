// src/composables/useApi.js
import { ref } from 'vue';

export function useApi() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function request(url, options = {}) {
    loading.value = true;
    error.value = null;

    try {
      const resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!resp.ok) {
        throw new Error(`Error ${resp.status} al llamar ${url}`);
      }

      const json = await resp.json();
      data.value = json;
      return json;
    } catch (err) {
      console.error('[useApi] error en request', url, err);
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    loading,
    error,
    request,
  };
}
