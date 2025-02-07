import React, { useState } from 'react';
import { Plane as Plant, CloudRain, Thermometer, Droplets, Sprout, DollarSign, AlertTriangle, Calendar } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

// Mock data for crop recommendations
const cropRecommendations = [
  {
    id: 1,
    name: 'Wheat',
    matchScore: 92,
    weather: {
      temperature: '20-25°C',
      rainfall: '75-100cm',
      humidity: '50-60%'
    },
    soil: {
      type: 'Loamy',
      ph: '6.0-7.0',
      moisture: 'Medium'
    },
    market: {
      demand: 'High',
      roi: '45%',
      minPrice: '₹2000/quintal'
    },
    timeline: {
      planting: 'Oct-Nov',
      harvest: 'Mar-Apr',
      peakSeason: 'Dec-Feb'
    },
    risks: [
      'Late monsoon impact',
      'Price fluctuation',
      'Pest susceptibility'
    ]
  },
  // Add more crop recommendations as needed
];

export const CropRecommendation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState(cropRecommendations[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">{t('cropRecommendations')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Main Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">{selectedCrop.name}</h4>
              <div className="flex items-center mt-2">
                <Plant className="text-green-600 mr-2" size={20} />
                <span className="text-sm text-gray-600">{t('matchScore')}: </span>
                <span className="ml-1 font-semibold text-green-600">{selectedCrop.matchScore}%</span>
              </div>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3 flex items-center">
              <CloudRain className="mr-2" size={18} />
              {t('weatherConditions')}
            </h5>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('temperature')}</p>
                <p className="font-medium">{selectedCrop.weather.temperature}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('rainfall')}</p>
                <p className="font-medium">{selectedCrop.weather.rainfall}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('humidity')}</p>
                <p className="font-medium">{selectedCrop.weather.humidity}</p>
              </div>
            </div>
          </div>

          {/* Soil Requirements */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3 flex items-center">
              <Sprout className="mr-2" size={18} />
              {t('soilRequirements')}
            </h5>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('soilType')}</p>
                <p className="font-medium">{selectedCrop.soil.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('phLevel')}</p>
                <p className="font-medium">{selectedCrop.soil.ph}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('moisture')}</p>
                <p className="font-medium">{selectedCrop.soil.moisture}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Market Analysis */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3 flex items-center">
              <DollarSign className="mr-2" size={18} />
              {t('marketAnalysis')}
            </h5>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('marketDemand')}</p>
                <p className="font-medium">{selectedCrop.market.demand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('expectedRoi')}</p>
                <p className="font-medium">{selectedCrop.market.roi}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('minimumPrice')}</p>
                <p className="font-medium">{selectedCrop.market.minPrice}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3 flex items-center">
              <Calendar className="mr-2" size={18} />
              {t('timeline')}
            </h5>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('plantingWindow')}</p>
                <p className="font-medium">{selectedCrop.timeline.planting}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('harvestTime')}</p>
                <p className="font-medium">{selectedCrop.timeline.harvest}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('peakSeason')}</p>
                <p className="font-medium">{selectedCrop.timeline.peakSeason}</p>
              </div>
            </div>
          </div>

          {/* Potential Risks */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="mr-2" size={18} />
              {t('potentialRisks')}
            </h5>
            <ul className="space-y-2">
              {selectedCrop.risks.map((risk, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};