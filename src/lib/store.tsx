"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface CartItem {
  id: string; // productId-size-color
  productId: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

export interface WishItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  color: string;
}

export type Language = "en" | "hi";

interface Toast {
  id: number;
  message: string;
  tone?: "default" | "success" | "error";
}

interface StoreState {
  cart: CartItem[];
  wishlist: WishItem[];
  language: Language;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  promoOpen: boolean;
  quickViewId: string | null;
  toasts: Toast[];
}

type Action =
  | { type: "LOAD"; payload: Partial<StoreState> }
  | { type: "ADD_TO_CART"; item: Omit<CartItem, "id" | "qty"> & { qty?: number } }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISH"; item: Omit<WishItem, "color"> & { color: string } }
  | { type: "SET_LANGUAGE"; lang: Language }
  | { type: "SET_CART_OPEN"; open: boolean }
  | { type: "SET_SEARCH_OPEN"; open: boolean }
  | { type: "SET_MOBILE_MENU"; open: boolean }
  | { type: "DISMISS_PROMO" }
  | { type: "SET_QUICK_VIEW"; id: string | null }
  | { type: "PUSH_TOAST"; toast: Toast }
  | { type: "DISMISS_TOAST"; id: number };

function lineId(productId: string, size: string, color: string) {
  return `${productId}__${size}__${color}`;
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "LOAD":
      return { ...state, ...action.payload };
    case "ADD_TO_CART": {
      const id = lineId(action.item.productId, action.item.size, action.item.color);
      const qty = action.item.qty ?? 1;
      const existing = state.cart.find((c) => c.id === id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === id ? { ...c, qty: Math.min(c.qty + qty, 10) } : c
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.item, id, qty }],
      };
    }
    case "SET_QTY":
      return {
        ...state,
        cart: state.cart
          .map((c) => (c.id === action.id ? { ...c, qty: action.qty } : c))
          .filter((c) => c.qty > 0),
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISH": {
      const exists = state.wishlist.find((w) => w.productId === action.item.productId);
      if (exists) {
        return {
          ...state,
          wishlist: state.wishlist.filter((w) => w.productId !== action.item.productId),
        };
      }
      return { ...state, wishlist: [...state.wishlist, action.item] };
    }
    case "SET_LANGUAGE":
      return { ...state, language: action.lang };
    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.open };
    case "SET_SEARCH_OPEN":
      return { ...state, isSearchOpen: action.open };
    case "SET_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: action.open };
    case "DISMISS_PROMO":
      return { ...state, promoOpen: false };
    case "SET_QUICK_VIEW":
      return { ...state, quickViewId: action.id };
    case "PUSH_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "DISMISS_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */
interface StoreContextValue extends StoreState {
  cartCount: number;
  cartSubtotal: number;
  addToCart: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWish: (item: Omit<WishItem, "color"> & { color: string }) => void;
  isWished: (productId: string) => boolean;
  setLanguage: (lang: Language) => void;
  openCart: () => void;
  closeCart: () => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenu: (open: boolean) => void;
  dismissPromo: () => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  toast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "vmart-siwan-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    wishlist: [],
    language: "en",
    isCartOpen: false,
    isSearchOpen: false,
    isMobileMenuOpen: false,
    promoOpen: true,
    quickViewId: null,
    toasts: [],
  });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({
          type: "LOAD",
          payload: {
            cart: parsed.cart ?? [],
            wishlist: parsed.wishlist ?? [],
            language: parsed.language ?? "en",
          },
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cart: state.cart,
          wishlist: state.wishlist,
          language: state.language,
        })
      );
    } catch {
      /* ignore */
    }
  }, [state.cart, state.wishlist, state.language]);

  const toast = useCallback((message: string, tone: Toast["tone"] = "default") => {
    const id = Date.now() + Math.random();
    dispatch({ type: "PUSH_TOAST", toast: { id, message, tone } });
    setTimeout(() => dispatch({ type: "DISMISS_TOAST", id }), 3200);
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = state.cart.reduce((n, c) => n + c.qty, 0);
    const cartSubtotal = state.cart.reduce(
      (n, c) => n + (c.salePrice ?? c.price) * c.qty,
      0
    );
    return {
      ...state,
      cartCount,
      cartSubtotal,
      addToCart: (item) => dispatch({ type: "ADD_TO_CART", item }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", id }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      toggleWish: (item) => dispatch({ type: "TOGGLE_WISH", item }),
      isWished: (productId) => state.wishlist.some((w) => w.productId === productId),
      setLanguage: (lang) => dispatch({ type: "SET_LANGUAGE", lang }),
      openCart: () => dispatch({ type: "SET_CART_OPEN", open: true }),
      closeCart: () => dispatch({ type: "SET_CART_OPEN", open: false }),
      setSearchOpen: (open) => dispatch({ type: "SET_SEARCH_OPEN", open }),
      setMobileMenu: (open) => dispatch({ type: "SET_MOBILE_MENU", open }),
      dismissPromo: () => dispatch({ type: "DISMISS_PROMO" }),
      openQuickView: (id) => dispatch({ type: "SET_QUICK_VIEW", id }),
      closeQuickView: () => dispatch({ type: "SET_QUICK_VIEW", id: null }),
      toast,
      dismissToast: (id) => dispatch({ type: "DISMISS_TOAST", id }),
    };
  }, [state, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
