import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  LogOut,
  ChevronDown,
  MapPin,
  Truck,
  X,
  Heart,
  Bell,
  Percent,
  Clock,
  Tag,
  ArrowUpDown,
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  rating: number;
  farmer: string;
  location: string;
  image: string;
  organic: boolean;
  stock: number;
  deliveryTime: string;
  discount: number;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface ConsumerDashboardProps {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
}

const categories = [
  'All Products',
  'Grains',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Organic',
];

const locations = [
  'All Locations',
  'Punjab',
  'West Bengal',
  'Karnataka',
  'Maharashtra',
];

function ConsumerDashboard({ products, cartItems, addToCart }: ConsumerDashboardProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory =
        selectedCategory === 'All Products' ||
        (selectedCategory === 'Organic' ? product.organic : true);
      const matchesLocation =
        selectedLocation === 'All Locations' || product.location === selectedLocation;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesLocation && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const notifications = [
    { id: 1, message: 'New harvest season starting soon!', type: 'info' },
    { id: 2, message: 'Special discount on organic products', type: 'promotion' },
    { id: 3, message: 'Your last order has been delivered', type: 'success' },
  ];

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">FarmMarket</span>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchProducts')}
                    className="w-96 px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
                    <h3 className="font-semibold mb-2">{t('notifications')}</h3>
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className="p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <p className="text-sm">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowWishlist(!showWishlist)}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                {showWishlist && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
                    <h3 className="font-semibold mb-2">{t('wishlist')}</h3>
                    <div className="space-y-2">
                      {wishlist.map(id => {
                        const product = products.find(p => p.id === id);
                        return product ? (
                          <div
                            key={id}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">₹{product.price} {product.unit}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleWishlist(id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-1 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>

              <select 
                className="px-4 py-2 border rounded-lg"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
              <button 
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <LogOut size={20} />
                <span>{t('signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50">
                <Tag className="h-5 w-5" />
                <span>{t('priceRange')}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute mt-2 bg-white rounded-lg shadow-lg p-4 w-64">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50">
                <MapPin className="h-5 w-5" />
                <span>{selectedLocation}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute mt-2 bg-white rounded-lg shadow-lg p-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50">
              <Clock className="h-5 w-5" />
              <span>{t('deliveryTime')}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50">
              <Percent className="h-5 w-5" />
              <span>{t('discounts')}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-5 w-5 text-gray-500" />
            <select
              className="px-4 py-2 bg-white rounded-lg border-none focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">{t('mostPopular')}</option>
              <option value="price-low">{t('priceLowToHigh')}</option>
              <option value="price-high">{t('priceHighToLow')}</option>
              <option value="rating">{t('highestRated')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    wishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600'
                  } hover:scale-110 transition-transform duration-200`}
                >
                  <Heart className="h-4 w-4" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    {product.organic && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                        Organic
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  by {product.farmer} • {product.location}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">₹{product.price} {product.unit}</p>
                    {product.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through">
                        ₹{Math.round(product.price * (1 + product.discount / 100))} {product.unit}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    <Truck className="h-4 w-4 inline mr-1" />
                    {product.deliveryTime}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {product.stock} {t('inStock')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    {cartItems.some(item => item.id === product.id)
                      ? t('addMore')
                      : t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ConsumerDashboard;