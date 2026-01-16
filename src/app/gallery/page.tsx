import { TitleAndCount } from "./components/ui/TitleAndCount";
import { PreviewSizeSwitcher } from "./components/preview/PreviewSizeSwitcher";
import { ItemList } from "./components/list/ItemList";
import { Pagination } from "./components/list/Pagination";

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <TitleAndCount />
      <PreviewSizeSwitcher />
      <ItemList />
      <Pagination />
    </div>
  );
}
