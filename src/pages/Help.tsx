
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download, HelpCircle } from 'lucide-react';

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quels documents sont nécessaires pour ouvrir un compte ?",
      answer: "Pour ouvrir un compte BCB, vous avez besoin d'une pièce d'identité valide (CNI, passeport), d'un justificatif de domicile récent, et d'un dépôt minimum selon le type de compte choisi."
    },
    {
      question: "Comment puis-je obtenir une carte SESAME ?",
      answer: "La carte SESAME peut être demandée en ligne via notre plateforme. Vous devez d'abord ouvrir un compte, puis faire une demande de carte. Téléchargez le formulaire, remplissez-le, et soumettez vos documents."
    },
    {
      question: "Qu'est-ce que le compte Muhira ?",
      answer: "Le compte Muhira est un compte d'épargne spécialement conçu pour vous aider à économiser avec des taux d'intérêt attractifs et des conditions avantageuses."
    },
    {
      question: "Comment fonctionne la vérification biométrique ?",
      answer: "La vérification biométrique compare votre selfie avec la photo de votre document d'identité pour confirmer votre identité. Assurez-vous que votre visage est clairement visible et bien éclairé."
    },
    {
      question: "Combien de temps prend le traitement d'une demande ?",
      answer: "Le traitement varie selon le service : 24-48h pour les cartes de débit, 3-5 jours pour les cartes VISA, et 1-3 jours pour l'ouverture de compte."
    },
    {
      question: "Que faire si ma demande est rejetée ?",
      answer: "Si votre demande est rejetée, vous recevrez une notification avec les raisons. Vous pouvez corriger les problèmes identifiés et soumettre une nouvelle demande."
    }
  ];

  const guides = [
    {
      title: "Guide d'ouverture de compte",
      description: "Instructions détaillées pour ouvrir votre compte BCB",
      downloadUrl: "/media/pdfs/guide-ouverture-compte.pdf"
    },
    {
      title: "Guide des cartes bancaires",
      description: "Tout savoir sur nos cartes SESAME et VISA",
      downloadUrl: "/media/pdfs/guide-cartes.pdf"
    },
    {
      title: "Guide des transferts internationaux",
      description: "Comment effectuer des transferts vers l'étranger",
      downloadUrl: "/media/pdfs/guide-transferts.pdf"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const downloadGuide = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openChatbot = () => {
    const event = new CustomEvent('openChatbot');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Centre d'Aide
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez des réponses à vos questions et obtenez de l'aide
          </p>
        </div>

        {/* Quick Help */}
        <div className="card mb-12 text-center bg-blue-50 border-blue-200">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Besoin d'aide immédiate ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre assistant virtuel est disponible 24h/24 pour répondre à vos questions
          </p>
          <button onClick={openChatbot} className="primary-button">
            Parler à notre assistant
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Questions Fréquentes
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="font-medium text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Guides et Documents
            </h2>
            
            <div className="space-y-4">
              {guides.map((guide, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {guide.description}
                  </p>
                  <button
                    onClick={() => downloadGuide(guide.downloadUrl, guide.title)}
                    className="w-full secondary-button"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger le guide
                  </button>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="card mt-8 bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-4">
                Autres moyens de contact
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Téléphone:</span>
                  <p className="text-gray-600">+257 22 201 000</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-600">info@bcb.bi</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Horaires:</span>
                  <p className="text-gray-600">Lun-Ven: 8h-17h, Sam: 8h-12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Comment utiliser BCB EasyBank
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choisissez votre service",
                description: "Parcourez nos services et téléchargez les formulaires nécessaires"
              },
              {
                step: "2", 
                title: "Soumettez vos documents",
                description: "Téléversez vos documents d'identité et votre selfie pour vérification"
              },
              {
                step: "3",
                title: "Réservez votre rendez-vous",
                description: "Choisissez une agence et réservez votre créneau de rendez-vous"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
