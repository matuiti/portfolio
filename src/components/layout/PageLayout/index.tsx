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
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
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
