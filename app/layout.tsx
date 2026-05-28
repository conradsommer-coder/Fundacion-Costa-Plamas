import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import '../src/index.css';
import { buildPageMetadata, getSiteUrlObject } from '../src/seo/metadata';

export const metadata: Metadata = {
  ...buildPageMetadata('home', 'es'),
  metadataBase: getSiteUrlObject(),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <Script id="route-language-sync" strategy="beforeInteractive">
          {`document.documentElement.lang=window.location.pathname.split('/')[1]==='en'?'en':'es';`}
        </Script>
        {children}
        <Script id="fundraise-up-widget" strategy="afterInteractive">
          {`(function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'
.split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
:function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a+'';
t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=5;o.h=w.location.href;o.l=[];
for(i=0;i<8;i++)o[l[i]]=o(l[i]);w[n]=o}
})(window,document,'script','FundraiseUp','AZCLFTCH');`}
        </Script>
      </body>
    </html>
  );
}
