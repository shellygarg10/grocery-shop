import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useLiked } from "../contexts/LikedContext";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ searchTerm = "", onSearchChange }: HeaderProps) => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { getLikedCount } = useLiked();
  const totalItems = getTotalItems();
  const likedCount = getLikedCount();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/search" className="text-xl font-bold text-gray-900">
            GROCERIES
          </Link>

          {location.pathname === "/search" && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Link
              to="/liked"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Heart className="w-6 h-6" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>

            <Link
              to="/checkout"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="p-2 text-gray-600 hover:text-gray-900 bg-gray-300 rounded-full">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
