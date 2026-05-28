import NosotrosPage from '../../components/routes/NosotrosPage';
import SiteShell from '../../components/SiteShell';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('about', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <NosotrosPage />
    </SiteShell>
  );
}
