import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

export interface Product {
  id: number;
  type: string;
  name: string;
  description: string;
  rating: number;
  img: string;
  price: string;
  available: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OfferItem {
  product: Product;
  quantity: number;
  offerType: string;
}

interface CartState {
  items: CartItem[];
  offerItems: OfferItem[];
  availableProducts: Product[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "APPLY_OFFERS" }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotalItems: () => number;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.product, quantity: 1 }];
      }

      return applyOffers({ ...state, items: newItems });
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.productId
      );
      return applyOffers({ ...state, items: newItems });
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.product.id !== action.productId
        );
        return applyOffers({ ...state, items: newItems });
      }

      const newItems = state.items.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return applyOffers({ ...state, items: newItems });
    }

    case "APPLY_OFFERS":
      return applyOffers(state);

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        offerItems: [],
      };

    default:
      return state;
  }
};

const applyOffers = (state: CartState): CartState => {
  const offerItems: OfferItem[] = [];

  // Offer 1: Buy 6 cans of Coca-Cola, get 1 free
  const cokeItem = state.items.find((item) =>
    item.product.name.toLowerCase().includes("coca-cola")
  );

  if (cokeItem && cokeItem.quantity >= 6) {
    const freeCokeCount = Math.floor(cokeItem.quantity / 6);
    offerItems.push({
      product: cokeItem.product,
      quantity: freeCokeCount,
      offerType: "Buy 6 get 1 free",
    });
  }

  // Offer 2: Buy 3 croissants, get a free coffee
  const croissantItem = state.items.find((item) =>
    item.product.name.toLowerCase().includes("croissant")
  );

  if (croissantItem && croissantItem.quantity >= 3) {
    const freeCoffeeCount = Math.floor(croissantItem.quantity / 3);
    // Create a mock coffee product for the free offer
    const coffeeProduct: Product = {
      id: 999,
      type: "drinks",
      name: "Free Coffee",
      description: "Complimentary coffee with croissant purchase",
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      price: "£0.00",
      available: 100,
    };

    offerItems.push({
      product: coffeeProduct,
      quantity: freeCoffeeCount,
      offerType: "Free with 3 croissants",
    });
  }

  return { ...state, offerItems };
};

export const CartProvider = ({
  children,
  products = [],
}: {
  children: ReactNode;
  products?: Product[];
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    offerItems: [],
    availableProducts: products,
  });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace("£", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getDiscount = () => {
    return state.offerItems.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace("£", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getCartTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const getTotalItems = () => {
    const regularItems = state.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const freeItems = state.offerItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return regularItems + freeItems;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getSubtotal,
        getDiscount,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
