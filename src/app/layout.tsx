import type { Metadata } from 'next';
import '../index.scss';
import '../styles/variables.scss';

export const metadata: Metadata = {
  title: 'React App with Next.js',
  description: 'Migrated from Vite to Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
