import ContactoPage from '../../components/routes/ContactoPage';
import SiteShell from '../../components/SiteShell';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('contact', 'es');

export default function Page() {
  return (
    <SiteShell initialLanguage="es">
      <ContactoPage />
    </SiteShell>
  );
}
