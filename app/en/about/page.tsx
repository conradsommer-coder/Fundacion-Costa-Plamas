import NosotrosPage from '../../../components/routes/NosotrosPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('about', 'en');

export default function Page() {
  return <NosotrosPage />;
}
