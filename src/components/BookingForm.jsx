import { Link } from 'react-router-dom';
 import styles from '../App.module.css';
  import useAuth from '../hooks/useAuth';
   import useServices from '../hooks/useServices';
    import useBooking from '../hooks/useBooking';
const times = ['10:00', '12:00', '14:00', '16:00', '18:00'];
function BookingForm() { const { user, loading: authLoading, error: authError, } = useAuth();
const { services, loading: servicesLoading, error: servicesError, } = useServices();
const { booking, loading, error, createBooking } = useBooking();
const now = new Date(); const today = [ now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0'), ].join('-');
async function handleSubmit(event) { event.preventDefault();
const form = event.currentTarget;
const data = new FormData(form);

const result = await createBooking({
  serviceId: data.get('serviceId'),
  date: data.get('date'),
  time: data.get('time'),
  name: String(data.get('name')).trim(),
  phone: String(data.get('phone')).trim(),
});

if (result) {
  form.reset();
}
}
return ( <section id="booking" className={styles.booking}> <h2>Онлайн-запис</h2>
  {authLoading ? (
    <p role="status">Перевірка входу...</p>
  ) : !user ? (
    <>
      {authError && <p role="alert">{authError}</p>}
      <p>
        Для запису потрібно <Link to="/login">увійти в кабінет</Link>.
      </p>
    </>
  ) : (
    <>
      <p>Ви увійшли як {user.name}.</p>

      {servicesLoading && (
        <p role="status">Завантаження послуг...</p>
      )}

      {servicesError && <p role="alert">{servicesError}</p>}
      {error && <p role="alert">{error}</p>}

      {booking && (
        <div role="status">
          <p>
            <strong>Запис успішно створено!</strong>
          </p>
          <p>Послуга: {booking.serviceName}</p>
          <p>
            Дата: {booking.date}, час: {booking.time}
          </p>
          <p>Вартість: {booking.price} грн</p>
        </div>
      )}

      {!servicesLoading && !servicesError && services.length === 0 && (
        <p>Наразі немає доступних послуг.</p>
      )}

      {!servicesLoading && !servicesError && services.length > 0 && (
        <form
          className={styles['booking-form']}
          onSubmit={handleSubmit}
        >
          <fieldset disabled={loading}>
            <legend>Дані для запису</legend>

            <label>
              Оберіть послугу
              <select name="serviceId" required defaultValue="">
                <option value="" disabled>
                  Оберіть послугу
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — {service.price} грн
                  </option>
                ))}
              </select>
            </label>

            <label>
              Оберіть дату
              <input
                type="date"
                name="date"
                min={today}
                required
              />
            </label>

            <label>
              Оберіть час
              <select name="time" required>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Ваше ім’я
              <input
                type="text"
                name="name"
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Введіть ім’я"
                required
              />
            </label>

            <label>
              Номер телефону
              <input
                type="tel"
                name="phone"
                minLength={9}
                maxLength={20}
                autoComplete="tel"
                placeholder="+380..."
                required
              />
            </label>

            <button type="submit">
              {loading ? 'Надсилання...' : 'Підтвердити запис'}
              </button>
          </fieldset>
        </form>
      )}
    </>
  )}
</section>
); 
}
export default BookingForm;
