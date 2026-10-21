import styles from '../App.module.css';
function Hero() {
  return (
    <section id="home" className={styles['hero']}>
      <div className={styles['hero-content']}>
        <h1>Краса починається з деталей</h1>
        <p>
          Доглянуті нігті — це маленька деталь, яка створює великий настрій.
          Обери свій ідеальний манікюр.
        </p>
        <a href="#/booking" className={styles['hero-button']}>
          Записатися онлайн
        </a>
      </div>
    </section>
  );
}

export default Hero;
