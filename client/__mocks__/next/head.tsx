import type { ReactNode } from 'react';

// Mock `next/head`: https://bradgarropy.com/blog/mocking-nextjs
export default function Head(props: { children: ReactNode }) {
  return <>{props.children}</>;
}
