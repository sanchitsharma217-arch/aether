"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, SellerOffer } from "@/types/store";
import { PRODUCTS } from "@/data/mockProducts";

interface StoreContextType {
  // Mount state for SSR hydration safety
  isMounted: boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, offer?: SellerOffer) => void;
  addBundleToCart: (items: { product: Product; quantity?: number; color?: string; offer?: SellerOffer }[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Buy Box Drawer Modal State
  activeBuyBoxProduct: Product | null;
  setActiveBuyBoxProduct: (product: Product | null) => void;

  // Favorites / Wishlist
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  favoriteProducts: Product[];
  favoritesCount: number;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;

  // Product Comparison (Side-by-side up to 4 items)
  comparedProductIds: string[];
  toggleCompare: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearCompare: () => void;
  comparedProducts: Product[];
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Toast Notification
  toast: { message: string; type: "cart" | "fav" | "compare" } | null;
  showToast: (message: string, type?: "cart" | "fav" | "compare") => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeBuyBoxProduct, setActiveBuyBoxProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "cart" | "fav" | "compare" } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem("aether_cart");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedFavs = localStorage.getItem("aether_favorites");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedComp = localStorage.getItem("aether_compared");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedComp) setComparedProductIds(JSON.parse(savedComp));
    } catch {
      // ignore
    }
  }, []);

  // Persist cart
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("aether_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isMounted]);

  // Persist favorites
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("aether_favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites, isMounted]);

  // Persist compared items
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("aether_compared", JSON.stringify(comparedProductIds));
    } catch {
      // ignore
    }
  }, [comparedProductIds, isMounted]);

  const showToast = (message: string, type: "cart" | "fav" | "compare" = "cart") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const addToCart = (product: Product, quantity: number = 1, color?: string, offer?: SellerOffer) => {
    setCart((prev) => {
      const selectedOffer = offer || product.offers?.[0];
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                selectedOffer: offer || item.selectedOffer,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.colors?.[0]?.name,
          selectedOffer,
        },
      ];
    });
    const vendorNote = offer ? ` via ${offer.sellerName}` : "";
    showToast(`Added "${product.title}"${vendorNote} to Universal Bag`, "cart");
  };

  const addBundleToCart = (items: { product: Product; quantity?: number; color?: string; offer?: SellerOffer }[]) => {
    setCart((prev) => {
      const updated = [...prev];
      for (const item of items) {
        const selectedOffer = item.offer || item.product.offers?.[0];
        const existingIdx = updated.findIndex((i) => i.product.id === item.product.id);
        const qty = item.quantity || 1;
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + qty,
            selectedOffer: item.offer || updated[existingIdx].selectedOffer,
          };
        } else {
          updated.push({
            product: item.product,
            quantity: qty,
            selectedColor: item.color || item.product.colors?.[0]?.name,
            selectedOffer,
          });
        }
      }
      return updated;
    });
    showToast(`Added ${items.length} Suite objects to Universal Bag`, "cart");
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from wishlist", "fav");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to wishlist ❤️", "fav");
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);
  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  // Product Comparison (Max 4)
  const toggleCompare = (productId: string) => {
    setComparedProductIds((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from comparison", "compare");
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          showToast("Comparison limit reached (max 4 objects)", "compare");
          return prev;
        }
        showToast("Added to comparison matrix ⚖️", "compare");
        return [...prev, productId];
      }
    });
  };

  const isCompared = (productId: string) => comparedProductIds.includes(productId);
  const clearCompare = () => {
    setComparedProductIds([]);
    setIsCompareOpen(false);
  };
  const comparedProducts = PRODUCTS.filter((p) => comparedProductIds.includes(p.id));

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.selectedOffer ? item.selectedOffer.price : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        isMounted,
        cart,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        activeBuyBoxProduct,
        setActiveBuyBoxProduct,
        favorites,
        toggleFavorite,
        isFavorite,
        favoriteProducts,
        favoritesCount: favorites.length,
        isFavoritesOpen,
        setIsFavoritesOpen,
        comparedProductIds,
        toggleCompare,
        isCompared,
        clearCompare,
        comparedProducts,
        isCompareOpen,
        setIsCompareOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
