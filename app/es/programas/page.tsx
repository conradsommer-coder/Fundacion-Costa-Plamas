import ProgramasPage from '../../../components/routes/ProgramasPage';
import { buildPageMetadata } from '../../../src/seo/metadata';

export const metadata = buildPageMetadata('programs', 'es');

export default function Page() {
  return <ProgramasPage />;
}
