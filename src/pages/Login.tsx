
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Key, AlertCircle } from 'lucide-react';

const Login = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('bcb-auth-token');
    if (savedToken) {
      // If there's a return URL, go there, otherwise go to services
      const returnTo = location.state?.from || '/services';
      navigate(returnTo);
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!token.trim()) {
      setError('Veuillez saisir votre token d\'authentification');
      return;
    }

    setIsLoading(true);

    try {
      // Test the token by making a simple API call
      const response = await fetch('/chatbot/agencies/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Token is valid, save it
        localStorage.setItem('bcb-auth-token', token);
        
        // Redirect to the intended page or services
        const returnTo = location.state?.from || '/services';
        navigate(returnTo);
      } else if (response.status === 401) {
        setError('Token d\'authentification invalide');
      } else {
        setError('Erreur de connexion. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erreur de réseau. Vérifiez votre connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bcb-auth-token');
    setToken('');
    setError('');
  };

  const savedToken = localStorage.getItem('bcb-auth-token');

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Authentification
            </h1>
            <p className="text-gray-600 mt-2">
              Saisissez votre token pour accéder aux services sécurisés
            </p>
          </div>

          {savedToken ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700">
                  Vous êtes déjà connecté
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Token: {savedToken.substring(0, 10)}...
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/services')}
                  className="w-full primary-button"
                >
                  Continuer vers les services
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full secondary-button"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                  Token d'authentification
                </label>
                <input
                  type="text"
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Collez votre token ici..."
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !token.trim()}
                className="w-full primary-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="loading-spinner"></div>
                    Vérification...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">
                Comment obtenir votre token ?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Contactez votre conseiller BCB</li>
                <li>• Rendez-vous en agence avec vos documents</li>
                <li>• Appelez le service client BCB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
