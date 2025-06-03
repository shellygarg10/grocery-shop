import { Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import type { Product } from "../contexts/CartContext";
import { useCart } from "../contexts/CartContext";
import { useLiked } from "../contexts/LikedContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { state, addToCart, updateQuantity } = useCart();
  const { likedItems, toggleLike } = useLiked();

  const isLiked = likedItems.has(product.id);
  const cartItem = state.items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    if (quantity < product.available) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleLikeToggle = () => {
    toggleLike(product.id);
  };

  const isOutOfStock = product.available === 0;
  const isLowStock = product.available <= 5 && product.available > 0;

  const getAvailabilityText = () => {
    if (isOutOfStock) return "Out of Stock";
    if (product.available >= 10) return "Available";
    return `Only ${product.available} left`;
  };

  const getAvailabilityColor = () => {
    if (isOutOfStock) return "text-red-600 bg-red-50 border-red-200";
    if (isLowStock) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 h-64 overflow-hidden">
      <div className="flex h-full gap-4">
        {/* Image Section - Left */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg shadow-sm"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300";
            }}
          />
        </div>

        {/* Content Section - Right */}
        <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 pr-2">
                {product.name}
              </h3>
              <button
                onClick={handleLikeToggle}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-lg">
                {product.price}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < Math.floor(product.rating)
                        ? "bg-yellow-400"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.rating})
                </span>
              </div>
            </div>

            {/* Availability Info */}
            <div className="text-sm">
              <span
                className={`font-medium px-2 py-1 rounded-xl border text-xs ${getAvailabilityColor()}`}
              >
                {getAvailabilityText()}
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {isOutOfStock ? (
              <button
                className="w-full bg-gray-300 text-gray-500 py-2 px-3 rounded-lg text-sm font-medium"
                disabled
              >
                Out of Stock
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border">
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-full border border-gray-200 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-semibold text-base px-2">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.available}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-full border border-gray-200 disabled:opacity-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
