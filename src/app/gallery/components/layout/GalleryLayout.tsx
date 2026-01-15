import type { ReactNode } from "react";
import GallerySidebar from "./GallerySidebar";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="gallery-layout">
      <GallerySidebar />
      <main className="gallery-main">{children}</main>
    </div>
  );
}
