import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { DocumentViewer } from './pages/DocumentViewer';
import { DocumentList } from './pages/DocumentList';
import { Communication } from './pages/Communication';
import { Commercial } from './pages/Commercial';
import { useState } from 'react';
import { DocumentType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'documents' | 'document-viewer' | 'communication' | 'commercial'>('home');

  // Sample document for the document viewer
  const sampleDocument = {
    id: '1',
    name: 'Plan d\'évacuation - Restaurant Le Gourmet',
    type: DocumentType.PLAN,
    url: '/sample-document.pdf'
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return <DocumentList />;
      case 'document-viewer':
        return (
          <DocumentViewer 
            documentId={sampleDocument.id}
            documentType={sampleDocument.type}
            documentUrl={sampleDocument.url}
            documentName={sampleDocument.name}
            isProtected={true}
            canAnnotate={true}
            onApprove={() => console.log('Document approved')}
            onReject={() => console.log('Document rejected')}
          />
        );
      case 'communication':
        return <Communication />;
      case 'commercial':
        return <Commercial />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout 
      onNavigate={(page: 'home' | 'dashboard') => setCurrentPage(page)}
      onDocumentsClick={() => setCurrentPage('documents')}
      onDocumentViewerClick={() => setCurrentPage('document-viewer')}
      onCommunicationClick={() => setCurrentPage('communication')}
      onCommercialClick={() => setCurrentPage('commercial')}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;