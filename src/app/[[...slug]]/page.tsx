import '../../index.scss';
import { ClientOnly } from './client';

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['about'] },
    { slug: ['search'] },
    { slug: ['details'] },
  ];
}

export default function Page() {
  return <ClientOnly />;
}
