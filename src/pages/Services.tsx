
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  name_fr: string;
  description_fr: string;
}

const Services = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const response = await fetch('/chatbot/api/services/');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des services');
      }
      return response.json();
    },
  });

  const getServiceType = (serviceName: string): string => {
    const name = serviceName.toLowerCase();
    if (name.includes('sesame')) return 'sesame';
    if (name.includes('visa')) return 'visa';
    if (name.includes('muhira')) return 'muhira';
    if (name.includes('transfert')) return 'transfert';
    if (name.includes('boaweb')) return 'boaweb';
    return 'general';
  };

  const downloadPDF = (serviceType: string, serviceName: string) => {
    const pdfUrl = `/media/pdfs/${serviceType}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Formulaire_${serviceName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des services</p>
          <button 
            onClick={() => window.location.reload()} 
            className="primary-button"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez tous nos services bancaires et financiers. 
            Téléchargez les formulaires requis et commencez votre demande en ligne.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const serviceType = getServiceType(service.name_fr);
            return (
              <div key={index} className="card h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    {service.name_fr}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description_fr}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => downloadPDF(serviceType, service.name_fr)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger le formulaire
                  </button>
                  
                  <Link
                    to="/onboarding"
                    state={{ selectedService: service.name_fr }}
                    className="w-full primary-button flex items-center justify-center gap-2"
                  >
                    Faire une demande
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {services && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Aucun service disponible pour le moment</p>
            <Link to="/" className="primary-button">
              Retour à l'accueil
            </Link>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous accompagner dans vos démarches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/help" className="secondary-button">
              Consulter l'aide
            </Link>
            <button 
              onClick={() => {
                const event = new CustomEvent('openChatbot');
                window.dispatchEvent(event);
              }}
              className="primary-button"
            >
              Parler à un conseiller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
