
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Globe } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Rapide et Simple',
      description: 'Ouvrez votre compte ou demandez vos services en quelques minutes seulement.'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Sécurisé',
      description: 'Vos données sont protégées par les dernières technologies de sécurité.'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: 'Accessible',
      description: 'Disponible 24h/24, 7j/7 depuis n\'importe où au Burundi.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
            BCB EasyBank
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto fade-in">
            Simplifiez vos services bancaires au Burundi. Ouvrez votre compte, 
            demandez vos cartes et services en ligne, rapidement et en toute sécurité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Link to="/onboarding" className="primary-button text-lg px-8 py-4">
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="secondary-button text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi choisir BCB EasyBank ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne conçue pour répondre à tous vos besoins bancaires
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Services Populaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos services les plus demandés
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Carte SESAME', desc: 'Carte de débit pour vos achats quotidiens' },
              { name: 'Carte VISA', desc: 'Carte internationale pour voyager' },
              { name: 'Compte Muhira', desc: 'Compte d\'épargne avantageux' },
              { name: 'Transfert International', desc: 'Envoyez de l\'argent à l\'étranger' }
            ].map((service, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-blue-600 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.desc}
                </p>
                <Link to="/services" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="primary-button">
              Voir tous les services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de Burundais qui font confiance à BCB EasyBank
          </p>
          <Link to="/onboarding" className="primary-button bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Ouvrir mon compte
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
