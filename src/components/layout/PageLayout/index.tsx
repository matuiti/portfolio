// src/components/layout/PageLayout/index.tsx
"use client";

import { useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { MobileDrawerMenu } from "../MobileDrawerMenu";
import { PageTopButton } from "@/components/ui/Buttons/PageTopButton";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileDrawerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main>{children}</main>
      <Footer />
      <PageTopButton />
    </div>
  );
}
