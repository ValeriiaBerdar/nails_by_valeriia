import { useSyncExternalStore } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
const pages = { '/': HomePage, '/services': ServicesPage, '/gallery': GalleryPage, '/booking': BookingPage, '/login': LoginPage };
function subscribe(listener) {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}
function getPath() { return window.location.hash.slice(1) || '/'; }
function NotFoundPage() { return <section><h1>Сторінку не знайдено</h1><a href="#/">На головну</a></section>; }
export default function App() {
  const path = useSyncExternalStore(subscribe, getPath, () => '/');
  const Page = pages[path] || NotFoundPage;
  return <><Header currentPath={path} /><main key={path}><Page /></main><Footer /></>;
}
