import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ETNA | 艺术涂料',
    template: '%s | ETNA',
  },
  description: '艺术涂料品牌，源自自然归于本真',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-neutral-100 text-neutral-700 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
