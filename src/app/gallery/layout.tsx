import { GalleryLayout } from "./components/layout/GalleryLayout";

export default function GalleryRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GalleryLayout>{children}</GalleryLayout>;
}
