import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data - In a real app, this would come from an API
const priceData = {
  wheat: {
    historical: [2200, 2300, 2400, 2350, 2450, 2500, 2600, 2550, 2650, 2700, 2800, 2750],
    predicted: [2800, 2850, 2900, 2950, 3000, 3100, 3150, 3200, 3250, 3300, 3350, 3400],
    factors: [
      { impact: 'positive', factor: 'International demand increase', probability: 0.8 },
      { impact: 'negative', factor: 'Expected surplus production', probability: 0.6 },
      { impact: 'positive', factor: 'Government MSP increase', probability: 0.9 }
    ]
  }
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const PricePrediction: React.FC = () => {
  const { t } = useLanguage();
  
  const data = {
    labels: [...months, ...months.map(m => `${m} (Pred)`)],
    datasets: [
      {
        label: t('historicalPrices'),
        data: [...priceData.wheat.historical, ...Array(12).fill(null)],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: t('predictedPrices'),
        data: [...Array(12).fill(null), ...priceData.wheat.predicted],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: t('pricePerQuintal')
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{t('yearlyPricePrediction')}</h3>
        <div className="flex items-center space-x-2">
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
            <option value="wheat">{t('wheat')}</option>
            <option value="rice">{t('rice')}</option>
            <option value="corn">{t('corn')}</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="text-blue-600" size={20} />
            <h4 className="font-semibold text-blue-900">{t('marketTrend')}</h4>
          </div>
          <p className="text-blue-800">
            {t('upwardTrendPredicted')}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="text-yellow-600" size={20} />
            <h4 className="font-semibold text-yellow-900">{t('keyFactors')}</h4>
          </div>
          <ul className="space-y-2">
            {priceData.wheat.factors.map((factor, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  factor.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="text-gray-800">{factor.factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="text-green-600" size={20} />
            <h4 className="font-semibold text-green-900">{t('priceOutlook')}</h4>
          </div>
          <p className="text-green-800">
            {t('expectedPriceRange')}: ₹2800-3400/quintal
          </p>
          <p className="text-sm text-green-700 mt-2">
            {t('confidenceLevel')}: 85%
          </p>
        </div>
      </div>
    </div>
  );
};