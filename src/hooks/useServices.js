import { useEffect, useState } from 'react';
export default function useServices() { const [services, setServices] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
useEffect(() => { const controller = new AbortController();
async function loadServices() {
  try {
    const response = await fetch('/api/services', {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Не вдалося завантажити послуги.');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Сервер повернув некоректні дані.');
    }

    if (!controller.signal.aborted) {
      setServices(data);
    }
  } catch (err) {
    if (!controller.signal.aborted) {
      setError(err.message || 'Помилка з’єднання із сервером.');
    }
  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
}

loadServices();

return () => controller.abort();
}, 
[]);
return { services, loading, error };
 }