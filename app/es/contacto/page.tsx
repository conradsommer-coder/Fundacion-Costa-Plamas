import ContactoPage from '../../../components/routes/ContactoPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('contact', 'es');

export default function Page() {
  return <ContactoPage />;
}
