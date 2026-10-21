import styles from '../App.module.css';
function Contacts() {
  return (
    <section id="contacts" className={styles['contacts']}>
      <h2>Контакти</h2>
      <div className={styles['contacts-info']}>
        <p>Телефон: 097 403 27 58</p>
        <p>Viber / Telegram</p>
        <p>Instagram: Nails by Valeriia</p>
      </div>
    </section>
  );
}

export default Contacts;
