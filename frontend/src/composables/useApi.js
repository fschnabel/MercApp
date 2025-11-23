import { ref } from 'vue';

export function useApi() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function request(url, options = {}, retry = true) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.errors?.join(', ') || `Error ${res.status}`);
      }
      data.value = await res.json().catch(() => null);
    } catch (e) {
      if (retry) {
        return request(url, options, false); // un reintento
      }
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  function cancel() {
    // aquí podrías integrar AbortController si quieres ir más lejos
  }

  return { data, loading, error, request, cancel };
}
