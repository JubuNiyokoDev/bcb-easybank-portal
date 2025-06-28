
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Calendar, Download, QrCode } from 'lucide-react';

interface Agency {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface Appointment {
  qr_code: string;
  qr_code_file: string;
  agency_name?: string;
  appointment_time?: string;
}

const Agencies = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [mapView, setMapView] = useState<'standard' | 'satellite'>('standard');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const { data: agencies, isLoading, error } = useQuery({
    queryKey: ['agencies'],
    queryFn: async (): Promise<Agency[]> => {
      const response = await fetch('/chatbot/agencies/');
      if (!response.ok) throw new Error('Erreur lors du chargement des agences');
      return response.json();
    },
  });

  const bookAppointment = async (agency: Agency) => {
    const token = localStorage.getItem('bcb-auth-token');
    const submissionId = localStorage.getItem('bcb-submission-id');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (!submissionId) {
      alert('Veuillez d\'abord soumettre vos documents dans la section Demande');
      window.location.href = '/onboarding';
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch('/chatbot/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          agency_id: agency.id,
          submission_id: parseInt(submissionId),
        }),
      });

      if (response.ok) {
        const appointmentData = await response.json();
        setAppointment({
          ...appointmentData,
          agency_name: agency.name,
        });
        setShowAppointmentModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Erreur de réseau. Veuillez réessayer.');
    } finally {
      setIsBooking(false);
    }
  };

  const downloadQRCode = () => {
    if (appointment?.qr_code_file) {
      const link = document.createElement('a');
      link.href = appointment.qr_code_file;
      link.download = 'rendez_vous_qr_code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des agences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des agences</p>
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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nos Agences
          </h1>
          <p className="text-gray-600">
            Trouvez l'agence la plus proche et réservez votre rendez-vous
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="card p-0 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Carte des agences</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMapView('standard')}
                    className={`px-3 py-1 text-sm rounded ${
                      mapView === 'standard' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setMapView('satellite')}
                    className={`px-3 py-1 text-sm rounded ${
                      mapView === 'satellite' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>
              
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Carte interactive des agences BCB
                  </p>
                  <p className="text-sm text-gray-500">
                    Vue {mapView === 'satellite' ? 'satellite' : 'standard'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Agencies List */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800 mb-4">
              Liste des agences ({agencies?.length || 0})
            </h2>
            
            {agencies?.map((agency) => (
              <div 
                key={agency.id} 
                className={`card cursor-pointer transition-all ${
                  selectedAgency?.id === agency.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedAgency(agency)}
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {agency.name}
                </h3>
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{agency.address}</p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    bookAppointment(agency);
                  }}
                  disabled={isBooking}
                  className="w-full primary-button text-sm disabled:opacity-50"
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="loading-spinner"></div>
                      Réservation...
                    </div>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Réserver un rendez-vous
                    </>
                  )}
                </button>
              </div>
            ))}

            {agencies && agencies.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune agence disponible</p>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Modal */}
        {showAppointmentModal && appointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full fade-in">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Rendez-vous confirmé !
                  </h2>
                  <p className="text-gray-600">
                    Votre rendez-vous a été réservé avec succès
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Détails du rendez-vous</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Agence:</span> {appointment.agency_name}</p>
                      {appointment.appointment_time && (
                        <p><span className="font-medium">Heure:</span> {appointment.appointment_time}</p>
                      )}
                    </div>
                  </div>

                  {appointment.qr_code_file && (
                    <div className="text-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                        <img 
                          src={appointment.qr_code_file} 
                          alt="QR Code du rendez-vous"
                          className="w-32 h-32 mx-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Présentez ce QR code lors de votre visite
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {appointment.qr_code_file && (
                    <button
                      onClick={downloadQRCode}
                      className="flex-1 secondary-button"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger QR
                    </button>
                  )}
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="flex-1 primary-button"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agencies;
