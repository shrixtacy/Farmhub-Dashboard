import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';

interface AuthFormProps {
  isSignIn?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isSignIn = true }) => {
  const { t } = useLanguage();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'farmer' | 'consumer'>('consumer');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(t('emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }

    if (!password) {
      setError(t('passwordRequired'));
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    try {
      if (isSignIn) {
        await signIn(email, password, userType);
      } else {
        await signUp(email, password, userType);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignIn ? t('signIn') : t('signUp')}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('email')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('password')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        {!isSignIn && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('userType')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('consumer')}
                  className={`px-4 py-2 rounded-lg border ${
                    userType === 'consumer'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {t('consumer')}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('farmer')}
                  className={`px-4 py-2 rounded-lg border ${
                    userType === 'farmer'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {t('farmer')}
                </button>
              </div>
            </div>
          </>
        )}
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isSignIn ? t('signIn') : t('signUp')}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignIn ? (
          <>
            {t('dontHaveAccount')}{' '}
            <button
              onClick={() => window.location.hash = '#signup'}
              className="text-green-600 hover:text-green-700"
            >
              {t('signUp')}
            </button>
          </>
        ) : (
          <>
            {t('alreadyHaveAccount')}{' '}
            <button
              onClick={() => window.location.hash = '#signin'}
              className="text-green-600 hover:text-green-700"
            >
              {t('signIn')}
            </button>
          </>
        )}
      </p>
    </div>
  );
};