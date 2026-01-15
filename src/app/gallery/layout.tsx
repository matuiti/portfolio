import type { ReactNode } from "react";

export default function GalleryRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <section className="gallery-root">{children}</section>;
}
