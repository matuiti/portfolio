import { ComingSoon } from "@/components/ui/ComingSoon";

export const GallerySection = () => {

  return (
    <div className="container-center px-6">
      {/* <GallerySection /> */}
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 text-neutral-400 font-bold">
        <ComingSoon />
      </div>
    </div>
  );
}