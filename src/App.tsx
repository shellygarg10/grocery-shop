import "./App.css";
import { Toaster as Sonner } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { LikedProvider } from "./contexts/LikedContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import LikedItems from "./pages/LikedItem";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LikedProvider>
        <CartProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/liked" element={<LikedItems />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </LikedProvider>
    </QueryClientProvider>
  );
}

export default App;
