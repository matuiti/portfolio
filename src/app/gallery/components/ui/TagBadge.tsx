// src/app/gallery/components/ui/TagBadge.tsx
type TagBadgeProps = {
  label: string;
};

export const TagBadge = ({ label }: TagBadgeProps) => {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-white border border-neutral-200 rounded-lg shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-default group/tag">
      <span className="text-blue-400 font-bold mr-1 text-[10px] transition-colors group-hover/tag:text-blue-600">
        #
      </span>
      <span className="text-neutral-600 font-bold text-[11px] tracking-tight">
        {label}
      </span>
    </span>
  );
};
