import { useRef, useState } from 'react';
export default function useBooking() {
     const [booking, setBooking] = useState(null); 
     
     const [loading, setLoading] = useState(false);
      const [error, setError] = useState(''); 
      const submitting = useRef(false);
async function createBooking(values) { if (submitting.current) return null;
submitting.current = true;
setLoading(true);
setError('');
setBooking(null);

try {
  const token = sessionStorage.getItem('nails-auth-token');

  if (!token) {
    throw new Error('Спочатку увійдіть у свій кабінет.');
  }

  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (response.status === 401) {
    sessionStorage.removeItem('nails-auth-token');
    throw new Error('Сеанс завершився. Увійдіть повторно.');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Не вдалося створити запис.');
  }

  setBooking(data);
  return data;
} catch (err) {
  setError(err.message || 'Помилка з’єднання із сервером.');
  return null;
} finally {
  submitting.current = false;
  setLoading(false);
}
}
return { booking, loading, error, createBooking }; 
}