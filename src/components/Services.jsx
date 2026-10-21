import styles from '../App.module.css';
 import useServices from '../hooks/useServices';

const descriptions = {
   manicure: 'Акуратний та доглянутий вигляд ваших нігтів.',
    strengthening: 'Зміцнення натуральних нігтів для міцності та комфорту.',
     extensions: 'Створення бажаної довжини та форми нігтів.', 
    };

function Services() { 
  const { services, loading, error } = useServices();

return (
   <section id="services" className={styles.services}>
     <h2>Послуги</h2>

  {loading && <p role="status">Завантаження послуг...</p>}

  {error && <p role="alert">{error}</p>}

  {!loading && !error && services.length === 0 && (
    <p>Наразі немає доступних послуг.</p>
  )}

  {!loading && !error && (
    <div className={styles['services-list']}>
      {services.map((service) => (
        <article
          key={service.id}
          className={styles['service-card']}
        >
          <h3>{service.name}</h3>
          <p>{descriptions[service.id]}</p>
          <p>
            <strong>{service.price} грн</strong>
          </p>
        </article>
      ))}
    </div>
  )}
</section>
);
 }
export default Services;