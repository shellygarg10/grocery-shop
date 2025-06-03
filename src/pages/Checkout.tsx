import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";

const Checkout = () => {
  const { state, updateQuantity, getSubtotal, getDiscount, getCartTotal } =
    useCart();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getCartTotal();

  if (state.items.length === 0 && state.offerItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/search" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          {/* Cart Items */}
          {state.items.map((item) => (
            <div
              key={item.product.id}
              className="p-4 flex items-center space-x-4"
            >
              <img
                src={item.product.img}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300";
                }}
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {item.product.name}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.available}
                    className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 disabled:opacity-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {item.quantity >= item.product.available && (
                  <p className="text-xs text-orange-600 mt-1">
                    Max quantity reached
                  </p>
                )}
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {item.product.price}
                </div>
                <button
                  onClick={() => updateQuantity(item.product.id, 0)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Offer Items */}
          {state.offerItems.map((offerItem, index) => (
            <div
              key={`offer-${index}`}
              className="p-4 flex items-center space-x-4 bg-green-50"
            >
              <img
                src={offerItem.product.img}
                alt={offerItem.product.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300";
                }}
              />

              <div className="flex-1">
                <h3 className="font-medium text-green-800">
                  {offerItem.product.name}
                </h3>
                <p className="text-sm text-green-700">{offerItem.offerType}</p>
                <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded mt-1">
                  Free Item
                </span>
              </div>

              <div className="text-right">
                <div className="font-semibold text-green-800">
                  {offerItem.quantity} × FREE
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-£{discount.toFixed(2)}</span>
              </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
