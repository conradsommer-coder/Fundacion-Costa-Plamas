import DonarPage from '../../../components/routes/DonarPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('donate', 'es');

export default function Page() {
  return <DonarPage />;
}
