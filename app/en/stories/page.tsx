import HistoriasPage from '../../../components/routes/HistoriasPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('stories', 'en');

export default function Page() {
  return <HistoriasPage />;
}
