import DonarPage from '../../components/routes/DonarPage';
import SiteShell from '../../components/SiteShell';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('donate', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <DonarPage />
    </SiteShell>
  );
}
