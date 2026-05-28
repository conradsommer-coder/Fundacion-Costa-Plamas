import HomePage from '../components/routes/HomePage';
import SiteShell from '../components/SiteShell';
import { buildPageMetadata } from '../src/seo/metadata';

export const metadata = buildPageMetadata('home', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <HomePage />
    </SiteShell>
  );
}
