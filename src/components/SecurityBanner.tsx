import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, AlertTriangle, X } from 'lucide-react';

interface SecurityBannerProps {
  documentType?: 'plan' | 'report' | 'form' | 'other';
  isProtected?: boolean;
  showDetails?: boolean;
}

export const SecurityBanner: React.FC<SecurityBannerProps> = ({
  documentType = 'other',
  isProtected = true,
  showDetails = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [expanded, setExpanded] = useState(showDetails);
  const [sessionId] = useState(`SID-${Math.random().toString(36).substring(2, 10)}`);
  const [accessTime] = useState(new Date());
  
  // Simulate user IP and device info
  const [userInfo] = useState({
    ip: '192.168.1.XXX',
    device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
    browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
             navigator.userAgent.includes('Firefox') ? 'Firefox' : 
             navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'
  });
  
  // Security level based on document type
  const getSecurityLevel = () => {
    switch (documentType) {
      case 'plan':
        return 'Élevé';
      case 'report':
        return 'Moyen';
      case 'form':
        return 'Standard';
      default:
        return 'Standard';
    }
  };
  
  // Security color based on document type
  const getSecurityColor = () => {
    switch (documentType) {
      case 'plan':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'report':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'form':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Simulate activity logging
  useEffect(() => {
    if (isProtected) {
      console.log(`[SECURITY] Document access logged: ${sessionId} at ${formatDate(accessTime)}`);
      
      // Simulate periodic security checks
      const securityCheck = setInterval(() => {
        console.log(`[SECURITY] Periodic security check: ${sessionId}`);
      }, 30000);
      
      return () => {
        clearInterval(securityCheck);
        console.log(`[SECURITY] Document session closed: ${sessionId}`);
      };
    }
  }, [sessionId, accessTime, isProtected]);
  
  if (!isVisible || !isProtected) return null;
  
  return (
    <div className={`mb-4 border rounded-lg shadow-sm ${getSecurityColor()}`}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Document protégé - Niveau de sécurité: {getSecurityLevel()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md hover:bg-white hover:bg-opacity-20 focus:outline-none"
            aria-label={expanded ? "Masquer les détails" : "Afficher les détails"}
          >
            {expanded ? (
              <span className="text-sm flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Masquer
              </span>
            ) : (
              <span className="text-sm flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Détails
              </span>
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-md hover:bg-white hover:bg-opacity-20 focus:outline-none"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white bg-opacity-10">
          <div className="text-sm space-y-2">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>
                Ce document est protégé par des mesures de sécurité avancées. Toute tentative d'extraction non autorisée 
                (capture d'écran, téléchargement, impression) est détectée, journalisée et peut entraîner la révocation 
                de vos accès.
              </p>
            </div>
            
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium">Informations de session</h4>
                <ul className="mt-1 space-y-1 text-xs">
                  <li className="flex items-center">
                    <Lock className="h-3 w-3 mr-1 text-gray-500" />
                    ID de session: {sessionId}
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                    Accès: {formatDate(accessTime)}
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-gray-500" />
                    Protection: {documentType === 'plan' ? 'DRM + Filigrane + Segmentation' : 'DRM + Filigrane'}
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Votre empreinte numérique</h4>
                <ul className="mt-1 space-y-1 text-xs">
                  <li className="flex items-center">
                    <Globe className="h-3 w-3 mr-1 text-gray-500" />
                    IP: {userInfo.ip}
                  </li>
                  <li className="flex items-center">
                    <Monitor className="h-3 w-3 mr-1 text-gray-500" />
                    Appareil: {userInfo.device}
                  </li>
                  <li className="flex items-center">
                    <Chrome className="h-3 w-3 mr-1 text-gray-500" />
                    Navigateur: {userInfo.browser}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Icons for the security banner
const Clock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Globe = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Monitor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const Chrome = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);