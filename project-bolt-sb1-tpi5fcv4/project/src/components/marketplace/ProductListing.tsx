import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  X, 
  DollarSign, 
  Package, 
  Truck, 
  Calendar,
  Leaf,
  Tag,
  History,
  Upload
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface ProductFormData {
  name: string;
  price: number;
  unit: string;
  stock: number;
  description: string;
  image: string;
  organic: boolean;
  deliveryTime: string;
  harvestDate: string;
  category: string;
  discount: number;
  createdAt: Date;
}

// Sample history data
const sampleHistory = [
  {
    id: 1,
    name: "Organic Wheat",
    price: 40,
    quantity: 500,
    date: new Date('2024-03-01'),
    buyer: "Rahul Traders"
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    price: 35,
    quantity: 200,
    date: new Date('2024-02-28'),
    buyer: "Fresh Mart"
  },
  {
    id: 3,
    name: "Basmati Rice",
    price: 85,
    quantity: 300,
    date: new Date('2024-02-25'),
    buyer: "Global Foods"
  }
];

export const ProductListing: React.FC = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [myProducts, setMyProducts] = useState<ProductFormData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    unit: 'per kg',
    stock: 0,
    description: '',
    image: '',
    organic: false,
    deliveryTime: '2-3 days',
    harvestDate: '',
    category: '',
    discount: 0,
    createdAt: new Date()
  });

  const categories = ['Grains', 'Vegetables', 'Fruits', 'Dairy'];
  const units = ['per kg', 'per dozen', 'per pack', 'per liter', 'per 500g'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }
    setMyProducts([...myProducts, { ...formData, createdAt: new Date() }]);
    setFormData({
      name: '',
      price: 0,
      unit: 'per kg',
      stock: 0,
      description: '',
      image: '',
      organic: false,
      deliveryTime: '2-3 days',
      harvestDate: '',
      category: '',
      discount: 0,
      createdAt: new Date()
    });
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updatedProducts = myProducts.filter((_, i) => i !== index);
    setMyProducts(updatedProducts);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Product and History Buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('myProducts')}</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <History size={20} />
            <span>{t('salesHistory')}</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            <span>{t('addProduct')}</span>
          </button>
        </div>
      </div>

      {/* Sales History Section */}
      {showHistory && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">{t('recentSales')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('product')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('price')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('quantity')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('buyer')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('date')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleHistory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.buyer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.date.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{t('addNewProduct')}</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-green-500 transition-colors"
                  >
                    {formData.image ? (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({ ...formData, image: '' });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload product image
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('productName')}*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('category')}*
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{t('selectCategory')}</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('price')}*
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('unit')}*
                  </label>
                  <select
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('stock')}*
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('description')}*
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deliveryTime')}
                  </label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      placeholder="2-3 days"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('harvestDate')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('discount')}
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Organic Certification */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organic"
                  checked={formData.organic}
                  onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <label htmlFor="organic" className="flex items-center text-sm text-gray-700">
                  <Leaf className="w-4 h-4 mr-1" />
                  {t('organicCertified')}
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {t('addProduct')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.organic && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                      {t('organic')}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">₹{product.price} {product.unit}</p>
                  <p className="text-sm text-gray-500">{t('stock')}: {product.stock}</p>
                </div>
                <span className="text-sm text-gray-500">{product.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};