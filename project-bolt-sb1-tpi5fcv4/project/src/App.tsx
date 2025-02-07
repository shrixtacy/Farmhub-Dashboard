import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LandingPage } from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import { CartPage } from './components/cart/CartPage';
import { ProductDetails } from './components/ProductDetails';

// Product data
const products = [
  // Grains Category
  {
    id: 1,
    name: 'Organic Wheat',
    price: 40,
    unit: 'per kg',
    rating: 4.5,
    farmer: 'John Doe',
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 500,
    deliveryTime: '2-3 days',
    discount: 10,
    category: 'Grains'
  },
  {
    id: 2,
    name: 'Premium Basmati Rice',
    price: 60,
    unit: 'per kg',
    rating: 4.8,
    farmer: 'Jane Smith',
    location: 'West Bengal',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 750,
    deliveryTime: '1-2 days',
    discount: 5,
    category: 'Grains'
  },
  {
    id: 3,
    name: 'Organic Quinoa',
    price: 120,
    unit: 'per kg',
    rating: 4.6,
    farmer: 'Rajesh Kumar',
    location: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1586662164783-9695d406d19f?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 300,
    deliveryTime: '2-3 days',
    discount: 0,
    category: 'Grains'
  },
  {
    id: 13,
    name: 'Pearl Millet (Bajra)',
    price: 35,
    unit: 'per kg',
    rating: 4.4,
    farmer: 'Vikram Singh',
    location: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1635321350281-e45ae2c7bae3?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 600,
    deliveryTime: '2-3 days',
    discount: 0,
    category: 'Grains'
  },
  {
    id: 14,
    name: 'Organic Red Rice',
    price: 85,
    unit: 'per kg',
    rating: 4.7,
    farmer: 'Maya Reddy',
    location: 'Kerala',
    image: 'https://images.unsplash.com/photo-1594312180721-3b5217cfc65f?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 200,
    deliveryTime: '2-3 days',
    discount: 8,
    category: 'Grains'
  },

  // Vegetables Category
  {
    id: 4,
    name: 'Fresh Vegetable Pack',
    price: 200,
    unit: 'per pack',
    rating: 4.3,
    farmer: 'Mike Johnson',
    location: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 100,
    deliveryTime: '1 day',
    discount: 15,
    category: 'Vegetables'
  },
  {
    id: 5,
    name: 'Organic Tomatoes',
    price: 40,
    unit: 'per kg',
    rating: 4.4,
    farmer: 'Priya Sharma',
    location: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 200,
    deliveryTime: '1 day',
    discount: 0,
    category: 'Vegetables'
  },
  {
    id: 6,
    name: 'Fresh Spinach',
    price: 30,
    unit: 'per bunch',
    rating: 4.7,
    farmer: 'Amit Patel',
    location: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 150,
    deliveryTime: '1 day',
    discount: 0,
    category: 'Vegetables'
  },
  {
    id: 15,
    name: 'Baby Potatoes',
    price: 45,
    unit: 'per kg',
    rating: 4.6,
    farmer: 'Surinder Kaur',
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 400,
    deliveryTime: '1-2 days',
    discount: 0,
    category: 'Vegetables'
  },
  {
    id: 16,
    name: 'Organic Bell Peppers',
    price: 80,
    unit: 'per kg',
    rating: 4.5,
    farmer: 'Rahul Verma',
    location: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 120,
    deliveryTime: '1-2 days',
    discount: 5,
    category: 'Vegetables'
  },

  // Fruits Category
  {
    id: 7,
    name: 'Seasonal Fruit Pack',
    price: 250,
    unit: 'per pack',
    rating: 4.6,
    farmer: 'Sarah Wilson',
    location: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 200,
    deliveryTime: '1-2 days',
    discount: 0,
    category: 'Fruits'
  },
  {
    id: 8,
    name: 'Organic Mangoes',
    price: 150,
    unit: 'per dozen',
    rating: 4.9,
    farmer: 'Ramesh Yadav',
    location: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 100,
    deliveryTime: '1-2 days',
    discount: 5,
    category: 'Fruits'
  },
  {
    id: 9,
    name: 'Fresh Pomegranate',
    price: 120,
    unit: 'per kg',
    rating: 4.5,
    farmer: 'Meera Reddy',
    location: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 300,
    deliveryTime: '1-2 days',
    discount: 0,
    category: 'Fruits'
  },
  {
    id: 17,
    name: 'Sweet Oranges',
    price: 90,
    unit: 'per kg',
    rating: 4.7,
    farmer: 'Prakash Shetty',
    location: 'Nagpur',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 250,
    deliveryTime: '1-2 days',
    discount: 0,
    category: 'Fruits'
  },
  {
    id: 18,
    name: 'Organic Strawberries',
    price: 180,
    unit: 'per box',
    rating: 4.8,
    farmer: 'Anjali Deshmukh',
    location: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 80,
    deliveryTime: '1 day',
    discount: 0,
    category: 'Fruits'
  },

  // Dairy Category
  {
    id: 10,
    name: 'Organic Milk',
    price: 60,
    unit: 'per liter',
    rating: 4.8,
    farmer: 'Gurpreet Singh',
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 100,
    deliveryTime: '1 day',
    discount: 0,
    category: 'Dairy'
  },
  {
    id: 11,
    name: 'Farm Fresh Butter',
    price: 200,
    unit: 'per 500g',
    rating: 4.7,
    farmer: 'Anita Desai',
    location: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 50,
    deliveryTime: '1-2 days',
    discount: 0,
    category: 'Dairy'
  },
  {
    id: 12,
    name: 'Artisanal Cheese',
    price: 300,
    unit: 'per 250g',
    rating: 4.6,
    farmer: 'Thomas Jacob',
    location: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 30,
    deliveryTime: '2-3 days',
    discount: 10,
    category: 'Dairy'
  },
  {
    id: 19,
    name: 'Fresh Paneer',
    price: 280,
    unit: 'per kg',
    rating: 4.7,
    farmer: 'Kavita Sharma',
    location: 'Haryana',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',
    organic: false,
    stock: 40,
    deliveryTime: '1 day',
    discount: 0,
    category: 'Dairy'
  },
  {
    id: 20,
    name: 'Organic Yogurt',
    price: 50,
    unit: 'per 400g',
    rating: 4.8,
    farmer: 'Ravi Kumar',
    location: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1571212515416-fca988684e60?auto=format&fit=crop&q=80&w=400',
    organic: true,
    stock: 150,
    deliveryTime: '1 day',
    discount: 5,
    category: 'Dairy'
  }
];

interface CartItem {
  id: number;
  quantity: number;
}

function App() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  if (!user) {
    return <LandingPage />;
  }

  if (user.userType === 'farmer') {
    return <Dashboard />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/consumer" 
          element={
            <ConsumerDashboard 
              products={products}
              cartItems={cartItems}
              addToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetails 
              product={products[0]}
              addToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cartItems={cartItems}
              products={products}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          } 
        />
        <Route path="/" element={<Navigate to="/consumer" replace />} />
      </Routes>
    </Router>
  );
}

export default App;