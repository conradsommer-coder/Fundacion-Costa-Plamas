import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import NosotrosPage from '../pages/NosotrosPage';
import DonarPage from '../pages/DonarPage';
import ContactoPage from '../pages/ContactoPage';
import ProgramasPage from '../pages/ProgramasPage';
import HistoriasPage from '../pages/HistoriasPage';
import HistoriaDetailPage from '../pages/HistoriaDetailPage';
import es from '../src/i18n/resources/es';
import en from '../src/i18n/resources/en';
import type { SeoLanguage } from '../src/seo/routeMetadata';

interface RenderRouteOptions {
  path: string;
  language: SeoLanguage;
}

const createPrerenderI18n = async (language: SeoLanguage) => {
  const instance = createInstance();

  await instance.init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: language,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return instance;
};

export const renderRoute = async ({ path, language }: RenderRouteOptions) => {
  const i18n = await createPrerenderI18n(language);

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <div className="min-h-screen flex flex-col">
          <Navbar scrolled={path !== '/'} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/es" element={<HomePage />} />
            <Route path="/en" element={<HomePage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/es/nosotros" element={<NosotrosPage />} />
            <Route path="/en/about" element={<NosotrosPage />} />
            <Route path="/programas" element={<ProgramasPage />} />
            <Route path="/es/programas" element={<ProgramasPage />} />
            <Route path="/en/programs" element={<ProgramasPage />} />
            <Route path="/historias" element={<HistoriasPage />} />
            <Route path="/es/historias" element={<HistoriasPage />} />
            <Route path="/en/stories" element={<HistoriasPage />} />
            <Route path="/donar" element={<DonarPage />} />
            <Route path="/es/donar" element={<DonarPage />} />
            <Route path="/en/donate" element={<DonarPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/es/contacto" element={<ContactoPage />} />
            <Route path="/en/contact" element={<ContactoPage />} />
            <Route path="/historias/:id" element={<HistoriaDetailPage />} />
            <Route path="/es/historias/:id" element={<HistoriaDetailPage />} />
            <Route path="/en/stories/:id" element={<HistoriaDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </MemoryRouter>
    </I18nextProvider>,
  );
};
