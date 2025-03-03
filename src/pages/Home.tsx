import React from 'react';
import { FileText, Users, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Plateforme Client Prévéris
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Votre espace sécurisé pour suivre vos projets d'accessibilité et de prévention des risques d'incendie dans les ERP.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Découvrir la plateforme
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fonctionnalités principales</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Gestion de documents</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Visualisez et annotez vos documents et plans architecturaux en toute sécurité.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Communication intégrée</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Échangez avec notre équipe via chat et visioconférence directement dans la plateforme.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Sécurité avancée</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Protection complète de vos données et documents avec conformité RGPD.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Suivi en temps réel</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Suivez l'avancement de vos projets avec des mises à jour en temps réel.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Validation simplifiée</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Validez vos documents et signez vos devis en ligne en quelques clics.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Conformité réglementaire</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Assurez la conformité de vos ERP aux normes d'accessibilité et de sécurité incendie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture Technique</h2>
          <div className="prose max-w-none">
            <p>
              La plateforme Prévéris est conçue avec une architecture modulaire et évolutive, garantissant performance, sécurité et flexibilité.
            </p>
            
            <h3>Composants principaux :</h3>
            <ul>
              <li><strong>Frontend :</strong> Application React avec Tailwind CSS pour une interface responsive et moderne</li>
              <li><strong>Backend :</strong> API REST sécurisée avec Node.js et Express</li>
              <li><strong>Base de données :</strong> PostgreSQL pour le stockage relationnel sécurisé des données</li>
              <li><strong>Authentification :</strong> Système JWT avec authentification multi-facteurs</li>
              <li><strong>Protection des documents :</strong> DRM avancé avec filigranes dynamiques et contrôle d'accès</li>
              <li><strong>Communication :</strong> WebSockets pour les communications en temps réel et WebRTC pour la visioconférence</li>
              <li><strong>Stockage :</strong> Système de stockage chiffré pour les documents et plans</li>
            </ul>

            <h3>Avantages de l'architecture :</h3>
            <ul>
              <li>Haute disponibilité et performance</li>
              <li>Sécurité renforcée des données et documents</li>
              <li>Évolutivité pour intégrer de nouvelles fonctionnalités</li>
              <li>Conformité RGPD intégrée dès la conception</li>
              <li>Expérience utilisateur optimisée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};