import { useQuery } from "@tanstack/react-query";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import type { Product } from "../contexts/CartContext";
import { useLiked } from "../contexts/LikedContext";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const LikedItems = () => {
  const { likedItems } = useLiked();

  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: fetchProducts,
  });

  const likedProducts = allProducts.filter((product) =>
    likedItems.has(product.id)
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">
              Failed to load products. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Liked Items</h1>
          <p className="text-gray-600">{likedProducts.length} items</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border p-6 h-64 animate-pulse"
              >
                <div className="flex h-full gap-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mt-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : likedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No liked items yet
            </h3>
            <p className="text-gray-500">
              Start browsing products and like the ones you're interested in!
            </p>
            <Link
              to="/search"
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {likedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedItems;
