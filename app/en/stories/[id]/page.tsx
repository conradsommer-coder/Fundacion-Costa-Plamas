import HistoriaDetailPage from '../../../../components/routes/HistoriaDetailPage';
import { buildStoryMetadata, getStoryStaticParams } from '../../../../src/seo/metadata';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStoryStaticParams('en');
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return buildStoryMetadata('en', id);
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <HistoriaDetailPage storySlug={id} />;
}
