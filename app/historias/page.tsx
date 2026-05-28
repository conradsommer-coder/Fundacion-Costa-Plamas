import HistoriasPage from '../../components/routes/HistoriasPage';
import SiteShell from '../../components/SiteShell';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('stories', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <HistoriasPage />
    </SiteShell>
  );
}
