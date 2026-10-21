import { Link } from 'react-router-dom'; 
import styles from '../App.module.css'; 
import useAuth from '../hooks/useAuth';
export default function LoginPage() {
   const { user, loading, error, login, logout } = useAuth();
async function handleSubmit(event) { event.preventDefault();
const formData = new FormData(event.currentTarget);

await login(
  String(formData.get('email')).trim(),
  String(formData.get('password')),
);
}
return ( <section className={styles.auth}>
   <h1>Вхід до кабінету</h1>
  {error && <p role="alert">{error}</p>}

  {user ? (
    <div className={styles['booking-form']}>
      <p role="status">
        Ви увійшли як {user.name}.
      </p>

      <p>{user.email}</p>

      <Link to="/booking">Перейти до запису</Link>

      <button
        type="button"
        onClick={logout}
        disabled={loading}
      >
        {loading ? 'Зачекайте...' : 'Вийти'}
      </button>
    </div>
  ) : (
    <>
      <p className={styles.notice}>
        Тестовий вхід: demo@example.com
        <br />
        Пароль: Demo123!
      </p>

      <form
        className={styles['booking-form']}
        onSubmit={handleSubmit}
      >
        <label>
          Електронна пошта
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="demo@example.com"
            required
            disabled={loading}
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Введіть пароль"
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Зачекайте...' : 'Увійти'}
        </button>
      </form>
    </>
  )}
</section>
);
 }