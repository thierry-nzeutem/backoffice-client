import React from 'react';
import { Shield, Menu, X, FileText, LayoutDashboard, Home, MessageSquare, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: 'home' | 'dashboard') => void;
  onDocumentsClick?: () => void;
  onDocumentViewerClick?: () => void;
  onCommunicationClick?: () => void;
  onCommercialClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onNavigate,
  onDocumentsClick,
  onDocumentViewerClick,
  onCommunicationClick,
  onCommercialClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'documents' | 'document-viewer' | 'communication' | 'commercial'>('home');

  const handleNavigation = (page: 'home' | 'dashboard') => {
    setActivePage(page);
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const handleDocumentsClick = () => {
    setActivePage('documents');
    if (onDocumentsClick) {
      onDocumentsClick();
    }
    setIsMobileMenuOpen(false);
  };

  const handleDocumentViewerClick = () => {
    setActivePage('document-viewer');
    if (onDocumentViewerClick) {
      onDocumentViewerClick();
    }
    setIsMobileMenuOpen(false);
  };

  const handleCommunicationClick = () => {
    setActivePage('communication');
    if (onCommunicationClick) {
      onCommunicationClick();
    }
    setIsMobileMenuOpen(false);
  };

  const handleCommercialClick = () => {
    setActivePage('commercial');
    if (onCommercialClick) {
      onCommercialClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Prévéris</span>
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <button 
                onClick={() => handleNavigation('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'home' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="h-4 w-4 inline mr-1" />
                Accueil
              </button>
              <button 
                onClick={() => handleNavigation('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'dashboard' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="h-4 w-4 inline mr-1" />
                Tableau de bord
              </button>
              <button 
                onClick={handleDocumentsClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'documents' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-1" />
                Documents
              </button>
              <button 
                onClick={handleDocumentViewerClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'document-viewer' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Visualiseur
              </button>
              <button 
                onClick={handleCommunicationClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'communication' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-1" />
                Communication
              </button>
              <button 
                onClick={handleCommercialClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'commercial' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="h-4 w-4 inline mr-1" />
                Devis
              </button>
            </div>
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <button className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Se connecter
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('home')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'home'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4 inline mr-1" />
                Accueil
              </button>
              <button
                onClick={() => handleNavigation('dashboard')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'dashboard'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="h-4 w-4 inline mr-1" />
                Tableau de bord
              </button>
              <button
                onClick={handleDocumentsClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'documents'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-1" />
                Documents
              </button>
              <button
                onClick={handleDocumentViewerClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'document-viewer'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Visualiseur
              </button>
              <button
                onClick={handleCommunicationClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'communication'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-1" />
                Communication
              </button>
              <button
                onClick={handleCommercialClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === 'commercial'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="h-4 w-4 inline mr-1" />
                Devis
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <button className="w-full flex justify-center bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 Prévéris. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};