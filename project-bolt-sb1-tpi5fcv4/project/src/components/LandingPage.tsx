import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { AuthForm } from './AuthForm';
import { ScrollAnimation } from './ScrollAnimation';
import {
  ShoppingCart,
  Sprout,
  Warehouse,
  Users,
  Tractor,
  LineChart,
  CloudSun,
  Leaf,
  Shield,
  TrendingUp,
  Smartphone,
  BookOpen,
  MapPin,
  DollarSign,
  BarChart,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState('landing');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentView(hash || 'landing');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const features = [
    {
      icon: ShoppingCart,
      title: 'Digital Marketplace',
      description: 'Connect directly with buyers and get better prices for your produce. Eliminate middlemen and increase your profits.',
      benefits: ['Direct farmer-buyer connection', 'Transparent pricing', 'Wider market reach']
    },
    {
      icon: Smartphone,
      title: 'Smart Farming Tools',
      description: 'Access modern farming techniques and real-time monitoring tools to optimize your crop yield.',
      benefits: ['Weather forecasting', 'Crop monitoring', 'Pest detection']
    },
    {
      icon: BarChart,
      title: 'Market Intelligence',
      description: 'Make informed decisions with real-time market data, price trends, and demand forecasts.',
      benefits: ['Price predictions', 'Demand analysis', 'Market trends']
    },
    {
      icon: BookOpen,
      title: 'Knowledge Hub',
      description: 'Learn from agricultural experts and access a vast library of farming best practices.',
      benefits: ['Expert guidance', 'Training modules', 'Community knowledge']
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Active Farmers', icon: Users },
    { value: '₹2.5Cr+', label: 'Monthly Trading Volume', icon: DollarSign },
    { value: '95%', label: 'Farmer Satisfaction', icon: TrendingUp },
    { value: '1000+', label: 'Villages Connected', icon: MapPin },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Punjab',
      image: 'https://images.unsplash.com/photo-1612437118782-dc8150b3c35f?auto=format&fit=crop&q=80&w=100',
      text: 'FarmHub has transformed how I sell my crops. The price predictions helped me increase my profits by 40% this season.',
      role: 'Wheat Farmer'
    },
    {
      name: 'Priya Sharma',
      location: 'Maharashtra',
      image: 'https://images.unsplash.com/photo-1594708053019-5336680c77b6?auto=format&fit=crop&q=80&w=100',
      text: 'The smart farming tools have helped me optimize my irrigation and reduce water usage by 30%. Amazing platform!',
      role: 'Organic Farmer'
    },
    {
      name: 'Mohammed Ali',
      location: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=100',
      text: 'Access to direct buyers and market insights has helped me get better prices for my produce consistently.',
      role: 'Fruit Grower'
    }
  ];

  if (currentView === 'signin' || currentView === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-scale-in">
          <AuthForm isSignIn={currentView === 'signin'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600 animate-float" />
              <span className="text-xl font-bold text-gray-800">FarmHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link text-gray-600 hover:text-green-600 transition-colors">Features</a>
              <a href="#benefits" className="nav-link text-gray-600 hover:text-green-600 transition-colors">Benefits</a>
              <a href="#testimonials" className="nav-link text-gray-600 hover:text-green-600 transition-colors">Success Stories</a>
              <a href="#contact" className="nav-link text-gray-600 hover:text-green-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.hash = 'signin'}
                className="text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:scale-105"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.hash = 'signup'}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-700 animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 py-24 relative">
            <div className="max-w-3xl mx-auto text-center stagger-animation">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Farmers with Technology
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Join thousands of farmers using smart technology to increase yields, 
                get better prices, and grow their farming business sustainably.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.hash = 'signup'}
                  className="button-hover bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  Start Free Trial
                </button>
                <a
                  href="#features"
                  className="button-hover border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all"
                >
                  See How It Works
                </a>
              </div>
              <div className="mt-8 text-sm text-gray-200 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                No credit card required • Free 30-day trial • Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-lg hover-float hover-glow">
                  <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-4 hover-rotate" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need 
              to make your farming business more profitable and sustainable.
            </p>
          </div>
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover-grow hover-glow group"
                >
                  <feature.icon className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 hover:translate-x-2 transition-transform">
                        <Shield className="w-4 h-4 text-green-600 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-left">
                <h2 className="text-3xl font-bold mb-6">Why Choose FarmHub?</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 hover-lift transition-all duration-300">
                    <Tractor className="w-6 h-6 text-green-600 mt-1 animate-float" />
                    <div>
                      <h3 className="font-semibold mb-2">Modern Farming Techniques</h3>
                      <p className="text-gray-600">
                        Access cutting-edge farming methods and technology to optimize 
                        your crop yield and reduce resource wastage.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 hover-lift transition-all duration-300">
                    <LineChart className="w-6 h-6 text-green-600 mt-1 animate-float" />
                    <div>
                      <h3 className="font-semibold mb-2">Data-Driven Decisions</h3>
                      <p className="text-gray-600">
                        Make informed choices with real-time market data, weather forecasts, 
                        and crop recommendations based on AI analysis.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 hover-lift transition-all duration-300">
                    <CloudSun className="w-6 h-6 text-green-600 mt-1 animate-float" />
                    <div>
                      <h3 className="font-semibold mb-2">Smart Weather Monitoring</h3>
                      <p className="text-gray-600">
                        Stay ahead with precise weather predictions and get timely alerts 
                        for optimal crop management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-slide-right">
                <img
                  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&q=80&w=1000"
                  alt="Smart Farming"
                  className="rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-float">
                  <p className="font-semibold">30% Average Profit Increase</p>
                  <p className="text-sm">reported by our farmers</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-slide-up">Success Stories</h2>
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover-float hover-glow">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-8 hover-bright">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
                <p className="text-gray-600">
                  Join thousands of farmers who are already using FarmHub to grow their business.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span>support@farmhub.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Toll-free: 1-800-FARM-HUB</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span>Available in 15+ states across India</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-animation">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">FarmHub</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with technology for a sustainable and profitable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Get the latest farming tips and market updates delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in">
            <p>© 2024 FarmHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};