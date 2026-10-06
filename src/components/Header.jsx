import styles from '../App.module.css';
const links = [
  ['/', 'Головна'], ['/services', 'Послуги'], ['/gallery', 'Галерея'],
  ['/booking', 'Запис'], ['/login', 'Вхід'],
];
function Header({ currentPath = '/' }) {
  return (
    <header className={styles.header}>
      <a href="#/" className={styles.logo}>Nails by Valeriia</a>
      <nav className={styles.nav} aria-label="Основна навігація">
        {links.map(([path, title]) => (
          <a key={path} href={`#${path}`} aria-current={currentPath === path ? 'page' : undefined}>{title}</a>
        ))}
      </nav>
    </header>
  );
}
export default Header;
