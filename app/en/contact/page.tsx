import ContactoPage from '../../../components/routes/ContactoPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('contact', 'en');

export default function Page() {
  return <ContactoPage />;
}
