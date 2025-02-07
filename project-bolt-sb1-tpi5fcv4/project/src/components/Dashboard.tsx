import React, { useState } from 'react';
import {
  Tractor,
  Sprout,
  Package,
  BarChart3,
  BookOpen,
  Users,
  Truck,
  MonitorSmartphone,
  Menu,
  X,
  Sun,
  CloudRain,
  ShoppingCart,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';
import { PricePrediction } from './monitoring/PricePrediction';
import { CropRecommendation } from './monitoring/CropRecommendation';
import { ProductListing } from './marketplace/ProductListing';
import { PredictionSurvey } from './monitoring/PredictionSurvey';

// Mock data
const weatherData = {
  temperature: 28,
  humidity: 65,
  forecast: 'Partly Cloudy'
};

// Define sidebar items
const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
  { id: 'cropPlanning', label: 'Crop Planning', icon: Sprout },
  { id: 'survey', label: 'Prediction Survey', icon: Package },
  { id: 'logistics', label: 'Logistics', icon: Truck },
  { id: 'monitoring', label: 'Monitoring', icon: MonitorSmartphone },
  { id: 'knowledgeHub', label: 'Knowledge Hub', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users }
];

function Dashboard() {
  const { signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderMonitoring = () => (
    <div className="space-y-8">
      <PricePrediction />
      <CropRecommendation />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return renderMonitoring();
      case 'marketplace':
        return <ProductListing />;
      case 'survey':
        return <PredictionSurvey />;
      default:
        return (
          <>
            {/* Weather and Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t('weather')}</h3>
                  <Sun className="text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                  <p className="text-gray-600">{t('humidity')}: {weatherData.humidity}%</p>
                  <p className="text-gray-600">{t('forecast')}: {weatherData.forecast}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t('cropHealth')}</h3>
                  <Sprout className="text-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2">85%</span>
                  </div>
                  <p className="text-sm text-gray-600">Wheat Field - Block A</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t('predictionSurvey')}</h3>
                  <Package className="text-blue-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{t('completeSurveyMessage')}</p>
                  <button
                    onClick={() => setActiveTab('survey')}
                    className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('startSurvey')}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold">{t('buySupplies')}</h3>
              </button>
              <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Package className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold">{t('sellProduce')}</h3>
              </button>
              <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-semibold">{t('learningCenter')}</h3>
              </button>
              <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
                <h3 className="font-semibold">{t('community')}</h3>
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Tractor className="h-8 w-8 text-green-600" />
            {isSidebarOpen && <span className="text-xl font-bold">FarmHub</span>}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="p-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors
                ${activeTab === item.id ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-800">{
              sidebarItems.find(item => item.id === activeTab)?.label || t('dashboard')
            }</h1>
            <div className="flex items-center space-x-4">
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
        </header>

        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;