import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
