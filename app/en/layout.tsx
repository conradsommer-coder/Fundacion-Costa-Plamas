import type { ReactNode } from 'react';
import SiteShell from '../../components/SiteShell';

export default function EnglishLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SiteShell initialLanguage="en">{children}</SiteShell>;
}
