import React, { useState } from 'react';
import { ClipboardCheck, ArrowRight, BarChart2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface SurveyQuestion {
  id: number;
  question: string;
  type: 'select' | 'number' | 'multiselect';
  options?: string[];
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: 'What are your primary crops this year?',
    type: 'multiselect',
    options: ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton', 'Sugarcane']
  },
  {
    id: 2,
    question: 'What is your total cultivated area (in acres)?',
    type: 'number'
  },
  {
    id: 3,
    question: 'What irrigation method are you primarily using?',
    type: 'select',
    options: ['Drip Irrigation', 'Sprinkler', 'Flood Irrigation', 'Rainwater Only']
  },
  {
    id: 4,
    question: 'What is your expected yield per acre this season?',
    type: 'number'
  },
  {
    id: 5,
    question: 'Which farming practices are you implementing?',
    type: 'multiselect',
    options: ['Organic Farming', 'Crop Rotation', 'Mulching', 'Integrated Pest Management', 'Conservation Tillage']
  }
];

export const PredictionSurvey: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, this data would be sent to a backend
    console.log('Survey answers:', answers);
  };

  const renderQuestion = (question: SurveyQuestion) => {
    switch (question.type) {
      case 'select':
        return (
          <select
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">{t('selectOption')}</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        );
      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => {
              const selected = (answers[question.id] || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => {
                    const current = answers[question.id] || [];
                    handleAnswer(
                      question.id,
                      selected
                        ? current.filter((o: string) => o !== option)
                        : [...current, option]
                    );
                  }}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    selected
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center">
          <BarChart2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('surveyCompleted')}</h3>
          <p className="text-gray-600 mb-4">
            {t('surveyCompletedMessage')}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('predictedYield')}</p>
              <p className="text-xl font-semibold text-green-600">
                {Math.round(Number(answers[4]) * 1.2)} {t('quintalsPerAcre')}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('sustainabilityScore')}</p>
              <p className="text-xl font-semibold text-blue-600">
                {(answers[5] || []).length * 20}/100
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">
            {t('cropPredictionSurvey')}
          </h3>
          <p className="text-gray-600">
            {t('helpUsAnalyze')}
          </p>
        </div>
        <ClipboardCheck className="w-8 h-8 text-green-600" />
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between mb-2">
            {surveyQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-green-600 text-white'
                    : index < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 absolute bottom-0 left-0 right-0">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / surveyQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="min-h-[200px]">
          <h4 className="font-semibold mb-4">
            {surveyQuestions[currentStep].question}
          </h4>
          {renderQuestion(surveyQuestions[currentStep])}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('previous')}
          </button>
          <button
            onClick={() => {
              if (currentStep === surveyQuestions.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep(prev => prev + 1);
              }
            }}
            disabled={!answers[surveyQuestions[currentStep].id]}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {currentStep === surveyQuestions.length - 1 ? t('submit') : t('next')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};