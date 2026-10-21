import { 
  HashRouter,
   Routes,
    Route,
     useLocation, 
     Link,
     } from 'react-router-dom';

import Header from './components/Header'; 
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
 import ServicesPage from './pages/ServicesPage'; 
 import GalleryPage from './pages/GalleryPage';
  import BookingPage from './pages/BookingPage';
   import LoginPage from './pages/LoginPage';

function NotFoundPage() { 
  return (
     <section> 
     <h1>Сторінку не знайдено</h1>
      <Link to="/">На головну</Link> 
      </section>
       );
       }

function AppContent() {
   const { pathname } = useLocation();
return (
   <> <Header currentPath={pathname} />

  <main key={pathname}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>

  <Footer />
</>
); 
}
export default function App() {
   return (
     <HashRouter> 
      <AppContent />
       </HashRouter>
        );
       }