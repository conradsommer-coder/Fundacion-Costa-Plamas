import ProgramasPage from '../../../components/routes/ProgramasPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('programs', 'en');

export default function Page() {
  return <ProgramasPage />;
}
