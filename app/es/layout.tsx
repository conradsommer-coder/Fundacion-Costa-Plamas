import type { ReactNode } from 'react';
import SiteShell from '../../components/SiteShell';

export default function SpanishLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SiteShell initialLanguage="es">{children}</SiteShell>;
}
