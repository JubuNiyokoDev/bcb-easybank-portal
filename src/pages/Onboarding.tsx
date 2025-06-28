
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, AlertCircle, CheckCircle, FileText, Camera } from 'lucide-react';

interface Service {
  name_fr: string;
  description_fr: string;
}

const Onboarding = () => {
  const [selectedService, setSelectedService] = useState('');
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get services
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const response = await fetch('/chatbot/api/services/');
      if (!response.ok) throw new Error('Erreur lors du chargement des services');
      return response.json();
    },
  });

  // Set selected service from navigation state
  useEffect(() => {
    if (location.state?.selectedService) {
      setSelectedService(location.state.selectedService);
    }
  }, [location.state]);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'document' | 'selfie') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'selfie' && file.type.startsWith('image/')) {
      const compressedFile = await compressImage(file);
      setSelfie(compressedFile);
    } else if (type === 'document') {
      setIdentityDocument(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('bcb-auth-token');
    if (!token) {
      navigate('/login', { state: { from: '/onboarding' } });
      return;
    }

    if (!selectedService || !identityDocument || !selfie) {
      setMessage('Veuillez remplir tous les champs requis');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('service_type', selectedService);
      formData.append('identity_document', identityDocument);
      formData.append('selfie', selfie);

      const response = await fetch('/chatbot/submit/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Documents soumis avec succès !');
        setMessageType('success');
        
        // Store submission ID for appointments
        if (data.submission_id) {
          localStorage.setItem('bcb-submission-id', data.submission_id.toString());
        }

        // Reset form
        setTimeout(() => {
          setSelectedService('');
          setIdentityDocument(null);
          setSelfie(null);
          navigate('/agencies');
        }, 2000);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('bcb-auth-token');
          navigate('/login', { state: { from: '/onboarding' } });
        } else {
          setMessage(data.error || 'Erreur lors de la soumission');
          setMessageType('error');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Erreur de réseau. Veuillez réessayer.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Demande de Service
          </h1>
          <p className="text-gray-600">
            Sélectionnez votre service et téléversez vos documents pour commencer
          </p>
        </div>

        <div className="card">
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <p className={messageType === 'success' ? 'text-green-700' : 'text-red-700'}>
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez votre service *
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choisissez un service...</option>
                {services?.map((service, index) => (
                  <option key={index} value={service.name_fr}>
                    {service.name_fr}
                  </option>
                ))}
              </select>
            </div>

            {/* Identity Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document d'identité * (CNI, Passeport, etc.)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'document')}
                  className="hidden"
                  id="identity-upload"
                  required
                />
                <label htmlFor="identity-upload" className="cursor-pointer">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    {identityDocument ? identityDocument.name : 'Cliquez pour téléverser votre document'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, JPG, JPEG, PNG (max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Selfie Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo selfie *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'selfie')}
                  className="hidden"
                  id="selfie-upload"
                  required
                />
                <label htmlFor="selfie-upload" className="cursor-pointer">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    {selfie ? selfie.name : 'Cliquez pour téléverser votre selfie'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, JPEG, PNG (sera compressé automatiquement)
                  </p>
                </label>
              </div>
            </div>

            {/* Preview */}
            {(identityDocument || selfie) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Fichiers sélectionnés :</h3>
                <div className="space-y-2">
                  {identityDocument && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      Document: {identityDocument.name}
                    </div>
                  )}
                  {selfie && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Camera className="w-4 h-4" />
                      Selfie: {selfie.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedService || !identityDocument || !selfie}
              className="w-full primary-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading-spinner"></div>
                  Soumission en cours...
                </div>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Soumettre ma demande
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">
                Conseils pour vos documents
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Assurez-vous que vos documents sont clairs et lisibles</li>
                <li>• Votre selfie doit montrer clairement votre visage</li>
                <li>• Les documents doivent être récents et valides</li>
                <li>• Évitez les reflets et les ombres sur vos photos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
