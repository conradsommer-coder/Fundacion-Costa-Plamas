import HomePage from '../../components/routes/HomePage';
import { buildPageMetadata } from '../../src/seo/metadata';

export const metadata = buildPageMetadata('home', 'en');

export default function Page() {
  return <HomePage />;
}
