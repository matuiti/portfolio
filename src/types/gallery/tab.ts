import { ReactNode } from "react";

export type TabType = "description" | "code" | "preview";

export type TabItem = {
  id: TabType;
  label: string;
  isMobileOnly?: boolean;
  icon: ReactNode;
};
