import styles from '../App.module.css';
export default function LoginPage() {
  return (
    <section className={styles.auth}>
      <h1>Вхід до кабінету</h1>
      <p className={styles.notice}>Макет форми: авторизація поки недоступна.</p>
      <form className={styles['booking-form']}>
        <label>Електронна пошта<input type="email" name="email" autoComplete="username" placeholder="example@email.com" /></label>
        <label>Пароль<input type="password" name="password" autoComplete="current-password" placeholder="Введіть пароль" /></label>
        <button type="button" disabled>Увійти</button>
      </form>
    </section>
  );
}
