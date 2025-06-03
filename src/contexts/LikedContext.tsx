import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LikedContextType {
  likedItems: Set<number>;
  toggleLike: (productId: number) => void;
  getLikedCount: () => number;
}

const LikedContext = createContext<LikedContextType | undefined>(undefined);

export const LikedProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (productId: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getLikedCount = () => likedItems.size;

  return (
    <LikedContext.Provider value={{ likedItems, toggleLike, getLikedCount }}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (!context) {
    throw new Error("useLiked must be used within a LikedProvider");
  }
  return context;
};
