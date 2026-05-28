import HistoriaDetailPage from '../../../components/routes/HistoriaDetailPage';
import SiteShell from '../../../components/SiteShell';
import { buildStoryMetadata, getStoryStaticParams } from '../../../src/seo/metadata';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStoryStaticParams('es');
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return buildStoryMetadata('es', id);
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <SiteShell initialLanguage="es">
      <HistoriaDetailPage storySlug={id} />
    </SiteShell>
  );
}
