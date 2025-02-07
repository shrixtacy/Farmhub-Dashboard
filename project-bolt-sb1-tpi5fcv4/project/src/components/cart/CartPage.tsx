import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, X, Truck, Shield, CreditCard } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface CartItem {
  id: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  location: string;
  deliveryTime: string;
  stock: number;
  organic: boolean;
}

interface CartPageProps {
  cartItems: CartItem[];
  products: Product[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  products,
  updateQuantity,
  removeFromCart,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = cartTotal > 1000 ? 0 : 50;
  const tax = cartTotal * 0.05; // 5% tax
  const finalTotal = cartTotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">{t('cartEmpty')}</h2>
            <p className="text-gray-600 mb-6">{t('cartEmptyMessage')}</p>
            <button
              onClick={() => navigate('/consumer')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('continueShopping')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/consumer')}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('continueShopping')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                {t('shoppingCart')} ({cartItems.length} {cartItems.length === 1 ? t('item') : t('items')})
              </h2>

              <div className="space-y-6">
                {cartItems.map(item => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;

                  return (
                    <div key={item.id} className="flex items-start border-b pb-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600">
                              {t('soldBy')}: {product.farmer} • {product.location}
                            </p>
                            {product.organic && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                                {t('organic')}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{product.price * item.quantity}</p>
                            <p className="text-sm text-gray-500">₹{product.price} {product.unit}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">{t('orderSummary')}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('subtotal')}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('deliveryFee')}</span>
                  <span>{deliveryFee === 0 ? t('free') : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('tax')}</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>{t('total')}</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mb-4">
                {t('proceedToCheckout')}
              </button>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  {t('freeDeliveryMessage')}
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {t('secureTransactionMessage')}
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('acceptedPaymentMethods')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};