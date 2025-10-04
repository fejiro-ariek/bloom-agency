import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'bloom • Social Media Jobs for UK Girls',
  description: 'Turn your scroll time into side income. We\'re hiring UK-based girls to post simple content part-time. No experience needed. Apply in 60 seconds.',
  keywords: 'social media jobs, part time work, remote work, UK jobs, content creator, social media posting',
  authors: [{ name: 'bloom' }],
  openGraph: {
    title: 'bloom • Social Media Jobs for UK Girls',
    description: 'Turn your scroll time into side income. We\'re hiring UK-based girls to post simple content part-time. No experience needed.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'bloom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bloom • Social Media Jobs for UK Girls',
    description: 'Turn your scroll time into side income. No experience needed.',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌸</text></svg>" />
      </head>
      <body className="font-sans antialiased bg-white">
        {children}
      </body>
    </html>
  );
}