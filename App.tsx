
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import DonarPage from './pages/DonarPage';
import ContactoPage from './pages/ContactoPage';
import ProgramasPage from './pages/ProgramasPage';
import HistoriasPage from './pages/HistoriasPage';
import HistoriaDetailPage from './pages/HistoriaDetailPage';
import Seo from './src/seo/Seo';
import LanguageRouteSync from './src/i18n/LanguageRouteSync';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Re-trigger Fundraise Up widgets on page change
    if ((window as any).FundraiseUp) {
      try {
        (window as any).FundraiseUp.on('mount', () => {
          // Widgets are ready
        });
        // This helps the widget detect the new route in an SPA
        (window as any).FundraiseUp.set('h', window.location.href);
      } catch (e) {
        console.warn('FundraiseUp trigger failed', e);
      }
    }
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <LanguageRouteSync />
      <Seo />
      <div className="min-h-screen flex flex-col">
        <Navbar scrolled={scrolled} />
        
        <Routes>
          <Route path="/es" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/es/nosotros" element={<NosotrosPage />} />
          <Route path="/en/about" element={<NosotrosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />

          <Route path="/es/donar" element={<DonarPage />} />
          <Route path="/en/donate" element={<DonarPage />} />
          <Route path="/donar" element={<DonarPage />} />

          <Route path="/es/contacto" element={<ContactoPage />} />
          <Route path="/en/contact" element={<ContactoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />

          <Route path="/es/programas" element={<ProgramasPage />} />
          <Route path="/en/programs" element={<ProgramasPage />} />
          <Route path="/programas" element={<ProgramasPage />} />

          <Route path="/es/historias" element={<HistoriasPage />} />
          <Route path="/en/stories" element={<HistoriasPage />} />
          <Route path="/historias" element={<HistoriasPage />} />

          <Route path="/es/historias/:id" element={<HistoriaDetailPage />} />
          <Route path="/en/stories/:id" element={<HistoriaDetailPage />} />
          <Route path="/historias/:id" element={<HistoriaDetailPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
