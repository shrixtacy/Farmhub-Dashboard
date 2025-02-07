import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Truck, 
  Shield, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Leaf,
  BarChart,
  Package,
  AlertTriangle
} from 'lucide-react';
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

interface ProductDetailsProps {
  product: Product;
  addToCart: (productId: number) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock additional product details
  const productDetails = {
    description: "Premium quality produce grown using sustainable farming practices. Harvested at peak ripeness to ensure the best taste and nutritional value.",
    certification: "Organic Certified",
    harvestDate: "2024-03-15",
    shelfLife: "6 months",
    storageInfo: "Store in a cool, dry place",
    farmerDetails: {
      experience: "15+ years",
      phone: "+91 98765 43210",
      email: "farmer@example.com",
      farmLocation: "Green Valley Farms, Punjab",
      certifications: ["Organic Farming", "Good Agricultural Practices"]
    },
    qualityMetrics: {
      moisture: "12-14%",
      purity: "98%",
      grade: "A"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/consumer')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToProducts')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Quality Metrics */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                {t('qualityMetrics')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{t('moisture')}</p>
                  <p className="font-medium">{productDetails.qualityMetrics.moisture}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('purity')}</p>
                  <p className="font-medium">{productDetails.qualityMetrics.purity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('grade')}</p>
                  <p className="font-medium">{productDetails.qualityMetrics.grade}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    {product.organic && (
                      <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {productDetails.certification}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">{productDetails.description}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold">₹{product.price}</p>
                    <p className="text-sm text-gray-600">per {product.unit}</p>
                  </div>
                  {product.discount > 0 && (
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors mb-4"
                >
                  {t('addToCart')}
                </button>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    {product.stock} {t('inStock')}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-4 h-4 mr-2" />
                    {product.deliveryTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                {t('farmerDetails')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="font-medium">{productDetails.farmerDetails.farmLocation}</p>
                    <p className="text-sm text-gray-600">{t('experience')}: {productDetails.farmerDetails.experience}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <p>{productDetails.farmerDetails.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <p>{productDetails.farmerDetails.email}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {productDetails.farmerDetails.certifications.map((cert, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">{t('additionalInformation')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">{t('harvestDate')}</p>
                    <p className="font-medium">{productDetails.harvestDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BarChart className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">{t('shelfLife')}</p>
                    <p className="font-medium">{productDetails.shelfLife}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-start">
                  <Leaf className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{t('storageInfo')}</p>
                    <p className="font-medium">{productDetails.storageInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};