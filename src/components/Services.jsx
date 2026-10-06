import styles from '../App.module.css';
function Services() {
  return (
    <section id="services" className={styles['services']}>
      <h2>Послуги</h2>

      <div className={styles['services-list']}>
        <article className={styles['service-card']}>
          <h3>Манікюр</h3>
          <p>Акуратний та доглянутий вигляд ваших нігтів.</p>
        </article>

        <article className={styles['service-card']}>
          <h3>Укріплення нігтів</h3>
          <p>Зміцнення натуральних нігтів для міцності та комфорту.</p>
        </article>

        <article className={styles['service-card']}>
          <h3>Нарощення</h3>
          <p>Створення бажаної довжини та форми нігтів.</p>
        </article>
      </div>
    </section>
  );
}

export default Services;
