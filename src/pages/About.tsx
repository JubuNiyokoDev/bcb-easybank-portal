
import React from 'react';
import { Shield, Users, Globe, Award, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Sécurité",
      description: "Vos données et vos fonds sont protégés par les technologies les plus avancées."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Proximité",
      description: "Nous sommes présents partout au Burundi pour vous accompagner."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Innovation",
      description: "Nous révolutionnons les services bancaires avec la technologie moderne."
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Engagement",
      description: "Nous nous engageons pour le développement économique du Burundi."
    }
  ];

  const stats = [
    { number: "50+", label: "Agences dans tout le pays" },
    { number: "500K+", label: "Clients satisfaits" },
    { number: "30+", label: "Années d'expérience" },
    { number: "24/7", label: "Support client" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            À propos de BCB EasyBank
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            La Banque de Crédit de Bujumbura révolutionne les services bancaires 
            au Burundi avec une plateforme moderne, accessible et sécurisée.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Notre Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Démocratiser l'accès aux services bancaires au Burundi en proposant 
                une plateforme digitale simple, rapide et sécurisée. Nous croyons 
                que chaque Burundais mérite un accès facile aux services financiers 
                modernes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                BCB EasyBank simplifie vos démarches bancaires : ouverture de compte, 
                demande de cartes, transferts internationaux, tout devient accessible 
                en quelques clics.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-8">
                <Globe className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Accessible partout
                </h3>
                <p className="text-gray-600">
                  Optimisé pour toutes les connexions, même les plus lentes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              BCB en chiffres
            </h2>
            <p className="text-gray-600 text-lg">
              Des décennies d'excellence au service du Burundi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-gray-600 text-lg">
              Les principes qui guident notre action quotidienne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BCB Heritage */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              L'héritage de la BCB
            </h2>
          </div>

          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Une histoire de confiance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Depuis sa création, la Banque de Crédit de Bujumbura accompagne 
                le développement économique du Burundi. Membre du réseau Bank of Africa, 
                nous combinons expertise locale et standards internationaux.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Innovation continue
              </h3>
              <p className="text-gray-600 leading-relaxed">
                BCB EasyBank représente notre engagement vers l'innovation digitale. 
                Nous adaptons continuellement nos services aux besoins évolutifs 
                de nos clients, en gardant toujours la simplicité et la sécurité 
                comme priorités.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Engagement social
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Au-delà des services bancaires, nous contribuons activement au 
                développement social et économique du Burundi, en soutenant 
                l'entrepreneuriat local et l'inclusion financière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez la révolution bancaire
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Découvrez une nouvelle façon de gérer vos finances avec BCB EasyBank
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="primary-button bg-white text-blue-600 hover:bg-gray-100">
              Découvrir nos services
            </Link>
            <Link to="/onboarding" className="secondary-button border-white text-white hover:bg-white hover:text-blue-600">
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
