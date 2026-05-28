import ProgramasPage from '../../components/routes/ProgramasPage';
import SiteShell from '../../components/SiteShell';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('programs', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <ProgramasPage />
    </SiteShell>
  );
}
