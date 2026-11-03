"use client";

import React, { useState, Suspense } from "react";
import { StoreProvider } from "@/context/StoreContext";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { FavoritesDrawer } from "@/components/store/FavoritesDrawer";
import { CartDrawer } from "@/components/store/CartDrawer";
import { ProductModal } from "@/components/store/ProductModal";
import { BuyBoxDrawer } from "@/components/store/BuyBoxDrawer";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import { ProductComparisonModal } from "@/components/store/ProductComparisonModal";
import { ComparisonDock } from "@/components/store/ComparisonDock";
import { Toast } from "@/components/store/Toast";
import { Product } from "@/types/store";

export const StoreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#0A0A0C] selection:bg-[#0A0A0C] selection:text-white">
        <Suspense fallback={<div className="h-16 bg-white border-b border-stone-200" />}>
          <Navbar />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Global Drawers & Modals */}
        <FavoritesDrawer />
        <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
        <BuyBoxDrawer />
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
        <ProductComparisonModal />
        <ComparisonDock />
        <Toast />
      </div>
    </StoreProvider>
  );
};
