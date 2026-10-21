import { Link } from 'react-router-dom'; 
import styles from '../App.module.css';

const links = [
   ['/', 'Головна'],
    ['/services', 'Послуги'],
     ['/gallery', 'Галерея'], 
     ['/booking', 'Запис'],
      ['/login', 'Вхід'],
     ];

function Header({ currentPath = '/' }) {
   return (
     <header className={styles.header}>
       <Link to="/" className={styles.logo}>
        Nails by Valeriia
         </Link>

  <nav
    className={styles.nav}
    aria-label="Основна навігація"
  >
    {links.map(([path, title]) => (
      <Link
        key={path}
        to={path}
        aria-current={currentPath === path ? 'page' : undefined}
      >
        {title}
      </Link>
    ))}
  </nav>
</header>
); 
}

export default Header;